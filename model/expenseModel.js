var User = require("./userModel");
var mongoose = require("mongoose");

// get the schema object 
var Schema = mongoose.Schema;

// Make new schema for expense
var expenseSchema = new Schema({
    expenseName: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
    amount: {type: Number, required: true},
    id_by_whom: {type: String, required: true},
    to_whom:[
        {
        id_of_receiver: { type: String, required:true},
        amount_received: {type: Number, required: true, default: 0}
        },
    ],
    splitEqually: {type: Boolean, default:0}
}); 

// make the model of given schema
var Expense = mongoose.model("Expense",expenseSchema);

module.exports = Expense;
