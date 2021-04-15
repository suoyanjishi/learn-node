const querystring = require('querystring');
const http = require('http');
const url = require('url');
const fs = require('fs');

const game = require('./game');

let playerWon = 0;
let playerLastAction = null;
let sameCount = 0;

http.createServer(
    function(request, response){
        const parseUrl = url.parse(request.url);

        if(parseUrl.pathname === '/favicon.ico') {
            response.writeHead(200);
            response.end();
            return;
        }
        if(parsedUrl.pathname === '/game') {
            const query = querystring.parse(parseUrl.query);
            const playerAction = query.action;

            if(playerWon >= 3 || sameCount === 9){
                response.writeHead(500);
                response.end('我再也不和你玩了！');
                return
            }

            if(playerLastAction && playerAction === playerLastAction){
                sameCount++;
            }else {
                sameCount = 0;
            }
            playerLastAction = playerAction;

            if(sameCount >= 3){
                response.writeHead(400);
                response.end('你作弊!')
            }
        }
    }
).listen(3000)