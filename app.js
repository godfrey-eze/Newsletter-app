var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var port = 3000;
var request = require("request");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});
app.post("/", function (req, res) {
    var firstName = req.body.firstname;
    var lastName = req.body.lastname;
    var email = req.body.email;
    var data ={
        members:[
            {email_address:email,
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    'FNAME': firstName,
                    'LNAME': lastName,
                }
            }
        ]
    };
   var jsonData = JSON.stringify(data);
     var options = {
         url:'https://us5.api.mailchimp.com/3.0/lists/<mailchimp-unique-ID>/',
         method:"POST",
         headers: {
            'Authorization': '<ANY-Name> <mailchimp-API-KEY>',  
                 },
        body:jsonData 
     }
    request(options, function (error, response, body) {
        if (error) {
            console.log(error);
            res.sendFile(__dirname + "/failure.html")
        }else{
            if (response.statusCode===200) {
                res.sendFile(__dirname+ "/success.html");
                console.log(response.statusCode);
            }else{
                res.sendFile(__dirname + "/failure.html") 
                console.log(response.statusCode);
            }
           
             
        }
        
    })
    console.log(`My fullname is ${firstName} ${lastName} and my email is ${email}`);
    
})
app.post("/failure", function (req, res) {
    res.redirect("/");
})
app.listen(process.env.PORT || port, function () {
    console.log("Server is running on port 3000"); 
})
