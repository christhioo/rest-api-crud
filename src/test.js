var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where program is runninng.

var server = supertest.agent("https://stormy-badlands-25301.herokuapp.com");

// UNIT test begin

describe("SAMPLE unit test", function(){

  // #1 should return Homepage

  it("should return home page", function(done){

    //Calling Homepage
    server
		.get("/")
		.expect("Content-type", /text/)
		.expect(200) // HTTP response
		.end(function(err,res){
			// HTTP status should be 200
			res.status.should.equal(200);
			done();
		});
  });

  // #2 should return a list of items
  
  it("should return a list of items", function(done) {
  
	//Calling API GET
	server
		.get("/api/chris/items")
		.expect("Content-type", /json/)
		.expect(200) // HTTP response
		.end(function(err,res){
			// HTTP status should be 200
			res.status.should.equal(200);
			done();
		});
  });
  
  // #3 should return 'Item has been successfully added!'
  
  it("should return Item has been successfully added!", function(done) {
	
	//Calling API POST
	server
		.post("/api/test/items")
		.send({"item_name": "test", "price": "99", "quantity": 1})
		.expect("Content-type", /json/)
		.expect(200) // HTTP response
		.end(function(err,res){
			// HTTP status should be 200
			res.status.should.equal(200);
			res.body.message.should.equal('Item has been successfully added!');
			done();
		});
  });
  
  // #4 should return 'Item\'s quantity has been successfully updated'
  
  it("should return 'Item\'s quantity has been successfully updated'", function(done) {
	
	//Calling API PUT
	server
		.put("/api/test/items/1122")
		.send({"quantity": 10})
		.expect("Content-type", /json/)
		.expect(200) // HTTP response
		.end(function(err,res){
			// HTTP status should be 200
			res.status.should.equal(200);
			res.body.message.should.equal('Item\'s quantity has been successfully updated');
			done();
		});
  });
  
  // #5 should return 'Item has been successfully removed from database'

  it("should return 'Item has been successfully removed from database'", function(done) {
	
	//Calling API DELETE
	server
		.delete("/api/test/items/1172")
		.expect("Content-type", /json/)
		.expect(200) // HTTP response
		.end(function(err,res){
			// HTTP status should be 200
			res.status.should.equal(200);
			res.body.message.should.equal('Item has been successfully removed from database');
			done();
		});
  });
  
  // #6 should return 'Total Cost: 145.66'
  
  it("should return 'Total Cost: 145.66'", function(done) {
	
	//Calling API GET
	server
		.get("/api/chris/checkout")
		.expect("Content-type", /json/)
		.expect(200) // HTTP response
		.end(function(err,res){
			// HTTP status should be 200
			res.status.should.equal(200);
			res.body[0]["Total Cost"].should.equal(145.66);
			done();
		});
  });
  
  // #7 should return Discount: 20%, Total Cost:145.66, Total Cost After Discount: 116.53
  
  it("should return Discount: 20%, Total Cost:145.66, Total Cost After Discount: 116.53", function(done) {
  
	//Calling API GET
	server
		.get("/api/chris/checkout/EnfpMQNq")
		.expect("Content-type", /json/)
		.expect(200) // HTTP response
		.end(function(err,res){
			// HTTP status should be 200
			res.status.should.equal(200);
			res.body["Discount"].should.equal('20%');
			res.body["Total Cost"].should.equal(145.66);
			res.body["Total Cost After Discount"].should.equal('116.53');
			done();
		});
  });
  
  // #8 should return 'Item is not found'

  it("should return 'Item is not found'", function(done) {
	
	//Calling API DELETE
	server
		.delete("/api/test/items/9999")
		.expect("Content-type", /json/)
		.expect(200) // HTTP response
		.end(function(err,res){
			// HTTP status should be 200
			res.status.should.equal(200);
			res.body.message.should.equal('Item is not found');
			done();
		});
  });
  
  // #9 should return 'There is no such a username in the database'
  
  it("should return 'There is no such a username in the database'", function(done) {
	
	//Calling API GET
	server
		.get("/api/stranger/checkout")
		.expect("Content-type", /json/)
		.expect(200) // HTTP response
		.end(function(err,res){
			// HTTP status should be 200
			res.status.should.equal(200);
			res.body.message.should.equal('There is no such a username in the database');
			done();
		});
  });
  
  // #10 should return "Coupon is not valid"
  
  it("should return 'Coupon is not valid'", function(done) {
	
	//Calling API GET
	server
		.get("/api/chris/checkout/no-a-valid-coupon")
		.expect("Content-type", /json/)
		.expect(200) // HTTP response
		.end(function(err,res){
			// HTTP status should be 200
			res.status.should.equal(200);
			res.body.message.should.equal('Coupon is not valid');
			done();
		});
  });
  
  // #11 should return 'There is no such a username in the database'
  
  it("should return 'There is no such a username in the database'", function(done) {
	
	//Calling API GET
	server
		.get("/api/stranger/checkout/EnfpMQNq")
		.expect("Content-type", /json/)
		.expect(200) // HTTP response
		.end(function(err,res){
			// HTTP status should be 200
			res.status.should.equal(200);
			res.body.message.should.equal('There is no such a username in the database');
			done();
		});
  });
  
  // #12 should return {'status': 'error', 'message': 'missing a parameter'}
  
  it("should return {'status': 'error', 'message': 'missing a parameter'}", function(done) {
	
	//Calling API POST
	server
		.post("/api/test/items")
		.send({"item_name": "test", "price": "99"})
		.expect("Content-type", /json/)
		.expect(200) // HTTP response
		.end(function(err,res){
			// HTTP status should be 200
			res.status.should.equal(200);
			res.body.status.should.equal('error');
			res.body.message.should.equal('missing a parameter');
			done();
		});
  });
});