const Gun = require('../models/Gun')
exports.addGun = async function(req,res){
  //test to make sure they can be added correctly
 Gun.create({
    name:"test"
  })
  .then(res.send("saved?"))

}

exports.getGuns = function(req,res) {
res.send("hi")
}

exports.getGunById = function(req,res) {
  res.send(req.params.id)
}