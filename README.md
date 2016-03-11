# REST API with CRUD Features
REST API with CRUD (Create, Read, Update, and Delete) functionalities for shopping cart: 
* list, add, remove, and delete items

Dependencies
------------
* Express (Node.js web application framework)
* MySQL (Database)
* Body-parser
 
Routes
------
Here is an overview of the routes for the API, what they will do, and HTTP Verb used to access it.

|Route                         | HTTP Verb | Description              |
|------------------------------| :-------: | -------------------------|
|/api/:username/items          | GET       | List all the items       |
|/api/:username/items          | POST      | Add a new item           |
|/api/:username/items/:item_id | PUT       | Update an existing item  |
|/api/:username/items/:item_id | DELETE    | Delete an item           |
