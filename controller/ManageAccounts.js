var rest = require('../API/Restclient');
var builder = require('botbuilder');

exports.addNewAccount = function addNewAccount(session, username, accounts){
    var url = 'http://bankbotlw.azurewebsites.net/tables/bankbotlw';
    rest.addNewAccount(url, username, accounts);
};

exports.deleteAccount = function deleteAccount(session,username,accounts){
    var url  = 'http://bankbotlw.azurewebsites.net/tables/bankbotlw';


    rest.getAccount(url,session, username ,function(message,session,username){
     var   allAccounts = JSON.parse(message);

        for(var i in allAccounts) {

            if (allAccounts[i].accounts === accounts && allAccounts[i].username === username) {

                console.log(allAccounts[i]);

                rest.deleteAccount(url,session,username,accounts, allAccounts[i].id ,handleDeletedAccountsResponse)

            }
        }


    });


};

function handleDeletedAccountsResponse(body,session, username,accounts){
    console.log('Deleted');
}