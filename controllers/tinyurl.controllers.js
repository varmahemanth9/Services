const mongoose = require("mongoose"),
Tinyurl = mongoose.model('Tinyurl'),
md5 = require('md5'),
config = require('./../config');

function checkExistingKey(settings, counter, done) {
    let shortKey = settings.fullHash.substring(counter, counter + config.keySize);
    Tinyurl.findOne({shortKey: shortKey}).count()
        .then((res)=>{
            if (res>0) {
                if (counter + config.keySize >= config.md5Size) {
                    generateShortKey(settings.longUrl, function(getKey){
                        done(genKey);
                    });
                } else {
                    checkExistingKey(settings, counter+1, function(genKey){
                        done(genKey);
                    });
                }  
            } else {
                done(shortKey);
            }
        })
        .catch((err)=>{
           done(err);
        });
}
function generateShortKey(longUrl, done) {
    let urlObj = {
        longUrl: longUrl,
        created: new Date
    };
    let fullHash = md5(JSON.stringify(urlObj));
    checkExistingKey({fullHash,longUrl}, 0, function(genKey){
        done(genKey);
    });
}
module.exports.create = function(req,res,next) {
    let data = req.body;
    if (data.longUrl) {
        generateShortKey(data.longUrl, function(shortKey){
            if (shortKey instanceof Error) {
                next(shortKey);
            } else {
                let newUrl = new Tinyurl();
                newUrl.longUrl = data.longUrl;
                newUrl.shortKey = shortKey;
                newUrl.save()
                    .then((saveRes)=>{
                        res.jsonp(saveRes);
                    })
                    .catch((err)=>{
                        next(err);
                    });
            }
        });
    } else {
        let err = new Error("Tinyurl doesn't exists");
        next(err);
    }
};
module.exports.update = function(req,res,next) {
    let data = req.body;
    if (data.longUrl) {
        Tinyurl.updateOne({_id: req.tinyurl._id, deleted: false},{$set:{longUrl: data.longUrl, lastUpdated: new Date}})
            .then((updateRes)=>{
                res.jsonp(updateRes);
            })
            .catch((err)=>{
                next(err);
            });
    } else {
        let err = new Error("Invalid Data");
        next(err);
    }
};
module.exports.delete = function(req,res,next) {
    Tinyurl.updateOne({_id: req.tinyurl._id},{$set: {deleted: true, lastUpdated: new Date}})
        .then((deleteRes)=>{
            res.jsonp(deleteRes);
        })
        .catch((err)=>{
            next(err);
        });
};
module.exports.fetch = function(req,res,next,shortKey) {
    Tinyurl.findOne({shortKey: shortKey})
        .then((getRes)=>{
            req.tinyurl = getRes;
            next();
        })
        .catch((err)=>{
            next(err);
        });
};
module.exports.redirect = function(req,res,next) {
    if (req.tinyurl?.longUrl && !req.tinyurl?.deleted) {
        res.status(302).redirect(req.tinyurl.longUrl);
    } else {
        let err = new Error("Tinyurl doesn't exists");
        next(err);
    }
};