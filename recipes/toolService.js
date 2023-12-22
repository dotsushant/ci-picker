angular.module("ciApp")
    .service("toolService", function ($http) {
        var self = this;
        var tools = [];

        var promise = $http({
            method: "GET",
            responseType: "arraybuffer",
            url: "ci.db"
        }).then(function mySuccess(response) {
            var uInt8Array = new Uint8Array(response.data);
            self.database = new SQL.Database(uInt8Array);
            tools = runQuery("SELECT * FROM TOOL");
        });

        function getTools() {
            return tools;
        }

        function getFeatures() {
            return runQuery("SELECT * FROM FEATURE");
        }

        function getToolReasons(tool, sentiment) {
            return runQuery(`SELECT R.Id, R.Name FROM Tool T INNER JOIN ToolReason TR ON T.Id = TR.ToolId INNER JOIN Reason R ON R.Id = TR.ReasonId WHERE T.Id=${tool.Id} AND R.Sentiment = ${sentiment}`);
        }

        function getToolFeatures(tool) {
            return runQuery(`SELECT F.Id, F.Name FROM Tool T INNER JOIN ToolFeature TF ON T.Id = TF.ToolId INNER JOIN Feature F ON F.Id = TF.FeatureId WHERE T.Id=${tool.Id}`);
        }

        function getMatchingTools(featureIds) {
            featureIds = $.map(featureIds, function (feature, featureIndex) {
                if (feature.selected) {
                    return feature.Id;
                }
            });

            return runQuery(`SELECT DISTINCT ToolId FROM TOOLFEATURE WHERE FEATUREID IN (${featureIds.join(",")})`);
        }

        function runQuery(query) {
            var resultSet = [];
            var contents = self.database.exec(query);

            if (contents.length > 0) {
                $(contents[0].values).each(function (rowIndex, row) {
                    var result = {};
                    $(row).each(function (cellIndex, cell) {
                        result[contents[0].columns[cellIndex]] = cell;
                    });

                    resultSet.push(result);
                });
            }

            return resultSet;
        }

        return {
            promise: promise,
            runQuery: runQuery,
            getTools: getTools,
            getFeatures: getFeatures,
            getToolReasons: getToolReasons,
            getToolFeatures: getToolFeatures,
            getMatchingTools: getMatchingTools
        };
    });