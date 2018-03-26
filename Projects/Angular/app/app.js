// Main angular app and it's models
var dotoList=angular.module("todoListApp",['ngRoute','ngAnimate']);

// Angular app configuration
dotoList.config(['$routeProvider',function($routeProvider){
    $routeProvider
        //home
        .when('/home',{
            templateUrl:'views/home.html',
            controller:'MainNavController'
        })
        //contact
        .when ('/contact',{
            templateUrl:'views/contact.html',
            controller:"ContactController"
        })
        //contact-send
        .when ('/contact-send',{
            templateUrl:'views/contact-send.html',
            controller:"ContactController"
        })
        //to do
        .when ('/todo',{
            templateUrl:'views/todo.html',
            controller:"MainNavController"
        })
        //else
        .otherwise({
            redirectTo:'/home'
        })

}]);

dotoList.run(function(){

});

//Angular MainNavController Controller
dotoList.controller("MainNavController",['$scope','$http',function($scope,$http){
    //getting the json - for show a default first to do
    $http.get('data/todoInit.json').then(successCallback,failCallBack);
    function successCallback (response){
        $scope.todos=response.data;
    }
    function failCallBack (error){}

    //dealing with a done to do function
    $scope.doneTODO=function($class){
        //if the checkbox is checked
        if(document.getElementsByClassName("checkBoxTODO")[$class].checked == true) {
            document.getElementsByClassName("title")[$class].style.textDecoration = "line-through";
            document.getElementsByClassName("text")[$class].style.textDecoration = "line-through";
        }
        //if the checkbox is not checked
        else{
            document.getElementsByClassName("title")[$class].style.textDecoration = "none";
            document.getElementsByClassName("text")[$class].style.textDecoration = "none";
        }
    }
    //dealing with a removed to do
    $scope.removeTODO=function(todo){
        var index=$scope.todos.indexOf(todo.todo);
        $scope.todos.splice(index,1);
    }
    //dealing with adding  to do
    $scope.addTODO=function(newTODO){
        $scope.todos.push({
            title:$scope.newTODO.title,
            text:$scope.newTODO.text
        });
        //clearing the form fields
        $scope.newTODO.title="";
        $scope.newTODO.text="";

    }

}]);

//Angular ContactController Controller
dotoList.controller("ContactController",['$scope','$location' , '$route',function($scope,$location, $route){
    //After a right contact me form sending and showing the user a success message
    $scope.sendContactMe=function(){
        $location.path('contact-send');
    }
}]);
