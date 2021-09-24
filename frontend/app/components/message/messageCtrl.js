'use strict';

angular.module('app.message')
    .controller('MessageCtrl', ['$scope', '$stateParams', 'MessageSvc',
        function($scope, $stateParams, MessageSvc) {
            var phoneId = $stateParams.id;
            var messagePerPage = 20;

            $scope.currentPage = 1;
            $scope.pagination = MessageSvc.queryCount({id: phoneId});
            $scope.messages = MessageSvc.query({id: phoneId, offset: 0});

            $scope.getTotalPageCount = function () {
                return $scope.pagination.count / messagePerPage;
            };

            $scope.goPage = function(page) {
                $scope.messages = MessageSvc.query({id: phoneId, offset: (page - 1) * messagePerPage});
                $scope.currentPage = page;
            };
        }
    ]);
