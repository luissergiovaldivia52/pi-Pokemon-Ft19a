const { Router } = require('express');
const { getType } = require("../Controller/typeController")

const router = Router();


router.get("/" , getType) 


module.exports = router;