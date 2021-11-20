const { Router } = require('express');
const { getType} = require("../Controller/typeController")

const router = Router();


router.post("/" , getType) 

module.exports = router;