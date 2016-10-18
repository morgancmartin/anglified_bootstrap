// e.g. $injector.instantiate(ResourceGenerator.generate('users'))
// Inject $injector in a controller and run that line to instantiate a generated service.

app.factory('ResourceGenerator',
['Restangular', '_', 'pluralize', function(Restangular, _, pluralize) {

  var srv = {};

  // Input a resource.
  srv.generate = function (resource) {
    // Output config for a factory.
    return ['Restangular','_','pluralize', function (Restangular,_,pluralize) {
        var rSrv = {};

        // Container for all data pertaining to the resource.
        var _data = {
          cache: [],
          type: resource,
          one: undefined,
          added: undefined,
          updated: undefined,
          destroyed: undefined
        };

        function _logError (reason) {
          console.log(reason);
          throw new Error(reason);
        }

        function _cacheData (response) {
          angular.copy(response,_data.cache);
          return _data;
        }

        function _addOne (response){
          _data.cache.push(response);
          _data.added = response;
          return _data;
        }

        function _updateOne (response){
          var found = _.find(_data.cache, {id: response.id});
          if (!found) throw new Error('Nothing to update!');
          angular.copy(response,found);
          _data.updated = found;
          return _data;
        }

        function _removeOne (model) {
          var found = _.find(model, {id: model.id});
          if (!found) throw new Error('Nothing to remove!');
          _data.destroyed = found;
          _.remove(_data.cache, {id: model.id});
          return _data;
        }

        function _queryAll (resource) {
          return Restangular.all(resource)
            .getList()
            .then(_cacheData)
            .catch(_logError);
        }

        rSrv.all = function () {
          if (_.isEmpty(_data.cache)) {
            return _queryAll(resource);
          } else {
            return _data;
          }
        };

        rSrv.one = function (id) {
          if (_.isEmpty(_data.cache)) {
            _queryAll(resource);
            _data.one = _.find(_data.cache, {id: id});
            return Promise.resolve(_data);
          } else {
            _data.one = _.find(_data.cache, {id: id});
            return Promise.resolve(_data);
          }
        };

        rSrv.create = function (params) {
          var required = pluralize.plural(resource, 1);
          return Restangular.all(resource)
            .post({required: params})
            .catch(_logError)
            .then(_addOne);
        };

        rSrv.update = function (params) {
          var required = pluralize.plural(resource, 1);
          return Restangular.one(resource, params.id)
            .patch({required: params})
            .then(_updateOne)
            .catch(_logError);
        };

        rSrv.destroy = function (model) {
          var required = pluralize.plural(resource, 1);
          return model.destroy()
            .then(_removeOne(model))
            .catch(_logError);
        };

        return rSrv;
      }];
    };
  return srv;

}]);
