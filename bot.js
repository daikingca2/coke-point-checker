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

// say hi (test)
controller.hears('hi', ['direct_message', 'mention', 'ambient'], function (bot, message) {
    bot.reply(message, 'hi');
});

// response test
controller.hears('get', ['direct_message', 'mention', 'ambient'], function (bot, message) {
    var response = 'res';
    bot.reply(message, response);
});

controller.hears('coke', ['direct_message', 'mention', 'ambient'], function (bot, message) {
    var pointcard_number = '0001323337';
    coke.get(pointcard_number).then(function onFuifilled(value) {
        bot.reply(message, value);
    }).catch(function onRejected(error) {
        bot.reply(message, error);
    })
    // bot.reply(message, res);
});

controller.hears('cola', ['direct_message', 'mention', 'ambient'], function (bot, message) {
    bot.reply(message, coke.get());
});
