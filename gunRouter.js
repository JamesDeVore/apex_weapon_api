//will list the various routes for the different AI functions
const router = require("express").Router();

const Guns = require('./controllers/Guns')

router.post('/', Guns.addGun)

router.get('/',Guns.getGuns)

router.get('/:id',Guns.getGunById)

module.exports = router
