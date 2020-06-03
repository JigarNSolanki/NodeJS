var Expense = require("./expenseModel");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    username: { type: String, unique: true, required: true },   // username need to be unique
    hash: { type: String, required: true },                     // To hash the password
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    expenses: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Expense'},
    ],
    account: [
        {
            username_ :  {type: String},
            balance_: {type: Number} 
        },
    ]
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
       delete ret._id;                      // deleting '_id' as it is repeating with "id".
      delete ret.hash;                      // deleting 'hash' which is not need to be displayed.
    }
});

var User = mongoose.model('User', schema);
module.exports = User;