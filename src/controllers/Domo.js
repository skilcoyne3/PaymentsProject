var _ = require('underscore');
var models = require('../models');

var Domo = models.Domo;

var makerPage = function(req, res) {

    Domo.DomoModel.findByOwner(req.session.account._id, function(err, docs) {

        if(err) {
            console.log(err);
            return res.status(400).json({error:'An error occurred'}); 
        }
        
        res.render('app', {payments: docs});
    });
};

var makeDomo = function(req, res) {

    if(!req.body.name || !req.body.price) {
        return res.status(400).json({error: "name and price required"});
    }
    
    var domoData = {
        name: req.body.name,
        price: req.body.price,
		//cost: req.body.cost,
        owner: req.session.account._id
    };
    
    var newDomo = new Domo.DomoModel(domoData);
    
    newDomo.save(function(err) {
        if(err) {
            console.log(err);
            return res.status(400).json({error:'An error occurred'}); 
        }

        res.json({redirect: '/maker'});
    });
    
};

module.exports.makerPage = makerPage;
module.exports.make = makeDomo;