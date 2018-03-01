(function() {
  var FlaskRoute = (function() {
    var FlaskRoute = function(routes) {
      if (Object.prototype.toString.call(routes) != "[object Object]") {
        throw('routes must be a dictionary');
      }
      this.routes = routes;
    }
    FlaskRoute.prototype.get_route = function(endpoint, args) {
      var self = this;

      if (!self.routes.hasOwnProperty(endpoint)) {
        throw ('Could not find route endpoint: ' + endpoint);
        return false;
      }
      if (!args) {
        /**
         * No arguments were passed to construct a url, so return the first
         * route that does not require arguments.
         * /api/foo/bar
         * get_route(foo)
         */
        for (var x in self.routes[endpoint]) {
          var route_args = self.routes[endpoint][x].match(/<(?:\w+\:)?(\w+)>/gi);
          if (!route_args) {
            return self.routes[endpoint][x];
          }
        }
        throw('Could not construct a route for ' + endpoint + ' when no args were passed');
        return false;
      }

      if (Object.prototype.toString.call(args) != "[object Object]") {
        throw('args passed to get_route() must be a dictionary');
        return false;
      }
      if (Object.keys(args).length == 0) {
        throw('empty arguments passed to get_route()')
        return false;
      }
      for (var x in self.routes[endpoint]) {
        var route_args = self.routes[endpoint][x].match(/<(?:\w+\:)?(\w+)>/gi);
        if (route_args) {
          if (route_args.length == Object.keys(args).length) {
            var temp_route = self.routes[endpoint][x]
            for (var i in route_args) {
              var arg = route_args[i].match(/<(?:(\w+\:))?(\w+)>/)[2];
              var replace = route_args[i].match(/<(?:(\w+\:))?(\w+)>/)[0];
              if (!args.hasOwnProperty(arg)) {
                throw(arg + ' wanted but not passed');
                return false;
              }
              temp_route = temp_route.replace(route_args[i], args[arg]);
            }

            return temp_route;
          }
        }
      }
      /* Reached here, return first route in endpoint list */
      throw('Route could not be constructed');
    }
    return FlaskRoute;
  })();
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = FlaskRoute;
  else
    window.FlaskRoute = FlaskRoute;
})();
