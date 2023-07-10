const express  = require('express');

const router = express.Router();


const {localFileUpload, imageUpload,videoUpload} = require('../controllers/fileUpload');


router.post('/localFileUpload',localFileUpload);
router.post('/imageUpload',imageUpload);
router.post('/videoUpload',imageUpload);

module.exports = router;
