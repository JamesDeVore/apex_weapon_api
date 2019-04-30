const Gun = require("../models/Gun");
const allGuns = require("../data/gunData.json");

exports.addGun = async function(req, res, next) {
  //test to make sure they can be added correctly
  for (gun in allGuns) {
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
    } = allGuns[gun];

    Gun.findById({ id }, (err, foundGun) => {
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
      }
    });
  }
  res.send("done?");
};

exports.getGuns = function(req, res) {
  res.send("hi");
};

exports.getGunById = async function(req, res) {
  try {
    let { ID } = req.params;
    let responseObject = {
      version: res.version,
      data: null
    };
    let foundGun = await Gun.findOne({ gunID: ID }).exec();
    if (foundGun) {
      //If the ID returns a valid gun:

      responseObject.data = foundGun;
      res.send(responseObject);
    } else {
      responseObject.error = "Gun not found";
      res.status(404).send(responseObject);
    }
  } catch (e) {
    res.status(500).send("Something went wrong querying the database");
  }
};
