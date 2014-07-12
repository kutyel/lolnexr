// Para obtener una introducción a la plantilla En blanco, consulte la siguiente documentación:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: Esta aplicación se ha iniciado recientemente. Inicializar
                // la aplicación aquí.
            } else {
                // TODO: Esta aplicación se ha reactivado tras estar suspendida.
                // Restaurar el estado de la aplicación aquí.
            }
            args.setPromise(WinJS.UI.processAll());
        }
    };

    app.oncheckpoint = function (args) {
        // TODO: Esta aplicación está a punto de suspenderse. Guardar cualquier estado
        // que deba mantenerse a través de las suspensiones aquí. Puede usar el
        // objeto WinJS.Application.sessionState, que se guarda y se restaura
        // automáticamente en las suspensiones. Si debe completar una
        // operación asincrónica antes de suspenderse la aplicación, llame a
        // args.setPromise().
    };

    // AngularJS

    var ngApp = angular.module('app', []);

    // Summoners controller
    ngApp.controller('SummonersCtrl', ['$scope', '$http', function ($scope, $http) {

        // web service returning summoner data
        $scope.getSummoner = function (region, name) {
            $scope.summoner = {};
            $http.get("https://" + region + ".api.pvp.net/api/lol/" + region + "/v1.4/summoner/by-name/" + name + "?api_key=" + apikey)
                .success(function (data) {
                    $scope.summoner = data;
                });
        }
    }]);

    app.start();
})();
