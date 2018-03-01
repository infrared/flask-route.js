Do you use Flask?

Does your front-end not have the benefit of using url_for()?

Do you write api calls like this?

```javascript

$.ajax({
   url: '/api/users/' + user_id + '/messages/' + message_id,
   ...
   
   })
```

Say you change the route on the python side to:
```python
@app.route('/api/users/<user_id>/get-messages/<message_id>')
```
Now what?  Arrggh.. now you have to update the front-end!  I wish there something like url_for() that I can use in my javascripts!

** magic wand waving **

POOF

Gather all the routes and add to your app config:
```python
app.config['ROUTES'] = {}
for rule in app.url_map.iter_rules():
    app.config['ROUTES'].setdefault(rule.endpoint, [])
    app.config['ROUTES'][rule.endpoint].append(str(rule))
```

```html
<script src="flask-route.js"></script>
```

```javascript
var flask_routes = new FlaskRoute({{config.ROUTES|safe}});
$.ajax({
    url: flask_routes.get_route('user.messages', {'user_id': user_id, 'message_id': message_id}),
    ...
```
