var rest = require('../API/Restclient');
var builder = require('botbuilder');

exports.displayTransactions = function getTransactions(session, username){
    var url = 'http://bankbotlw.azurewebsites.net/tables/bankbotlw';
    rest.getTransactions(url, session, username, handleGetTransactionResponse)
};
function handleGetTransactionResponse(message, session, username) {
    var getTransactionResponse = JSON.parse(message);
    var allTransactions = [];
    for (var index in getTransactionResponse) {
        var usernameReceived = getTransactionResponse[index].username;
        var transactions = getTransactionResponse[index].transactions;

        //Convert to lower case whilst doing comparison to ensure the user can type whatever they like
        if (username.toLowerCase() === usernameReceived.toLowerCase()) {
            //Add a comma after all favourite foods unless last one
            if(getTransactionResponse.length - 1) {
                allTransactions.push(transactions);
            }
            else {
                allTransactions.push(transactions + ', ');
            }
        }        
    }
    
    // Print all favourite foods for the user that is currently logged in
    session.send("%s, your Transactions are: %s", username, allTransactions);                
    
}