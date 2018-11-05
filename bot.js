const Telegraf = require('telegraf')
const http = require('http');
var request = require('request');
var cheerio = require('cheerio');
require('dotenv').config();
const bot = new Telegraf(process.env.Token);
var rp = require('request-promise');

bot.start((ctx) =>{
            ctx.reply('Welcome to Lenk Plox! \nEnter /help to know supported command')
        });
bot.command('help',(ctx) => ctx.reply('Enter Search query!You will get a magnet link,copy that link in your torrent client and you are good to go.'))
bot.on('text',(ctx) => {
    search_query = ctx.message.text;
    //console.log(ctx.mesasage.text);
    var query = search_query.split(' ').join('+');
    var pageToVisit = "https://1337x.to/search/"+query+"/1/";
console.log("Visiting page " + pageToVisit);
rp(pageToVisit, function(error, response, body) {
   if(error) {
     console.log("Error: " + error);
   }
   // Check status code (200 is HTTP OK)
   console.log("Status code: " + response.statusCode);
   if(response.statusCode === 200) {
     // Parse the document body
     var $ = cheerio.load(body);
     var link = $('.icon').next().attr("href");
     console.log("Error: " +link);
     var NewPageToVisit = "https://1337x.to"+ link;
     rp(NewPageToVisit,function(error,response,body){
        if(error) {
            console.log("Error: " + error);
          }
          // Check status code (200 is HTTP OK)
          console.log("Status code: " + response.statusCode);
          if(response.statusCode === 200) {
            var $ = cheerio.load(body);
            var magnetLink = $('.download-links-dontblock a').attr("href");
            //console.log(magnetLink);
            //return magnetLink;
            ctx.reply(magnetLink);
          }
        
     });
   }
});
    //ctx.reply(magnet_link);
    LogCtx(ctx);    
});
bot.on("sticker", ctx => {
    ctx.reply('Type something to search');
    LogCtx(ctx);
});

bot.catch((err) => {
    console.log('Ooops', err)
});
function search(search_query) {
    var search = search_query
   
}

function LogCtx(ctx) {
    console.log(ctx.message.text + " Sent by " + ctx.message.from.username);
}


function HTTPHandler(req, res) {
    console.log(req);
}
var port = process.env.PORT || 8000;
http.createServer(HTTPHandler).listen(port);
console.log("Running on port " + port);
bot.startPolling();
