var builder = require('botbuilder');
// Some sections have been omitted

exports.startDialog = function (bot) {
    
    // Replace {YOUR_APP_ID_HERE} and {YOUR_KEY_HERE} with your LUIS app ID and your LUIS key, respectively.
    var recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/bd006d15-aec7-457d-a9a6-6ae24d7f0410?subscription-key=57b2a919c00e4a46bd5044bcf05d436e&verbose=true&timezoneOffset=0&q=');

    bot.recognizer(recognizer);

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

    bot.dialog('CreatePayees', function (session, args) {
        
        session.send("CreatePayees intent found");
    
    }).triggerAction({
        matches: 'CreatePayees'
    });

    bot.dialog('GetPayees', function (session, args) {
        
        session.send("GetPayees intent found");
    
    }).triggerAction({
        matches: 'GetPayees'
    });

    bot.dialog('UpdatePayees', function (session, args) {
        
        session.send("UpdatePayees intent found");
    
    }).triggerAction({
        matches: 'UpdatePayees'
    });

    bot.dialog('DeletePayees', function (session, args) {
        
        session.send("DeletePayees intent found");
    
    }).triggerAction({
        matches: 'DeletePayees'
    });

    bot.dialog('ForeignExchange', function (session, args) {
        
        session.send("ForeignExchange");
    
    }).triggerAction({
        matches: 'ForeignExchange'
    });

    bot.dialog('Welcome', function (session, args) {
        
        session.send("Welcome intent found");
    
    }).triggerAction({
        matches: 'Welcome'
    });

    bot.dialog('GetBranch', function (session, args) {
        
        session.send("GetBranch intent found");
    
    }).triggerAction({
        matches: 'GetBranch'
    });

    bot.dialog('GetTransactions', function (session, args) {
        
        session.send("GetTransactions intent found");
    
    }).triggerAction({
        matches: 'GetTransactions'
    });

    bot.dialog('LookForATM', function (session, args) {
        
        session.send("LookForATM intent found");
    
    }).triggerAction({
        matches: 'LookForATM'
    });

}
