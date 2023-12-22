angular.module('ciApp', ['xeditable', 'ui.router', 'monospaced.elastic'])
    .run(['editableOptions', 'editableThemes', function (editableOptions, editableThemes) {
        editableThemes.bs3.inputClass = 'input-sm';
        editableThemes.bs3.buttonsClass = 'btn-sm';
        editableOptions.theme = 'bs3';
    }])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state("dashboard", {
                url: "/",
                controller: "dashboardController",
                templateUrl: "./areas/dashboard/dashboard.html",
                resolve: {
                    'toolServiceData': function (toolService) {
                        return toolService.promise;
                    }
                }
            });

        $urlRouterProvider.otherwise("/");
    });