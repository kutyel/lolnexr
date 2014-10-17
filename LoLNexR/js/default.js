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

    // Route config
    ngApp.config(['$compileProvider', function ($compileProvider) {
        $compileProvider.imgSrcSanitizationWhitelist('images/');
    }]);

    // Summoners controller
    ngApp.controller('SummonersCtrl', ['$scope', '$http', function ($scope, $http) {
        
        $http.get('json/regions.json').success(function(data) {
            $scope.regions = data;
        });
        
        $scope.getSummoner = function (region, name) {
            $scope.summoner = {};
            $http.get("https://" + region + ".api.pvp.net/api/lol/" + region + "/v1.4/summoner/by-name/" + name + "?api_key=" + apikey)
                .success(function (summoner) {
                    $scope.summoner = summoner[name];
                    $http.get("https://" + region + ".api.pvp.net/api/lol/" + region + "/v2.4/league/by-summoner/" + summoner[name].id + "/entry?api_key=" + apikey)
                        .success(function (json) {
                            $scope.data = json;
                            var id = summoner[name].id,
                                leagues = {},
                                queues = [ "RANKED_TEAM_3x3", "RANKED_SOLO_5x5", "RANKED_TEAM_5x5" ];                                };

                            for (var i in json[id]) {
                                if (json[id][i].tier == "CHALLENGER")
                                    json[id][i]["imageUrl"] = "/images/leagues/challenger.png";
                                else (json[id][i].tier == "MASTER")
                                    json[id][i]["imageUrl"] = "/images/leagues/master.png";
                                else
                                    json[id][i]["imageUrl"] = "/images/leagues/" + json[id][i].tier + "/" + json[id][i].entries[0].division + ".png";
                            	for (var j in queues)
                            	    if (json[id][i].queue == queues[j])
                            		    leagues[json[id][i].queue] = json[id][i];
                            }
                            
                            // In case there is any unranked
                            for (var k in queues)
                        	    if(!leagues[queues[k]])
                                    leagues[queues[k]] = { queue: queues[k], tier: "UNRANKED", imageUrl: "/images/leagues/unranked.png" };
                            
                            // TODO:
                            //  1. Put in the correct order.

                            $scope.leagues = leagues;
                        });
                });
        }
    }]);

    app.start();
})();
