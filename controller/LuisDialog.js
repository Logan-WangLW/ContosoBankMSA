var builder = require('botbuilder');
var allAccounts = require('./GetAccount');
var allTransactions = require('./GetTransactions');
var manageAccounts = require('./ManageAccounts');
var exchange = require('./Currency');
var customVision = require('./CustomVision');

// Some sections have been omitted

exports.startDialog = function (bot) {
    
    // Replace {YOUR_APP_ID_HERE} and {YOUR_KEY_HERE} with your LUIS app ID and your LUIS key, respectively.
    var recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/bd006d15-aec7-457d-a9a6-6ae24d7f0410?subscription-key=57b2a919c00e4a46bd5044bcf05d436e&verbose=true&timezoneOffset=0&q=');

    bot.recognizer(recognizer);

    //commands help message using adpative cards
    // ** add images **
    bot.dialog('Commands', function (session) {
        if(!isAttachment(session)){
        session.send(new builder.Message(session).addAttachment({
            contentType: "application/vnd.microsoft.card.adaptive",
            content:
            {
                "type": "AdaptiveCard",
                "version": "1.0",
                "body": [
                    {
                        "wrap": true,
                        "type": "TextBlock",
                        "text": "\"My account\" or \"view account\"",
                        "size": "large"
                    },
                    {
                        "wrap": true,
                        "type": "TextBlock",
                        "text": "*See recent transactions (\"transactions\") and ability to read, create and delete accounts*",

                    },
                    {
                        "wrap": true,
                        "type": "TextBlock",
                        "text": "\"Foreign exchange\" or \"currency conversion\"" ,
                        "size": "large"
                    },
                    {
                        "wrap": true,
                        "type": "TextBlock",
                        "text": "*Ability to convert different curriences*",

                    },
                    {
                        "wrap": true,
                        "type": "TextBlock",
                        "text": "\"branches\"",
                        "size": "large"
                    },
                    {
                        "wrap": true,
                        "type": "TextBlock",
                        "text": "*provides a list of branches*",

                    },
                    {
                        "wrap": true,
                        "type": "TextBlock",
                        "text": "You can also upload images of notes or coins to identify the currency",

                    },
                    {
                        "wrap": true,
                        "type": "TextBlock",
                        "text": "Ask me common FAQs by typing \"QnA database\" and asking questions, I may be able to answer using the QnA database!",
                    },
                ]
            }
        }));
    }
}
    ).triggerAction({
        matches: 'Commands'
    });

    bot.dialog('EndSession',[
    function (session, args, next) {
        session.dialogData.args = args || {};     
        //detects if theres any session currently running   
        if (!session.conversationData["username"]) { 
            session.endDialog("There is currently no user logged in");                
        } else {
            next(); 
        }
    },
    function (session, results, next) {
            //exits session
            if(!isAttachment(session)){

            delete session.conversationData["username"]; 
            session.endDialog("You have been logged out");
        
            }
    }]).triggerAction({
    matches: 'EndSession'
    });

    bot.dialog('GetAccount', [
        function (session, args, next) {
            session.dialogData.args = args || {};        
            if (!session.conversationData["username"]) {
                builder.Prompts.text(session, "Can I have your username please");                
            } else {
                next(); // Skip if we already have this info.
            }
        },
        function (session, results, next) {
            if (!isAttachment(session)) {

                if (results.response) {
                    session.conversationData["username"] = results.response;
                }

                session.send("Retrieving your accounts...");
                allAccounts.displayAccounts(session, session.conversationData["username"]);  // <---- THIS LINE HERE IS WHAT WE NEED 
            }
        }
    ]).triggerAction({
        matches: 'GetAccount'
    });

    bot.dialog('GetTransactions', [
        function (session, args, next) {
            session.dialogData.args = args || {};        
            if (!session.conversationData["username"]) {
                builder.Prompts.text(session, "Can I have your username please");                
            } else {
                next(); // Skip if we already have this info.
            }
        },
        function (session, results, next) {
            if (!isAttachment(session)) {

                if (results.response) {
                    session.conversationData["username"] = results.response;
                }

                session.send("Retrieving your recent transactions...");
                allTransactions.displayTransactions(session, session.conversationData["username"]);  // <---- THIS LINE HERE IS WHAT WE NEED 
            }
        }
    ]).triggerAction({
        matches: 'GetTransactions'
    });

    bot.dialog('CreateAccount', [
        function (session, args, next) {
            session.dialogData.args = args || {};        
            if (!session.conversationData["username"]) {
                builder.Prompts.text(session, "Can I have your username please");                
            } else {
                next(); // Skip if we already have this info.
            }
        },
        function (session, results, next) {
            if(!isAttachment(session)){
                if (results.response) {
                    session.conversationData["username"] = results.response;     
               }
                // Pulls out account entity from the session if it exists
                var accountEntity = builder.EntityRecognizer.findEntity(session.dialogData.args.intent.entities, 'accounts');
    
                // Checks if the acount entity was found
                if (accountEntity) {
                session.conversationData["accounts"] = accountEntity.entity;
                  next();            

                } else {
                    builder.Prompts.text(session,"What would be the account type?");
                }
            }
        },
            function(session,results,next)
            {
                if(!isAttachment(session)){
                if (results.response){
                    session.send('Creating new account...');
                    session.conversationData["accounts"] = results.response;
                }
               session.send('Created new account:  %s', session.conversationData["accounts"]);
               manageAccounts.addNewAccount(session,session.conversationData["username"], session.conversationData["accounts"]);
            }
       }
       
    ]).triggerAction({
        matches: 'CreateAccount'
    });

    bot.dialog('DeleteAccount', [
        function (session, args, next) {
            session.dialogData.args = args || {};        
            if (!session.conversationData["username"]) {
                builder.Prompts.text(session, "Can I have your username please");                
            } else {
                next(); // Skip if we already have this info.
            }
        },
        function (session, results, next) {
           if (!isAttachment(session)) {
                if (results.response) {
                    session.conversationData["username"] = results.response;     
               }
                // Pulls out account entity from the session if it exists
                var accountEntity = builder.EntityRecognizer.findEntity(session.dialogData.args.intent.entities, 'accounts');
    
                // Checks if the account entity was found
                if (accountEntity) {
                session.conversationData["accounts"] = accountEntity.entity;
                next();
                }else{
                    builder.Prompts.text(session,"Which account would you like to delete?");
                }
            }},
                function(session,results,next)
                {
                    if(!isAttachment(session)){
                    if(results.response){
                        session.send('Deleting account...');
                        session.conversationData["accounts"] = results.response;
                    }
                
                session.send("Deleted account: %s",session.conversationData["accounts"]);
                manageAccounts.deleteAccount(session, session.conversationData["username"], session.conversationData["accounts"]); // <-- LINE WE WANT
                }
            }
    ]).triggerAction({
        matches: 'DeleteAccount'
    });

    bot.dialog('Currency', function (session, args) {
        if (!isAttachment(session)) {
            var baseCurrency = builder.EntityRecognizer.findEntity(args.intent.entities, 'base');

            if (baseCurrency) {
                baseCurrency = baseCurrency.entity.toUpperCase();
                    session.send('%s...', baseCurrency);
                    exchange.displayCurrencies(session, baseCurrency);
            } else {
                session.send("Currency unidentified, re-enter currency code");
            }
        }
    }).triggerAction({
        matches: 'Currency'
    });


}

function isAttachment(session) { 
    var msg = session.message.text;
    if ((session.message.attachments && session.message.attachments.length > 0) || msg.includes("http")) {
        //call custom vision
        customVision.retreiveMessage(session);

        return true;
    }
    else {
        return false;
    }
}