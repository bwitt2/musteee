var login = angular.module('login', []);

login.controller('loginController', ['$scope', function($scope){
    $scope.signingUp = false;

    $scope.logoTongueOut = function(){
        document.getElementById('horse').setAttribute('src', 'stylesheets/svg/horse-tongue.svg');
    };

    $scope.logoTongueIn = function(){
        document.getElementById('horse').setAttribute('src', 'stylesheets/svg/horse-normal.svg');
    };

    $scope.showSignUpFields = function(){

        if(!$scope.signingUp){    
            var fieldDiv = document.getElementById('textfield-div');

            var emailField = document.createElement('input');
            emailField.setAttribute('type', 'email');
            emailField.setAttribute('placeholder', 'email');
            emailField.setAttribute('id', 'signUpField');

            var passwordField = document.createElement('input');
            passwordField.setAttribute('type', 'password');
            passwordField.setAttribute('placeholder', 'retype password');
            passwordField.setAttribute('id', 'signUpField');

            fieldDiv.insertBefore(emailField, document.getElementById('username'));
            fieldDiv.insertBefore(document.createElement('br'), document.getElementById('username'));

            fieldDiv.appendChild(document.createElement('br'));
            fieldDiv.appendChild(passwordField);

            $scope.signingUp = true;
        }
    };

    $scope.hideSignUpFields = function(){
        if($scope.signingUp){
            var fieldDiv = document.getElementById('textfield-div');
            fieldDiv.removeChild(document.getElementById('signUpField'));
            fieldDiv.removeChild(document.getElementById('signUpField'));
            fieldDiv.removeChild(document.getElementsByTagName('br')[0]);
            fieldDiv.removeChild(document.getElementsByTagName('br')[1]);//is actually the third one ie. [2], but it becomes [1] after deleting the previous div
            $scope.signingUp = false;
        }
    };
}]);