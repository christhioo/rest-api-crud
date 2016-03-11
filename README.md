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

|Route                           | HTTP Verb | Description                                                      |
|--------------------------------| :-------: | ---------------------------------------------------------------- |
|/api/:username/items            | GET       | List all the items                                               |
|/api/:username/items            | POST      | Add a new item                                                   |
|/api/:username/items/:item_id   | PUT       | Update an existing item                                          |
|/api/:username/items/:item_id   | DELETE    | Delete an item                                                   |
|/api/:username/checkout         | GET       | Get the total cost                                               |
|/api/:username/checkout/:coupon | GET       | Get the discount rate, total cost, and total cost after discount |

How to Access
-------------
1. To get all items provided the username (e.g. chris)
  * add "/api/chris/items" to the url
2. To add a new item provided the username (e.g. chris)
  * the following items are required:
    * item_name
    * price
    * quantity
  * then submit to "/api/chris/items" with the POST method
3. To update the quantity of an existing item provided the username (e.g. chris)
  * the following item is required:
    * quantity
    * item_id, on the url (e.g. 1345)
  * then submit to "/api/chris/items/1345" with the PUT method
4. To delete an item provided the username (e.g. chris)
  * the following item is required:
    * item_id, on the url (e.g. 2343)
  * then submit to "api/chris/items/2343" with the DELETE method
5. To get total cost of a user (e.g. chris)
  * add "/api/chris/checkout" to the url
6. To apply coupon code (e.g. HEywJL2D) provided the username (e.g. chris)
  * add "/api/chris/checkout/HEywJL2D" to the url
