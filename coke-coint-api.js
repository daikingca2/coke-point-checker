// require modules
var request = require("request");
var cheerio = require('cheerio');

// implementation for request
module.exports.get = function(number) {
    // promise
    return new Promise(function (resolve, reject) {
        // make request
        var options = { method: 'POST',
            url: 'http://c.cocacola.co.jp/pointcard/',
            headers:
            { 'content-type': 'application/x-www-form-urlencoded',
              'cache-control': 'no-cache' },
            form: { cardnumber: number }
        };
        request(options, function (error, response, body) {

            var respons_array = { count_point: '',
                                  count_totalpoint: '',
                                  count_coupon: ''
            };

            if (error) {
                reject(respons_array);
            }
            else {
                var parsed_respons = cheerio.load(body);
                respons_array.count_point = Number(parsed_respons("#count_point").text());
                respons_array.count_totalpoint = Number(parsed_respons("#count_totalpoint span").text());
                respons_array.count_coupon = Number(parsed_respons("#count_coupon").text());
                resolve(respons_array);
            }
        });
    });
}
