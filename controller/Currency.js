var rest = require('../API/RestClient');
var builder = require('botbuilder');

exports.displayCurrencies = function (session,  baseCurrency){
    var url = "https://api.fixer.io/latest?base=" + baseCurrency;

    rest.getCurrencies(url, session, baseCurrency, calculateCurrencies);
}

function calculateCurrencies(message, session, baseCurrency){

    var exchangeRateList = JSON.parse(message).rates;    

        var currenciesList = [];
        for (var key in exchangeRateList){
            var currencyItem = {};
            currencyItem.title = key;
            currencyItem.value = "" + exchangeRateList[key];
            currenciesList.push(currencyItem);
        }
        console.log(currenciesList);

        session.send(new builder.Message(session).addAttachment({
            contentType: "application/vnd.microsoft.card.adaptive",
            content: {
                "type": "AdaptiveCard",
                "version": "0.5",
                "body": [
                    {
                        "type": "Container",
                        "items": [
                            {
                                "type": "TextBlock",
                                "text": "1 " + baseCurrency + " = ",
                                "size": "large"
                            }
                        ]
                    },
                    {
                        "type": "Container",
                        "spacing": "none",
                        "items": [
                            {
                                "type": "ColumnSet",
                                "columns": [
                                    {
                                        "type": "Column",
                                        "width": "auto",
                                        "items": [
                                            {
                                                "type": "FactSet",
                                                "facts": currenciesList,
                                                "spacing": "large"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        }));
    }