var express = require('express');
var router = express.Router();
var Expense = require("../model/expenseModel");
var bodyParser = require("body-parser");

router.get("/:uname", getByUserName);
router.get("/:id", getById);
router.get('/', getAll);
router.post("/create",create);
router.put("/:id",update);
router.delete("/:id", _delete);

module.exports = router;

function getByUserName(req,res){
    Expense.find({ username: req.params.uname }, function(err, expense) {
        if (err) throw err;
       res.send(expense);
    });
}

function getById(req,res){
    Expense.findById({ _id:req.params.id}, function(err,expense){
        if(err) throw err;
        res.send(expense);
    });
}

function getAll(req,res){
    Expense.find( function(err,expenses){
        if(err) throw err;
            res.send(expenses);
    });
}

function create(req,res){
    var expense = new Expense(req.body);
    expense.save(function(err){
        if(err) throw err;
        res.send("New expense added successfully");
    });
}

function update(req,res){
    if(req.params.id){
        Expense.findByIdAndUpdate(req.params.id, {
            username: req.body.username,
            mode: req.body.mode,
            type: req.body.type,            
            amount: req.body.amount,
            notes: req.body.notes
        }, function(err,expense){
            if(err) throw err;
            res.send("Successfully updated"); 
        });
    }
    else{
        res.send("No expense available to be updated, create new one");
    }   
}


function _delete(req,res){
    Expense.findByIdAndRemove(req.params.id, function(err) {
        if (err) throw err;
        res.send('Deleted successfully');
    });
}

