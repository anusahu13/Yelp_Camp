var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware")  // require method automatically checks for index.js file inside root folder

router.get("/new", middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(error, campData){
        if(error){
            req.flash("error", error.message);
            req.redirect("back");
        }else{
            res.render("comments/new", {campground : campData});
        }
    });
    
});

//create comment
router.post("/", middleware.isLoggedIn, function(req, res){
   //Campground.findById(req.params.id, function(error, foundCampGround){
    Campground.findById(req.params.id).populate("comments").exec(function(error, foundCampGround) { 
       if(error){
            req.flash("error", error.message);
            res.redirect("/campground");
       }else{
           Comment.create(req.body.comment, function(error, comment){
               if(error){
                   req.flash("error", error.message);
                   res.redirect("/campground");
               }else{
                   comment.author.id = req.user._id;
                   comment.author.username = req.user.username;
                   comment.save();
                   
                   foundCampGround.comments.push(comment);
                   foundCampGround.save();
                   req.flash("success", "Added new Comment");
                   res.redirect("/campgrounds/"+foundCampGround._id );
               }
               
           });
       }
   });
});

//Edit comment route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req,res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        }else{
            res.render("comments/edit", {campgroundId: req.params.id, comment: foundComment });
        }
    }) ;  
});

// UPDATE comment
router.put("/:comment_id", middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updComment){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        }else{
            req.flash("success", "Updated comment successfully");
            res.redirect("/campgrounds/"+ req.params.id);
        }     
    });
});

//Comment Destroy
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        }else{
            req.flash("success", "Comment deleted successfully!");
            res.redirect("/campgrounds/"+ req.params.id);
        }
    })    
});

module.exports = router;