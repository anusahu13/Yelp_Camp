var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//root route 
router.get("/", function(req, res){
   res.render("landing");
});

//register form
router.get("/register", function(req, res) {
    res.render("register");
});

//create user registration
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(error, user){
        if(error){
            req.flash("error", error.message);
            return res.redirect("/register");
        }     
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "You have signed up successfully. Welcome to Yelp Camp!" );
            res.redirect("/campgrounds"); 
        });
    });
});

//login form
router.get("/login", function(req, res) {
    res.render("login");
});

//login user
router.post("/login",passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }) ,function(req, res) {
});

//logout user
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged you out!")
    res.redirect("/campgrounds");
})

module.exports = router;