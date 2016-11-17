var adminApp = angular.module('adminApp', ['ng-admin']);

// global custom api configuration
adminApp.config(['$httpProvider', 'RestangularProvider', function($httpProvider, RestangularProvider) {
  RestangularProvider.setDefaultHeaders({'Authorization': user_token});
  RestangularProvider.setFullResponse(true);
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);



adminApp.config(['NgAdminConfigurationProvider', function (nga) {

    urlBase = "http://localhost:3000/api/";


    // create the admin application
    var admin = nga.application('admin-app')
        .baseApiUrl(urlBase);

    // custom header
    admin.header(require('./header.html'));

    if(JSON.parse(localStorage.getItem('az_admin_user')).superuser) {
      // admin az config

      admin.addEntity(nga.entity('categories'));
      admin.addEntity(nga.entity('entities'));
      admin.addEntity(nga.entity('adverts'));
      admin.addEntity(nga.entity('tags'));
      admin.addEntity(nga.entity('cities'));
      admin.addEntity(nga.entity('states'));
      admin.addEntity(nga.entity('usuarios'));
      admin.addEntity(nga.entity('chatrooms'));

      require('./categories/config')(nga, admin);
      require('./entities/config')(nga, admin);
      require('./adverts/config')(nga, admin);
      require('./tags/config')(nga, admin);
      require('./cities/config')(nga, admin);
      require('./usuarios/config')(nga, admin);
      require('./chatrooms/config')(nga, admin);

      admin.dashboard(require('./dashboard/config')(nga, admin));
      admin.menu(require('./menu')(nga, admin));

    } else {
      // entity owner config
      if(!JSON.parse(localStorage.getItem('az_admin_user')).entityId) {
        window.location = "./login.html";
      } else {

        adminApp.config(['RestangularProvider', require('./clients/api_flavor').requestInterceptor]);

        // add entities
        admin.addEntity(nga.entity('entities'));
        admin.addEntity(nga.entity('adverts'));
        admin.addEntity(nga.entity('tags'));
        admin.addEntity(nga.entity('chatrooms'));
        admin.addEntity(nga.entity('usuarios'));
        admin.addEntity(nga.entity('clients'));
        admin.addEntity(nga.entity('products'));

        require('./entities/configComercio')(nga, admin);
        require('./tags/configComercio')(nga, admin);
        require('./adverts/configComercio')(nga, admin);
        require('./usuarios/configComercio')(nga, admin);
        require('./chatrooms/configComercio')(nga, admin);
        require('./clients/configComercio')(nga, admin);
        require('./products/configComercio')(nga, admin);

        admin.dashboard(require('./dashboard/configComercio')(nga, admin));
        admin.menu(require('./menuComercio')(nga, admin));
      }
    }

    // attach the admin application to the DOM and execute it
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

    var subscription = JSON.parse(localStorage.getItem('az_admin_subscription'));
    var user = JSON.parse(localStorage.getItem('az_admin_user'));
    var user_token = JSON.parse(localStorage.getItem('az_admin_login')).id;

    $rootScope.$on('$stateChangeStart', function(e, to, toP, from, fromP){
       if(to.data && to.data.subscriptions && to.data.subscriptions.length > 0 && typeof subscription !== 'undefined'){
           if(to.data.subscriptions.indexOf(subscription.name) === -1){
               e.preventDefault();
               $state.go('entityHours'); //TODO: Change to correct page
           }else{
             if(to.data.limited && to.data.limit_type && typeof user !== 'undefined'){
               switch (to.data.limit_type) {
                 case 'advert':
                    $http.get(urlBase + 'entities/' + user.entityId + '/adverts/count?access_token=' + user_token )
                    .success(function(quantity){
                      console.log(quantity);
                      if(subscription.adverts_limit >= quantity.count){
                        e.preventDefault();
                        $state.go('entityHours'); //TODO: Change to correct page
                      }
                    });
                   break;
                 case 'product':
                    $http.get(urlBase + 'entities/' + user.entityId + '/products/count?access_token=' + user_token )
                    .success(function(quantity){
                      console.log(quantity);
                      if(subscription.products_limit >= quantity.count){
                        e.preventDefault();
                        $state.go('entityHours'); //TODO: Change to correct page
                      }
                    });
                   break;
               }
             }
           }
        }
    });
  });
