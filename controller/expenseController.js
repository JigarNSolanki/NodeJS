var express = require('express');
var router = express.Router();
var Expense = require("../model/expenseModel");
var User = require('../model/userModel');
var expenseService = require("./expenseService");

router.get("/:id", getById);
router.get('/', getAll);
router.post("/create",create);
router.delete("/:id", _delete);

module.exports = router;

async function getById(req,res,next){
    expenseService.getById(req.params.id)
        .then(expense => expense ? res.json(expense) : res.sendStatus(404))
        .catch(err => next(err));
}

async function getAll(req, res,next){
    expenseService.getAll()
        .then(expenses => res.json(expenses))
        .catch(err => next(err));
}

async function create(req,res,next){
    expenseService.create(req.body)
        .then(() => res.json("Expense has been added successfully"))
        .catch(err => next(err));    
}

async function _delete(req,res,next){
    expenseService._delete(req.params.id)
        .then(() => res.json("Expense deleted successfully"))
        .catch(err => next(err));
}
