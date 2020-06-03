var Expense = require("../model/expenseModel");
var User = require('../model/userModel');

module.exports = {
    getById,
    getAll,
    create,
    update,
    _delete
};

async function getById(id){
    return await Expense.findById(id);
}

async function getAll(){
    return await Expense.find({});
}

async function create(body){

    // split the expense eqyally among the users if mentioned
    if(body.splitEqually){
        var length = body.to_whom.length;
        var perHeadAmount = body.amount/length;
        var i =0;
        for(i=0;i< length;i++){
            body.to_whom[i].amount_received = perHeadAmount;
        }
    }
    // console.log(body.to_whom[0]);
    // console.log(body.to_whom[0].amount_received);
    // console.log(body.to_whom[0].id_of_receiver);

    // get details of payee using id
    var payee = await User.findById(body.id_by_whom);
    
    // create new expense and save it, grab the id of saved expense in newId
    var newExpense = Expense(body);
    var savedExpense = await newExpense.save()
    var newId = savedExpense._id;

    // add newId in payee's expense detail 
    payee.expenses = payee.expenses.concat(newId);

    // get the array of receivers
    receivers = body.to_whom;
    var i;
    for(i=0; i < receivers.length;i++){

        // get id and amount corresponding to each receiver
        var id_r = receivers[i].id_of_receiver;
        var amount_r = receivers[i].amount_received;

        // fatch details of receiver using it's id
        var receiver = await User.findById(id_r);
        // add the newId in receiver's expense detail
        receiver.expenses = receiver.expenses.concat(newId);

        /* check the account detail of payee, if it already contain
        the account with receiver get the index, otherwise create one */
        /* Do same with receiver account */
        
        var index = payee.account.findIndex(p => p.username_ == receiver.username);
        // index -1 indicates, payee doesn't have the account with receiver, so create one
        if(index == -1){
            payee.account = payee.account.concat({
                "username_" : receiver.username,
                "balance_": amount_r    // +ve in payee account indicates receiver owes payee 
           });
            receiver.account = receiver.account.concat({
               "username_" : payee.username,        
               "balance_": 0-amount_r   // -ve in receiver account indicates receiver owes payee
           });
        }
        // The account already exists so just add/substract the amount in payee/receiver balance
        else{
            payee.account[index].balance_ = payee.account[index].balance_ + amount_r;
            var index_r = receiver.account.findIndex(p => p.username_ == payee.username);
            receiver.account[index_r].balance_ = receiver.account[index_r].balance_ - amount_r;
        }
        receiver.save();
    }; 
    await payee.save();
}

async function update(){
    return 0;
}

async function _delete(id){
    return await Expense.findByIdAndRemove(id);
}