var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
        {
            name :"bridge camp", 
            image:"http://nwtripfinder.com/wp-content/uploads/2011/05/Ohanapecoshbridge_TheGirlsNY.jpg",
            desc:"Camping near forest with beautiul bridge."+
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eu ante at purus commodo placerat et sit amet diam. Nullam facilisis massa ac ante faucibus, sed finibus leo sagittis. Ut consectetur cursus aliquet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas sodales tortor justo, sed porta mi mollis a. In hac habitasse platea dictumst. Aenean pharetra semper massa id dictum. Nullam aliquam massa ut nibh fermentum blandit. Vivamus ut nisl leo. Nulla sollicitudin molestie ex, ac tincidunt turpis sodales vitae. Pellentesque auctor in massa vitae venenatis. Donec gravida urna mollis, placerat tortor quis, vulputate lectus. Aliquam fermentum sollicitudin tellus ac eleifend. Suspendisse tincidunt odio diam, id luctus velit sagittis non. Aenean congue augue sapien, et pellentesque felis dictum eget. Donec cursus sollicitudin eros et aliquet."
        },
        {
            name :"ocean camp", 
            image:"http://www.seattlemag.com/sites/default/files/field/image/rclapush-0300_0.jpg",
            desc: "Camping near ocean with beautiul view."+
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eu ante at purus commodo placerat et sit amet diam. Nullam facilisis massa ac ante faucibus, sed finibus leo sagittis. Ut consectetur cursus aliquet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas sodales tortor justo, sed porta mi mollis a. In hac habitasse platea dictumst. Aenean pharetra semper massa id dictum. Nullam aliquam massa ut nibh fermentum blandit. Vivamus ut nisl leo. Nulla sollicitudin molestie ex, ac tincidunt turpis sodales vitae. Pellentesque auctor in massa vitae venenatis. Donec gravida urna mollis, placerat tortor quis, vulputate lectus. Aliquam fermentum sollicitudin tellus ac eleifend. Suspendisse tincidunt odio diam, id luctus velit sagittis non. Aenean congue augue sapien, et pellentesque felis dictum eget. Donec cursus sollicitudin eros et aliquet."
        },
        {
            name :"luxury camp", 
            image:"http://www.northwestmilitary.com/guides/2014/05/Luxury-camping-in-Washington-state/uploads/articles/24028-banner-Summer-Glamping-625.jpg",
            desc:"Camping with family"+
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eu ante at purus commodo placerat et sit amet diam. Nullam facilisis massa ac ante faucibus, sed finibus leo sagittis. Ut consectetur cursus aliquet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas sodales tortor justo, sed porta mi mollis a. In hac habitasse platea dictumst. Aenean pharetra semper massa id dictum. Nullam aliquam massa ut nibh fermentum blandit. Vivamus ut nisl leo. Nulla sollicitudin molestie ex, ac tincidunt turpis sodales vitae. Pellentesque auctor in massa vitae venenatis. Donec gravida urna mollis, placerat tortor quis, vulputate lectus. Aliquam fermentum sollicitudin tellus ac eleifend. Suspendisse tincidunt odio diam, id luctus velit sagittis non. Aenean congue augue sapien, et pellentesque felis dictum eget. Donec cursus sollicitudin eros et aliquet."
        },
    ];

function seedDB(){
    // Remove All campgroud data
    Campground.remove({}, function(error){
        if(error){
            console.log("Error:" + error);
        }
        console.log("All campground data removed");
        
        //Add few Campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(error, campground){
                if(error){
                     console.log("Error:" + error);
                }else{
                    console.log("Added campground data");
                    //Create a comment 
                    Comment.create({
                        text : "Great Camping Place. Loved It. Into the nature, away from technologies!",
                        author: "Anu"
                    }, function(error, comment){
                        if(error){
                            console.log("Db Error:" + error);
                        }else{
                            campground.comments.push(comment);
                            campground.save();
                            console.log("Added new comment");
                        }
                    })
                }
            });
         });
    
    });
    
    
   
    
}

module.exports = seedDB;