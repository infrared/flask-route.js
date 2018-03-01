var route = require('../flask-route.js');


var routes = {
	'user.info': [
		'/api/user/<user_id>/info'
		],
	'user.messages': [
		'/api/user/<int:user_id>/messages',
	  '/api/user/<user_id>/messages/<message_id>'
	
	]
};


var flask_routes = new route(routes);

QUnit.test("testing routes", function( assert ) {
	  assert.ok(flask_routes.get_route('user.info', {'user_id': 123}) == '/api/user/123/info', "user.info" );
		assert.ok(flask_routes.get_route('user.messages', {'user_id': 123}) == '/api/user/123/messages', "user.messages");
		assert.ok(flask_routes.get_route('user.messages', {'user_id': 123, 'message_id': 456}) == '/api/user/123/messages/456', "user.messages 2");
});
