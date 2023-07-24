const router = require('express').Router();
const { getProfile, updateProfile } = require('../controllers/users');
const { validatePersonalInfo } = require('../middlewares/validation');

router.get('/me', getProfile);
router.patch('/me', validatePersonalInfo, updateProfile);

module.exports = router;
