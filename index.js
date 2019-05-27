var request = require("request");
var cheerio = require("cheerio");
var fs      = require("fs");
var movies = [];

request("http://www.adorocinema.com/filmes/em-cartaz/estreias",function(err,res,body){
    if(err) console.log('Erro:'+ err);
    var $ = cheerio.load(body);
    $(".mdl").each(function(){
        var data = 
            {
                "title"  :  $(this).find(".meta-title-link").text().trim(),
                "image"  :  $(this).find(".thumbnail-img").attr("src"),
                "description" : $(this).find(".content-txt").text().trim(),
                "date"   : $(this).find(".date").text().trim()                 
            };
        movies.push(data);   
    });        
    var file = "launch_movies.json"; 
    var data = JSON.stringify({"movies":movies});
    fs.appendFile(file,data,'utf8',
        function(){
            fs.readFile(file, function(err,data){
                if(err) {
                    console.error("Could not open file: %s", err);
                    process.exit(1);
                }
                console.log(data.toString('utf8'));
            });
        }
    );
}); 