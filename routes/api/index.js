const router = require("express").Router();
const db = require("../../models")
var passport = require("../../config/passport");

router.route("/signup")
    .post((req, res) => {

        db.User.create(req.body)
            .then(function () {
                res.json("Authenticated");
            })
            .catch(function (err) {
                console.log(err);
            });

    });

router.route("/login")

    .post(passport.authenticate("local"), (req, res) => {

        if (req.user) {
            console.log(req.user)
            res.sendStatus(200)
        }
        else {

            res.sendStatus(502)
        }

    });

router.route("/logout")
    .get((req, res) => {
        console.log(req.user)
        req.logout();
        console.log(req.user)
        res.sendStatus(200);
    });

router.route("/userIncome")
    .put((req, res) => {
        console.log(req.user)
        if (req.user) {
            console.log(req.body)
            db.User.findOneAndUpdate({ email: req.user.email }, { $push: { income: req.body } })
                .then(savedUser => {
                    if (savedUser) {
                        console.log(savedUser)
                        res.sendStatus(200)
                        console.log("Created new income");
                    } else if (!savedUser) {
                        console.log('ERROR: Could not post to db');
                    }
                })

        }
        else {
            res.sendStatus(502)
        }

    });

router.route("/userData")
    .get((req, res) => {
        if (req.user) {
            db.User.find({ email: req.user.email })
                .then(function (dbUserSavings) {
                    res.json(dbUserSavings);
                })
                .catch(function (err) {
                    res.json(err);
                });
        }
        else {
            res.sendStatus(502)
        }

    });
router.route("/updateIncome")

    .put((req, res) => {
        console.log(req.body)
        if (req.user) {
            db.User.updateOne({ "income._id": req.body._id }, { $set: { "income.$.title": req.body.title, "income.$.amount": req.body.amount } })
                .then(function (dbUserSavings) {
                    res.json(dbUserSavings);
                })
                .catch(function (err) {
                    res.json(err);
                });
        }
        else {
            res.sendStatus(502)
        }

    });

router.route("/deleteIncome")
    .put((req, res) => {
        if (req.user) {

            db.User.updateOne({ email: req.user.email }, { $pull: { income: { _id: req.body.id } } })
                .then(function (dbUserSavings) {
                    res.json(dbUserSavings);
                })
                .catch(function (err) {
                    res.json(err);
                });
        }
        else {
            res.sendStatus(502)
        }

    });



module.exports = router;