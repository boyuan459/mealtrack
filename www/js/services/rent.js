var app = angular.module('mealtrack.services.rent', ['ngResource', 'toaster']);

app.factory("Contact", function($resource) {
//    return $resource("https://codecraftpro.com/api/samples/v1/contact/:id/");
    return $resource('http://restcms.local/api/v1/contact/:id/', {id:'@id'}, {
        update: {
            method: 'PUT'
        }
    });
});

app.service("RentService", function (Contact, $rootScope, $q, $http, toaster) {
	var self = {
        'getPerson': function(email) {
            console.log(email);
            for (var i=0;i<self.persons.length;i++) {
                var obj = self.persons[i];
                if (obj.email == email) {
                    return obj;
                }
            }
        },
        'addPerson': function(person) {
            this.persons.push(person);
        },
        'page': 1,
        'hasMore': true,
        'isLoading': false,
        'isSaving': false,
        'isDeleting': false,
        'selectedPerson': null,
        'persons': [],
        'search': null,
        'ordering': 'name',
        'doSearch': function() {
            self.hasMore = true;
            self.page = 1;
            self.persons = [];
            self.load();
        },
        'doOrder': function() {
            self.hasMore = true;
            self.page = 1;
            self.persons = [];
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
                Contact.get(params).$promise.then(function(result) {
                    console.log(result);
                    angular.forEach(result.data, function(person) {
                        self.persons.push(new Contact(person));
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
                self.load();
            }
        },
        'updateContact': function(person) {
            var d = $q.defer();
            self.isSaving = true;
//            Contact.update(person).$promise.then(function() {
            person.$update().then(function() {
                self.isSaving = false;
                toaster.pop('success', 'Updated ' + person.name);
                d.resolve();
            });
            
            return d.promise;
        },
        'removeContact': function(person) {
            var d = $q.defer();
            self.isDeleting = true;
            person.$remove().then(function() {
                self.isDeleting = false;
                var index = self.persons.indexOf(person);
                self.persons.splice(index, 1);
                self.selectedPerson = null;
                toaster.pop('success', 'Deleted ' + person.name);
                d.resolve();
            });
            
            return d.promise;
        },
        'createContact': function(person) {
            var d = $q.defer();
            self.isSaving = true;
            Contact.save(person).$promise.then(function(data) {
                self.isSaving = false;
                self.selectedPerson = null;
                self.hasMore = true;
                self.page = 1;
                self.persons = [];
                self.loadContacts();
                toaster.pop('success', 'Created ' + person.name);
                d.resolve(data);
            });
            
            return d.promise;
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