'use strict';

angular.module('app.phones')
    .controller('PhoneCtrl', ['$scope', '$state', 'PhoneSvc',
        function($scope, $state, PhoneSvc) {
            $scope.phones = PhoneSvc.query();

            $scope.selectPhone = function(item) {
                $state.go('message', {id: item.id});
            };
        }
    ]);
