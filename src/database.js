var mysql = require('mysql');

var pool = mysql.createPool({
	connectionLimit: 100,
	host: 'localhost',
	user: 'chris',
	password: 'chris',
	database: 'products'
});

//================ Initialization for the database's tables ================//

//create a table for user's cart, if it is not exists in the database
var sql = 'CREATE TABLE IF NOT EXISTS items (' +
			'item_id int NOT NULL AUTO_INCREMENT,' +
			'item_name VARCHAR(255) NOT NULL,' +
			'price DECIMAL NOT NULL,' +
			'quantity INT,' +
			'user_account VARCHAR(64) NOT NULL,' +
			'PRIMARY KEY (item_id)' +
		  ')';

//execute the sql query
pool.query(sql, function(err, rows, fields) {
	if (err) throw err;
	console.log('Successfully Created \'items\' Table');
});

//create another table to store discount coupon
var sql = 'CREATE TABLE IF NOT EXISTS discount_coupon (' +
			'coupon_code VARCHAR(32) NOT NULL,' +
			'discount DECIMAL NOT NULL,' +
			'PRIMARY KEY (coupon_code)' +
		  ')';

//execute the sql query
pool.query(sql, function(err, rows, fields) {
	if (err) throw err;
	console.log('Successfully Created \'discount_coupon\' Table \n');
});
			
//================ Functions to access database (CRUD) ================//

//get all items from the database
var get_all_items = function(username, callback) {
	pool.getConnection(function(err, connection) {
		var sql = 'SELECT * FROM items WHERE user_account = ?';
		connection.query(sql, [username], function(err, rows) {
			// done with the connection. 
			connection.release();
			
			if (err){
				throw callback(err);
			}			
			callback(rows);
		});
	});
};

//add an item to the database
var add_item = function(req, callback) {
	pool.getConnection(function(err, connection) {
		var sql = 'INSERT INTO items SET ?';
		var item_details = {item_name: req.body.item_name, 
							price: req.body.price, 
							quantity: req.body.quantity, 
							user_account: req.params.username
						   };
							
		connection.query(sql, item_details, function(err, rows) {
			// done with the connection. 
			connection.release();
			
			if (err){
				throw callback(err);
			}			
			callback(rows);
		});
	});
};

//update the quantity of an existing item by item_id and user_account
var update_item = function(req, callback) {
	pool.getConnection(function(err, connection) {
		var sql = 'UPDATE items SET quantity = ? WHERE item_id = ? AND user_account = ?';
		var inserts = [req.body.quantity, req.params.item_id, req.params.username];
							
		connection.query(sql, inserts, function(err, rows) {
			// done with the connection. 
			connection.release();
			
			if (err){
				throw callback(err);
			}			
			callback(rows);
		});
	});
};

//delete item by item_id and user_account
var delete_item = function(req, callback) {
	pool.getConnection(function(err, connection) {
		var sql = 'DELETE FROM items WHERE item_id = ? AND user_account = ?';
		var inserts = [req.params.item_id, req.params.username];
							
		connection.query(sql, inserts, function(err, rows) {
			// done with the connection. 
			connection.release();
			
			if (err){
				throw callback(err);
			}			
			callback(rows);
		});
	});
};

module.exports.get_all_items = get_all_items;
module.exports.add_item = add_item;
module.exports.update_item = update_item;
module.exports.delete_item = delete_item;