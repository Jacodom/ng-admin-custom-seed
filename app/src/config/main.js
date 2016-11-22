var adminApp = angular.module('adminApp', ['ng-admin']);

/* Global App configuration */
adminApp.config(['$httpProvider', 'RestangularProvider', function($httpProvider, RestangularProvider) {
  RestangularProvider.setDefaultHeaders({'Authorization': user_token});
  RestangularProvider.setFullResponse(true);
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);



adminApp.config(['NgAdminConfigurationProvider', function (nga) {

    /* Sets the base url for the API consumption */
    urlBase = 'http://localhost:3000/api/';


    /* Create the application */
    var admin = nga.application('admin-app').baseApiUrl(urlBase);

    /* Sets the custom header template */
    var headerTemplate = require('')
    admin.header(require('../base-ng-admin-conf/views/partials/header.html'));

    /* =================== */
    /*    MODULES STARTS   */
    /* =================== */

    /* 1(optional): add the custom directive of your module */
    adminApp.directive('baseDirective', require('../base-ng-admin-conf/scripts/directives/base-directive'));
    /* 2(optional): add  the custom state of the module with its controller */
    adminApp.config(['$stateProvider', require('../base-ng-admin-conf/scripts/states/base-state')]);
    adminApp.controller('BaseCtrl', require('../base-ng-admin-conf/scripts/controllers/base-controller'));
    /* 3(mandatory): add the entity to the nga app */
    admin.addEntity(nga.entity('base'));
    /* 4(mandatory): add the config for the module */
    require('../base-ng-admin-conf/scripts/config/base-config')(nga, admin);

    /* repeat for n modules */

    /* =================== */
    /*    MODULES ENDS     */
    /* =================== */


    /* Sets the config for a custom dashboard */
    admin.dashboard(require('../dashboard/scripts/config/dashboard-config')(nga, admin));

    /* Sets the config for a custom menu */
    admin.menu(require('./menu')(nga, admin));


    /* attach the admin application to the DOM and execute it */
    nga.configure(admin);
}]);

adminApp.config(['ngToastProvider', '$stateProvider', function(ngToastProvider, $stateProvider) {
  console.log('pre');
  ngToastProvider.configure({
    animation: 'fade' // or 'fade'
  });

  // uiGmapGoogleMapApiProvider.configure({
  //     key: 'AIzaSyAMdV-HX0rtJd1njvA714X8mE1-ge--9EI',
  //     v: '3.20' //defaults to latest 3.X anyhow
  //     // libraries: 'weather,geometry,visualization, places'
  // });

  // $stateProvider.state('advertDetail', {
  //   parent: 'main',
  //   url: '/tutoriales',
  //   params: { id: null },
  //   template: ''
  // });
}]);

adminApp.run(function($state, $rootScope, $http) {

    // var subscription = JSON.parse(localStorage.getItem('az_admin_subscription'));
    // var user = JSON.parse(localStorage.getItem('az_admin_user'));
    // var user_token = JSON.parse(localStorage.getItem('az_admin_login')).id;
    //
    // $rootScope.$on('$stateChangeStart', function(e, to, toP, from, fromP){
    //    if(to.data && to.data.subscriptions && to.data.subscriptions.length > 0 && typeof subscription !== 'undefined'){
    //        if(to.data.subscriptions.indexOf(subscription.name) === -1){
    //            e.preventDefault();
    //            $state.go('entityHours'); //TODO: Change to correct page
    //        }else{
    //          if(to.data.limited && to.data.limit_type && typeof user !== 'undefined'){
    //            switch (to.data.limit_type) {
    //              case 'advert':
    //                 $http.get(urlBase + 'entities/' + usetom r.entityId + '/adverts/count?access_token=' + user_token )
    //                 .success(function(quantity){
    //                   console.log(quantity);
    //                   if(subscription.adverts_limit >= quantity.count){
    //                     e.preventDefault();
    //                     $state.go('entityHours'); //TODO: Change to correct page
    //                   }
    //                 });
    //                break;
    //              case 'product':
    //                 $http.get(urlBase + 'entities/' + user.entityId + '/products/count?access_token=' + user_token )
    //                 .success(function(quantity){
    //                   console.log(quantity);
    //                   if(subscription.products_limit >= quantity.count){
    //                     e.preventDefault();
    //                     $state.go('entityHours'); //TODO: Change to correct page
    //                   }
    //                 });
    //                break;
    //            }
    //          }
    //        }
    //     }
    // });
  });
