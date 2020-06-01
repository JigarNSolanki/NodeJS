var mongoose = require("mongoose");

// get the schema object 
var Schema = mongoose.Schema;

// Make new schema for expense
var expenseSchema = new Schema({
    username: { type: String, required: true },
    mode: { type: String, required: true },
    type: {type: String, required:true},
    amount: { type: Number, required: true},
    notes: {type: String}
}); 

// make the model of given schema
var Expense = mongoose.model("Expense",expenseSchema);

module.exports = Expense;
