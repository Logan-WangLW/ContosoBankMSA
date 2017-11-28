var request = require('request'); //node module for http post requests

exports.retreiveMessage = function (session){

    request.post({
        url: 'https://southcentralus.api.cognitive.microsoft.com/customvision/v1.0/Prediction/f4973418-0283-4863-9611-bfbbe48011ac/url?iterationId=6baa81a3-5798-4007-9cc2-6217a6fd01c4',
        json: true,
        headers: {
            'Content-Type': 'application/json',
            'Prediction-Key': 'd8715acccea74200966cfba3d0d8392a'
        },
        body: { 'Url': session.message.text }
    }, function(error, response, body){
        console.log(validResponse(body));
        session.send(validResponse(body));
    });
}

function validResponse(body){
    if (body && body.Predictions && body.Predictions[0].Tag){
        return "This is " + body.Predictions[0].Tag
    } else{
        console.log('Oops, please try again!');
    }
}