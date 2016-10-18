// For choosing a resource. Likely to be used in Johnny's SubmitService.
app.factory('ResourceService', ['_', function (_) {

  var srv = {};
  var _data = {
    cached: [],
    type: 'resource',
  };

  srv.addResource = function (resource) {
    _data.cached.push(resource);
    console.log(_data);
    return Promise.resolve(_data);
  };

  srv.all = function (resource) {
    return Promise.resolve(_data);
  };

  return srv;
}]);
