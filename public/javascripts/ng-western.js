var westConn = angular.module('westConn', ['sticky', 'ngRoute']);

westConn.config(['$routeProvider', function($routeProvider){
    $routeProvider
    .when('/:name', {
        controller: 'pageController'
    })
    .otherwise({redirectTo: '/'});
}]);

westConn.controller('pageController', ['$scope', '$http','$routeParams', function($scope, $http, $routeParams) {
    $scope.threads = [];
    $scope.my_classes = [];
    $scope.logo = emojione.toImage(':horse:');
    $scope.classWithFocus = null;

    $scope.logoTongueOut = function(){
        document.getElementById('logo').setAttribute('src', 'stylesheets/svg/horse-tongue.svg');
    };

    $scope.logoTongueIn = function(){
        document.getElementById('logo').setAttribute('src', 'stylesheets/svg/horse-normal.svg');
    };
    //document.getElementsByClassName('title')[0].innerHTML = 'musteee '+$scope.logo;

    $http.get('/data/threads.json').
    success(function(data, status, headers, config) {
        $scope.threads = data;
    }).
    error(function(data, status, headers, config) {
        console.log('error reading json file.')
    });

    $scope.classFocusChanged = function(classWithFocus){
        $scope.classWithFocus = classWithFocus;
        console.log($scope.classWithFocus); 
    };

}]);



westConn.controller('feedController', ['$scope', '$http', function($scope, $http) {
    var expandFooter = function(element){
        console.log('over.')
    };
}]);



westConn.controller('classesController', ['$scope', '$http', function($scope, $http){
    $scope.my_classes = [];
    $scope.expandFooter = function(element){

    };
    $http.get('/data/my_classes.json').
    success(function(data, status, headers, config) {           console.log(data);
                                                     $scope.my_classes = data;
                                                    }).
    error(function(data, status, headers, config) {
        console.log('error reading json file.')
    });
}]);

westConn.controller('classCardController', ['$scope', '$routeParams', function($scope, $routeParams){
}]);


westConn.directive('discussionCard', function() {
    return {
        restrict: 'E',
        templateUrl: '/partials/discussion-card.jade',
    };
});


westConn.directive('classCard', function() {
    return {
        restrict: 'E',
        templateUrl: '/partials/class-card.jade'
    };
});



westConn.directive('classesListCard', function() {
    return {
        restrict: 'E',
        templateUrl: '/partials/classes-list-card.jade'
    };
});



westConn.directive('mouseOver', function() {
    return function(scope, element) {
        var footer = element[0].getElementsByClassName('footer')[0];
        var button = document.createElement('button');
        button.classList.add('footer-button');
        button.textContent = 'RESPOND';
        button.classList.add('hide-button');
        footer.appendChild(button);
        element
        .bind('mouseover', function() {
            if(footer.classList.contains('condenseFooter')){
                footer.classList.remove('condenseFooter');
                button.classList.remove('hide-button');
            }
            footer.classList.add('expandFooter');
            button.classList.add('show-button');
        })
        .bind('mouseleave', function(){
            if(footer.classList.contains('expandFooter')){
                footer.classList.remove('expandFooter');
                button.classList.remove('show-button');
            }
            footer.classList.add('condenseFooter');
            button.classList.add('hide-button');
        });
    };
});


