// get mongodb connection string and secret 

module.exports = {
    getDBConnectionString: function(){
        return "mongodb+srv://user1:user1@expensemanagement-gh7w6.gcp.mongodb.net/test?retryWrites=true&w=majority"
    },
    getSecret: function(){
        return "Some secret string"
    } 
}