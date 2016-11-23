var adminApp = angular.module('adminApp', ['ng-admin']);

/* Global App configuration */
adminApp.config(['$httpProvider', 'RestangularProvider', function($httpProvider, RestangularProvider) {
  // RestangularProvider.setDefaultHeaders({'Authorization': user_token});
  RestangularProvider.setFullResponse(true);
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);



adminApp.config(['NgAdminConfigurationProvider', function (nga) {

    /* Sets the base url for the API consumption */
    var urlBase = 'http://localhost:3000/api/';


    /* Create the application */
    var admin = nga.application('Admin App').baseApiUrl(urlBase);

    /* Sets the custom header template */
    var headerTemplate = require('../base-ng-admin-conf/views/partials/header.html');
    admin.header(headerTemplate);

    /* =================== */
    /*    MODULES STARTS   */
    /* =================== */

    /* 1(optional): add the custom directive of your module */
    // adminApp.directive('baseDirective', require('../base-ng-admin-conf/scripts/directives/base-directive'));
    /* 2(optional): add the custom service of your module */
    // adminApp.service('baseService', require('../base-ng-admin-conf/scripts/services/base-service'));
    /* 3(optional): add  the custom state of the module with its controller */
    // adminApp.config(['$stateProvider', require('../base-ng-admin-conf/scripts/states/base-state')]);
    // adminApp.controller('BaseCtrl', require('../base-ng-admin-conf/scripts/controllers/base-controller'));
    // admin.addEntity(nga.entity('base'));
    /* 4(mandatory): add the config for the module */
    var base = require('../base-ng-admin-conf/scripts/config/base-config')(nga, admin);
    /* 5(mandatory): add the entity to the nga app */
    admin.addEntity(base);



    /* repeat for n modules */

    /* =================== */
    /*    MODULES ENDS     */
    /* =================== */


    /* Sets the config for a custom dashboard */
    // admin.dashboard(require('../dashboard/scripts/config/dashboard-config')(nga, admin));

    /* Sets the config for a custom menu */
    admin.menu(require('./menu')(nga, admin));


    /* attach the admin application to the DOM and execute it */
    nga.configure(admin);
}]);


adminApp.config(['RestangularProvider', function (RestangularProvider) {
  RestangularProvider.addFullRequestInterceptor(function(element, operation, what, url, headers, params) {
    if (operation == "getList") {
      delete params._page;
      delete params._perPage;
      delete params._sortField;
      delete params._sortDir;
      delete params._filters;
    }
    return { params: params };
  });

}]);


adminApp.run(function($state, $rootScope, $http) {
});
