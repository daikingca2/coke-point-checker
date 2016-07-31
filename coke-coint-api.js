'use strict';
// require modules
var request = require("request");
var cheerio = require('cheerio');

// make request
var options = { method: 'POST',
    url: 'http://c.cocacola.co.jp/pointcard/',
    headers:
    { 'content-type': 'application/x-www-form-urlencoded',
      'cache-control': 'no-cache' },
    // form: { cardnumber: '0001323344' } };
    form: { cardnumber: '0001323337' } };

// implementation for request
exports.get = request(options, function (error, response, body) {

    var respons_array = { count_point: '',
                          count_totalpoint: '',
                          count_coupon: '' };

    if (error) {
        throw new Error(error);
        return JSON.stringify(respons_array);
    }
    else {
        var parsed_respons = cheerio.load(body);
        respons_array.count_point = Number(parsed_respons("#count_point").text());
        respons_array.count_totalpoint = Number(parsed_respons("#count_totalpoint span").text());
        respons_array.count_coupon = Number(parsed_respons("#count_coupon").text());
        return JSON.stringify(respons_array);
    }
});
