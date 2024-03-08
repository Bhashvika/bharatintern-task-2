//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const homeStartingContent =
  `Welcome to our food blog! Here, we're all about adding a twist to classic recipes to create something uniquely delicious. Whether you're a seasoned chef or just starting out in the kitchen, we've got something for everyone. From savory dishes to sweet treats, get ready to explore a world of culinary creativity.\n
   -Recipes:\n

  -Cheddar Cheesecake Apple Pie: Take your classic apple pie to the next level with this indulgent twist. Creamy cheddar cheesecake filling is layered between slices of sweet, cinnamon-spiced apples, all nestled in a flaky pastry crust. It's the perfect combination of sweet and savory that will have your taste buds singing. Impress your guests at your next dinner party with this unique dessert.\n
  
  -Spicy Sriracha Meatballs: Add some heat to your meatballs with this fiery twist on a classic appetizer. Ground beef is seasoned with garlic, ginger, and soy sauce, then coated in a sticky sriracha glaze for a spicy kick. Serve them up as a party snack or pair them with rice for a flavorful main dish. These meatballs are perfect for spice lovers looking to add some excitement to their meals.\n
  
  -Caprese Stuffed Chicken Breast: Elevate your chicken dinner with this elegant twist on the classic caprese salad. Tender chicken breasts are stuffed with fresh mozzarella, juicy tomatoes, and fragrant basil, then baked to perfection. It's a simple yet impressive dish that's sure to impress. Serve it alongside a crisp salad for a light and refreshing meal that's bursting with flavor.`;
const aboutContent =
  "At our food blog, we believe that cooking should be fun, adventurous, and delicious. Our team of passionate foodies is dedicated to sharing inventive recipes that put a new spin on old favorites. From simple weeknight dinners to show-stopping desserts, we're here to inspire you to get creative in the kitchen. ";
const contactContent =
  "Have a question, comment, or just want to say hello? We'd love to hear from you! Drop us a line at contact@foodblog.com and we'll get back to you as soon as possible. You can also follow us on Instagram for more delicious recipes and behind-the-scenes fun.";
const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect('mongodb://127.0.0.1:27017/postDB', {useNewUrlParser: true, useUnifiedTopology: true});



const postSchema = new mongoose.Schema({
  Title: String,
  content: String
});

const Post =  mongoose.model("Post" , postSchema);





app.get("/", function (req, res) {
  Post.find({} , function(err , posts){
  res.render("home", {
    homestartingcontent: homeStartingContent,
    posts: posts,
  });
});
});



app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const post = new Post({
    Title: req.body.title,
    content: req.body.post,
  });
  post.save(function(err){
    if(!err){
      res.redirect("/")
    }
  });

});

app.get("/posts/:postid", function (req, res) {
  var requestedpostid = req.params.postid;

  Post.findOne({_id: requestedpostid}, function(err, post){
         res.render("post", { title: post.Title, content: post.content});
    
  });

});


 
  
 


app.listen(3000, function () {
  console.log("Server started on port 3000");
});
