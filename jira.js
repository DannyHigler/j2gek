// jira.js
// ========

var request = require('request');

module.exports = {

    getCurrentSprint: function (board_id) {

        var options = { method: 'GET',
            url: 'https://jira.cegeka.nl/rest/agile/1.0/board/133/sprint/772/issue',
            'rejectUnauthorized': false,
            qs: { state: 'active' },
            headers:
           { 'cache-control': 'no-cache',
               authorization: 'Basic ZC5oaWdsZXI6bm9hZmVlMDQ='
           }
        };

        request(options, function (error, response, body) {
            if (error) {
                console.log(error);
            }

            var count = 0;
            var done = 0;
            var total = 0;
            var progress = 0;
            var open = 0;            

            body = JSON.parse(body);
            total = body.total;

            body.issues.forEach(function (issues) {
                if (body.issues[count].fields.status.id == '6') {
                    done++;
                }

                if (body.issues[count].fields.status.id == '1') {
                    open++;
                }
                count++;
            });

           progress = total - open - done;
           var payload = {item:[{'value': done,'text': 'Done'},{'value': progress,'text': 'Doing'},{'value': open,'text': 'To do'}] };
           console.log(JSON.stringify(payload));
        });
    }





};



