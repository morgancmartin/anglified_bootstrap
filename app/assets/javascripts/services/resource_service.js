// For choosing a resource. Likely to be used in Johnny's SubmitService.
app.factory('ResourceService', ['_', function (_) {

  var srv = {};
  var _data = {
    cached: [],
    type: 'resource',
  };

  srv.addResource = function (resource) {
    var cachLength = Object.keys(_data.cached).length;
    // _data.cached[cachLength] = resource;
    _data.cached.push(resource);
    return Promise.resolve(_data);
  };

  srv.all = function (resource) {
    return _data;
  };

  return srv;
}]);
