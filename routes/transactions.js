const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const Transaction = require('../models/Statement');
const router = express.Router();

router.get('/fetchtr', fetchuser, async (req, res) => {
    const userId = req.user.id;
    
    const trnx = await Transaction.find({payId: userId})
    res.json(trnx)
})

module.exports = router;