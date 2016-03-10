//call packages
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will get the data from a POST
app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies
app.use(bodyParser.json()); // to support JSON-encoded bodies

//import database.js
var db = require('./database.js');

//set host and port
var host = '127.0.0.1';
var port = process.env.PORT || 3030;

//create a new router object
var router = express.Router();

//middleware to use for all requests
router.use(function(req, res, next) {
    console.log('Processing your request...\n');
    next(); // make sure it doesn't stop here and go to the next routes
});

//list all items
router.get('/:username/items', function(req, res) {
	db.get_all_items(req.params.username, function(items){
		res.send(items);
	});
});

//add a new item
router.post('/:username/items', function(req, res) {
	if (!req.body.item_name || !req.body.price || !req.body.quantity) {
		res.send({"status": "error", "message": "missing a parameter"});
	} else {
		db.add_item(req, function(item){
			if (item.affectedRows === 1){
				res.send('Item has been successfully added!');
				console.log('Item has been successfully added!');
			} else {
				res.send('Item has failed to be added');
				console.log('Item has failed to be added');
			}
		});
	}
});

//update the quantity of an existing item by item_id
router.put('/:username/items/:item_id', function(req, res) {
	db.update_item(req, function(item) {
		if (item.changedRows === 1){
			res.send('Item\'s quantity has been successfully updated');
			console.log('Item\'s quantity has been successfully updated');
		} else {
			res.send('Item\'s quantity has failed to be updated');
			console.log('Item\'s quantity has failed to be updated');
		}
	});
});

//remove an existing item by item_id
router.delete('/:username/items/:item_id', function(req, res) {
	db.delete_item(req, function(item) {
		if (item.affectedRows === 1){
			res.send('Item has been successfully removed from database');
			console.log('Item has been successfully removed from database');
		} else {
			res.send('Item\'s removal has failed!');
			console.log('Item\'s removal has failed!');
		}
	});
});

//all of routes will be prefixed with /api
app.use('/api', router);

//start the server
app.listen(port);
console.log('Application is listening at host %s and port %s', host, port);