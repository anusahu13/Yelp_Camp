var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware")  // require method automatically checks for index.js file inside root folder

/*router.get("/", function(req, res){
   res.render("landing");
});*/

// INDEX
router.get("/", function(req, res){
    Campground.find({}, function(error, allCampgrounds){
        if(error){
           req.flash("error", error.message);
           return res.redirect("back");
       } else{
           res.render("campgrounds/index", {campgrounds : allCampgrounds}); 
       }   
    });
});

//CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from the user and add to campgrounds array
    var name= req.body.name;
    var image=req.body.imgurl;
    var desc = req.body.desc;
    var author = {
        id : req.user._id,
        username : req.user.username
    };
    
    var newCampGround = {name: name, image: image, desc:desc, author: author};
    
    Campground.create(
        newCampGround,  function(error, campgrnd){
           if(error){
               req.flash("error", error.message);
               res.redirect("back");
            } else{
               req.flash("Success", "Campground added");
               //redirect back to campgrounds page
                res.redirect("/campgrounds");
            }
        });
});

//NEW FORM
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("campgrounds/new"); 
});

//SHOW one campground
router.get("/:id", function(req,res){
    // .populate() is used to show campground along with Comments
    Campground.findById(req.params.id).populate("comments").exec(function(error, foundCampGround){
       if(error || !foundCampGround){
           req.flash("error", "Campground not found!");
           res.redirect("back");
       } else{
           //console.log(foundCampGround);
           res.render("campgrounds/show", {campground : foundCampGround});
       }
    });
});

//Edit Campground
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
        Campground.findById(req.params.id).populate("comments").exec(function(error, foundCampGround){
            res.render("campgrounds/edit", {campground : foundCampGround});
        });
});

//Update Campground
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampGround){
        if(err){
            req.flash("error", err.message);
            res.redirect("/campgrounds");
        }else{
            req.flash("success", "Campground updated successfully!");
            res.redirect("/campgrounds/"+ req.params.id);
        }
    });
});

//DESTROY campground route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(error){
         if(error){
            req.flash("error", error.message);
            res.redirect("/campgrounds");
        }else{
            req.flash("success", "Campground deleted successfully!");
            res.redirect("/campgrounds");
        }
    });
});


module.exports = router;