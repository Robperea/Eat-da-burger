const express = require('express');
const burger = require("../models/burger.js");
const router = express.Router();


router.get("/", function(req, res) {
  burger.selectAll(function(data){
    let bgrObject = {
      burgers: data
    };
    res.render("index", bgrObject); 
    console.log(bgrObject);
  });
});

router.post("/api/burgers", function(req, res){
  burger.insertOne([
    "burger_name", "devoured"
  ],[
    req.body.burger_name, req.body.devoured
  ], function(result) {
    console.log("router.post", result);
    res.json({id: result.insertID});
  });
});

router.put("/api/burgers/:id", function(req, res){
  let condition = "id = " + req.params.id;
  console.log ("condition", condition);

  let objColVals = "devoured = " + req.body.devoured;

  burger.updateOne(
    objColVals, condition, function(result){
    if (result.changedRows === 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/burgers/:id", function(req, res) {
  let condition = "id = " + req.params.id;

  burger.delete(condition, function(result) {
    if (result.affectedRows == 0) {
        
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});


module.exports = router; 