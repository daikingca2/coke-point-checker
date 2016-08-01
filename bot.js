// use botkit
var botkit = require('botkit');
var coke = require('./coke-coint-api.js');

// controller
var controller = botkit.slackbot({
    debug: false
});

// check api token
if (!process.env.token) {
    console.log('Error: Specify token in environment');
    process.exit(1);
}

// start rtm
var bot = controller.spawn({
    token: process.env.token
}).startRTM();

// main hears function
controller.hears('[0-9]{10}', ['direct_message', 'mention', 'ambient'], function (bot, message) {
    // validation
    if (message.text.substring(0,10) === message.match[0]) {
        if (message.text.length == 10) {
            // call api
            coke.get(message.text).then(function onFuifilled(value) {
                if (value.count_point !== 0 || value.count_totalpoint !== 0 || value.count_coupon != 0) {
                    var res = '>ポイント数: ' + String(value.count_point) + '\n'
                                 + '>総ポイント数: ' + String(value.count_totalpoint) + '\n'
                                 + '>クーポン数: ' + String(value.count_coupon);
                    bot.reply(message, res);
                }
                else {
                    var error_message = '入力されたカード番号は使われていません:scream:';
                    bot.reply(message, error_message);
                }
            }).catch(function onRejected(error) {
                // api error
                var api_error_message = '入力されたカード番号は使われていません:scream:';
                bot.reply(message, api_error_message);
            });
        }
    }
    else {
        // validation error
        return;
    }
});
