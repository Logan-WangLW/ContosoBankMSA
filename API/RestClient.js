
var request = require('request')

exports.getAccount = function getData(url, session, accounts, callback){
    request.get(url, {'headers':{'ZUMO-API-VERSION': '2.0.0'}}, function(err,res,body){
        if(err){
            console.log(err);
        }else {
            callback(body, session, accounts);
        }
    });
};

exports.getTransactions = function getData(url, session, transactions, callback){
    request.get(url, {'headers':{'ZUMO-API-VERSION': '2.0.0'}}, function(err,res,body){
        if(err){
            console.log(err);
        }else {
            callback(body, session, transactions);
        }
    });
};