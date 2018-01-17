/*** Middleware Code is here **********/
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
   if(req.isAuthenticated()){
        Campground.findById(req.params.id).populate("comments").exec(function(error, foundCampGround){
           if(error || !foundCampGround){
                req.flash("error", "Campground Not Found!");
                res.redirect("back");
           } else{
                //does user own the CampGround
                if(foundCampGround.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error", "You don't have permission to do that!");
                    res.redirect("back");
                }
           }
        });
    }else{
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err || !foundComment){
                req.flash("error", "Comment not found. Please check");
                res.redirect("back");
            }else{
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error", "You don't have permission to do that!");
                    res.redirect("back");
                }
            }
        });
    }else{
         req.flash("error", "You need to be Logged-in First!");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be Logged-in First!");
    res.redirect("/login");
}


module.exports = middlewareObj;