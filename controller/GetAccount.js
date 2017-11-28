var rest = require('../API/Restclient');
var builder = require('botbuilder');

exports.displayAccounts = function getAccount(session, username){
    var url = 'http://bankbotlw.azurewebsites.net/tables/bankbotlw';
    rest.getAccount(url, session, username, handleGetAccountResponse)
};
function handleGetAccountResponse(message, session, username) {
    var getAccountResponse = JSON.parse(message);
    var allAccounts = [];
    for (var index in getAccountResponse) {
        var usernameReceived = getAccountResponse[index].username;
        var accounts = getAccountResponse[index].accounts;

        //Convert to lower case whilst doing comparison to ensure the user can type whatever they like
        if (username.toLowerCase() === usernameReceived.toLowerCase()) {
            //Add a comma after all accounts unless last one
            if(getAccountResponse.length - 1) {
                allAccounts.push(accounts);
            } else if(getAccountResponose == ""){
                allAccounts.push(accounts);
            }
            else {
                allAccounts.push(accounts + ', ');
            }
        }        
    }
    
    // Print all accounts for the user that is currently logged in
    session.send("%s, your accounts are: %s", username, allAccounts);                
    
}
