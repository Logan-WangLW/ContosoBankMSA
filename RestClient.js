
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

exports.addNewAccount = function getData(url, username, accounts){
    var options = {
        url: url,
        method: 'POST',
        headers: {
            'ZUMO-API-VERSION': '2.0.0',
            'Content-Type':'application/json'
        },
        json: {
            "username" : username,
            "accounts" : accounts
        }
      };
      
      request(options, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(body);
        }
        else{
            console.log(error);
        }
      });
};

exports.deleteAccount = function deleteData(url,session, username ,accounts, id, callback){
    var options = {
        url: url + "\\" + id,
        method: 'DELETE',
        headers: {
            'ZUMO-API-VERSION': '2.0.0',
            'Content-Type':'application/json'
        }
    };

    request(options,function (err, res, body){
        if( !err && res.statusCode === 200){
            console.log(body);
            callback(body,session,username, accounts);
        }else {
            console.log(err);
            console.log(res);
        }
    })

};

exports.getCurrencies = function getData(url, session, baseCurrency, callback){
    request.get(url, function(err, res, body){
        if(err){
            console.log(err);
        }else {
            callback(body, session, baseCurrency);
        }
    });
};