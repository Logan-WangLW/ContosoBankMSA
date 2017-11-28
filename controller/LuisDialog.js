var builder = require('botbuilder');
// Some sections have been omitted

exports.startDialog = function (bot) {
    
    // Replace {YOUR_APP_ID_HERE} and {YOUR_KEY_HERE} with your LUIS app ID and your LUIS key, respectively.
    var recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/bd006d15-aec7-457d-a9a6-6ae24d7f0410?subscription-key=57b2a919c00e4a46bd5044bcf05d436e&verbose=true&timezoneOffset=0&q=');

    bot.recognizer(recognizer);

    // display welcome message and commands on start up
    // display welcome message
    // adapted from Contoso flowers sample
    bot.on('conversationUpdate', function (message) {
        if (message.membersAdded) {
            message.membersAdded.forEach(function (identity) {
                if (identity.id === message.address.bot.id) {
                    var welcomeMessage = new builder.Message()
                    .address(message.address)
                    .text("Welcome! I am Count, the Contoso Bank Bot. Below is a list of things that I can do!");
                    bot.send(welcomeMessage);
                    
                    //go into commands function
                    bot.beginDialog(message.address, 'Commands');
                }
            });
        }
    });

    //commands help message using adpative cards
    // ** add images **
    bot.dialog('Commands', function (session) {
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
                        "text": "*See recent transactions and ability to read, create and delete accounts*",

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
    }).triggerAction({
        matches: 'Commands'
    });

    bot.dialog('GetAccount', function (session, args) {


            // Pulls out the account entity from the session if it exists
            var accountEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'account');

            // Checks if the for entity was found
            if (accountEntity) {
                session.send('Your account is:', accountEntity.entity);

            } else {
                session.send("No Account identified, try again!");
            }
 
    }).triggerAction({
        matches: 'GetAccount'
    });

    bot.dialog('CreateAccount', function (session, args) {
        
        session.send("CreateAccount intent found");
    
    }).triggerAction({
        matches: 'CreateAccount'
    });

    bot.dialog('DeleteAccount', function (session, args) {
        
        session.send("DeleteAccount intent found");
    
    }).triggerAction({
        matches: 'DeleteAccount'
    });

    bot.dialog('ForeignExchange', function (session, args) {
        
        session.send("ForeignExchange intent found");
    
    }).triggerAction({
        matches: 'ForeignExchange'
    });

    bot.dialog('GetBranch', function (session, args) {
        
        session.send("GetBranch intent found");
    
    }).triggerAction({
        matches: 'GetBranch'
    });

    bot.dialog('QnA', function (session, args) {
        
        session.send("QnA intent found");
    
    }).triggerAction({
        matches: 'QnA'
    });

}
