angular.module('ciApp')
    .controller("dashboardController", function ($scope, $state, toolService) {
        $scope.tools = toolService.getTools();
        //$scope.reasons = toolService.getReasons();
        //$scope.features = toolService.getFeatures();

        $($scope.tools).each(function (toolIndex, tool) {
            tool.features = toolService.getToolFeatures(tool);
            tool.reasonsPositive = toolService.getToolReasons(tool, 1);
            tool.reasonsNegative = toolService.getToolReasons(tool, 0);
        });
    });