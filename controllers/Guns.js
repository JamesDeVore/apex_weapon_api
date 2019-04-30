const Gun = require("../models/Gun");
const allGuns = require("../data/gunData.json");

exports.addGun = async function(req, res, next) {
  //test to make sure they can be added correctly
  let {
    id,
    AMMO,
    NAME,
    DESCRIPTION,
    TYPE,
    ATTACHMENTS = "test here",
    MAG_SIZE,
    DAMAGE,
    PROJECTILES_PER_SHOT,
    HEADSHOT_MULTIPLIER,
    RAW_RPM,
    EMPTY_RELOAD_TIME,
    LOADED_RELOAD_TIME,
    RPM_ADJUSTED_FOR_RELOAD,
    RAW_RPS,
    RPS_ADJUSTED_FOR_RELOAD,
    RAW_DPS_BODY,
    MAX_HEADSHOT_RANGE
  } = req.body;

  Gun.findOne({ gunID: id }, (err, foundGun) => {
    if (!foundGun) {
      Gun.create({
        name: NAME,
        decription: DESCRIPTION,
        gunID: id,
        class: TYPE,
        ammunition: AMMO,
        magazine: parseInt(MAG_SIZE),
        rpm: RAW_RPM,
        damage: {
          base: parseInt(DAMAGE),
          head: Math.round(parseInt(DAMAGE) * parseInt(HEADSHOT_MULTIPLIER)),
          multiplier: parseFloat(HEADSHOT_MULTIPLIER),
          maxHeadshotRange: parseInt(MAX_HEADSHOT_RANGE)
        },
        reload: {
          loaded: parseFloat(LOADED_RELOAD_TIME),
          empty: parseFloat(EMPTY_RELOAD_TIME)
        },
        attachments: ATTACHMENTS.split(" ")
      })
        .then(gun => {
          console.log(gun);
        })
        .catch(err => console.log(err));
    } else {
      //will need to update later on
      return res.send("Found gun");
    }
  });
};

exports.getGuns = function(req, res) {
  //this will just return all the guns
  try {
    Gun.find({}, (err, guns) => {
      if (guns) {
        //Guns actually returned the colection
        res.response.data = guns;
        res.send(res.response);
      } else {
        res.response.error = "No guns found";
        res.status(404).send(res.response);
      }
    });
  } catch (e) {
    res
      .status(500)
      .send({ error: e, msg: "Something went wrong with the server" });
  }
};

exports.getGunById = async function(req, res) {
  try {
    let { ID } = req.params;

    let foundGun = await Gun.findOne({ gunID: ID }).exec();
    if (foundGun) {
      //If the ID returns a valid gun:
      res.response;
      res.response.data = foundGun;
      res.send(res.response);
    } else {
      responseObject.error = "Gun not found";
      res.status(404).send(responseObject);
    }
  } catch (e) {
    res
      .status(500)
      .send({
        error: e,
        message: "Something went wrong querying the database"
      });
  }
};

exports.getGunsByPhrase = function(req, res) {
  let { gunClass = null, ammo = null } = req.query;
  let queryObj = { ammunition: ammo, class: gunClass };
  //need to remove props if they weren't asked for
  for (props in queryObj) {
    if (!queryObj[props]) {
      delete queryObj[props];
    } else {
      queryObj[props] = queryObj[props].toUpperCase();
    }
  }

  Gun.find(queryObj, (err, guns) => {
    res.send(guns);
  });
};
