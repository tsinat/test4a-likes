'use strict';

var app = angular.module('authApp');

app.controller('profileCtrl', function($scope, Auth) {
    console.log('profileCtrl!');

    $scope.sendMessage = (a, b) => {
        var messageObj = {
            messageBody: $scope.newText,
            author: $scope.currentUser.username
        };
        console.log(messageObj);
        Auth.newMessage(messageObj);
        $scope.newText = ''
            // .then(res => {
            //     console.log('success')
            // })
            // .catch(err => {
            //     console.log('error');
            // })
    }
});

app.controller('mainCtrl', function($scope, $state, Auth) {

    $scope.$watch(function() {
        return Auth.currentUser;
    }, function(newVal, oldVal) {
        $scope.currentUser = newVal;
    });

    $scope.logout = () => {
        Auth.logout()
            .then(res => {
                $state.go('home');
            })
    }

});

app.controller('homeCtrl', function($scope, Auth) {
    console.log('homeCtrl!');
    getAllMessages();

    function getAllMessages() {
        Auth.getMessages()
            .then(res => {
                $scope.messages = res.data;
            })
            .catch(err => {
                console.log("err:", err);
            })
    }
    var notliked = true;
    $scope.toogleLike = message => {
        var id = message._id;
        var likes = {
            likes: message.likes
        }
        var whichMessage = '';

        if (notliked) {

            if ($scope.currentUser) {
                Auth.increaseLike(id, likes);
                getAllMessages();
                notliked = false;
                whichMessage = message._id;
            }
        }else if( whichMessage !== id){
            Auth.decreaseLike(id, likes);
            console.log(id, likes);
            getAllMessages();
            notliked = true;
            whichMessage = message._id;
        }
    }
});



app.controller('authFormCtrl', function($scope, $state, Auth) {
    console.log('authFormCtrl!');

    $scope.currentState = $state.current.name;

    $scope.submitForm = () => {
        if ($scope.currentState === 'register') {

            // register user
            if ($scope.user.password !== $scope.user.password2) {

                $scope.user.password = '';
                $scope.user.password2 = '';

                alert('Passwords must match.')
            } else {
                Auth.register($scope.user)
                    .then(res => {
                        return Auth.login($scope.user);
                    })
                    .then(res => {
                        $state.go('home');
                    })
                    .catch(res => {
                        alert(res.data.error);
                    });
            }
        } else {
            Auth.login($scope.user)
                .then(res => {
                    $state.go('profile');
                })
                .catch(res => {
                    alert(res.data.error);
                })
        }
    };

});
