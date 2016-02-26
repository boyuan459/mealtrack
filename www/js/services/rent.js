var app = angular.module('mealtrack.services.rent', ['ngResource', 'toaster']);

app.factory("Property", function($resource) {
//    return $resource("https://codecraftpro.com/api/samples/v1/contact/:id/");
    return $resource('http://restcms.local/api/v1/property/:id/', {id:'@id'}, {
        update: {
            method: 'PUT'
        }
    });
});

app.service("RentService", function (Property, $rootScope, $q, $http, toaster) {
	var self = {
        'getProperty': function(id) {
            console.log(id);
            for (var i=0;i<self.properties.length;i++) {
                var obj = self.properties[i];
                if (obj.id == id) {
                    return obj;
                }
            }
        },
        'addProperty': function(property) {
            this.properties.push(property);
        },
        'page': 1,
        'hasMore': true,
        'isLoading': false,
        'isSaving': false,
        'isDeleting': false,
        'selectedPerson': null,
        'properties': [],
        'search': null,
        'ordering': 'name',
        'doSearch': function() {
            self.hasMore = true;
            self.page = 1;
            self.properties = [];
            self.load();
        },
        'doOrder': function() {
            self.hasMore = true;
            self.page = 1;
            self.properties = [];
            self.load();
        },
        'load': function() {
            if (self.hasMore && !self.isLoading) {
                self.isLoading = true;
                
                var params = {
                    'page': self.page,
                    'search': self.search,
                    'ordering': self.ordering
                };
                
                var d = $q.defer();
                Property.get(params).$promise.then(function(result) {
                    console.log(result);
                    angular.forEach(result.data, function(property) {
                        self.properties.push(new Property(property));
                    });
                    if (result.current_page >= result.last_page) {
                        self.hasMore = false;
                    }
                    
                    self.isLoading = false;
                    d.resolve();
                });
                
                return d.promise;
            }
        },
        'loadMore': function() {
            if (self.isLoading) return;
            if (self.hasMore && !self.isLoading) {
                self.page += 1;
                return self.load();
            }
        },
        'trackProperty': function(property) {
            
        },
        'removeProperty': function(person) {
           
        },
        'watchFilters': function() {
            $rootScope.$watch(function() {
                return self.search;
            }, function(newVal) {
                if (angular.isDefined(newVal)) {
                    self.doSearch(newVal);
                }
            });

            $rootScope.$watch(function() {
                return self.ordering;
            }, function(newVal) {
                if (angular.isDefined(newVal)) {
                    self.doOrder(newVal);
                }
            });
        }
    };
    
    // self.load();
    self.watchFilters();
    
    return self;
});