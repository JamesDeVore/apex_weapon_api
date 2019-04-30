//will list the various routes for the different AI functions
const router = require("express").Router();

const Guns = require('./controllers/Guns')

router.post('/', Guns.addGun)

router.get('/',Guns.getGuns)

router.get('/gun/:ID',Guns.getGunById)

router.get('/search', Guns.getGunsByPhrase)

module.exports = router
