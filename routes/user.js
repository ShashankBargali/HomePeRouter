const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const generateQR = require('../middleware/generateQr');
const User = require('../models/Auth');
const HomePe = require('../models/HomePe');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ response: 'hi this is Shashank. Welcome to HomePe User Facilities' })
})


router.put('/send', fetchuser, async (req, res) => {
    try {
        let success = false;
        const userId = req.user.id;
        const upiId = req.body.upiId;
        const amount = req.body.amount;

        const loggedUser = await HomePe.findById(userId);

        const loggedUserPayHome = await User.findById(loggedUser.payHomeId)

        if (parseFloat(loggedUserPayHome.balance) > parseFloat(amount)) {
            const consumer = await HomePe.findOne({ upiId })

            if (!consumer) {
                res.json({ success: false, response: "The upiId is not valid. Please enter correct upiId of the user" })
                return;
            }
            const id = consumer.payHomeId;

            const payHomeUser = await User.findById(id).select("-__v").select("-password").select('-digipay')

            const done = await User.findByIdAndUpdate(id, { $set: { balance: parseFloat(payHomeUser.balance) + parseFloat(amount) } }, { new: true })

            if (done) {
                User.findByIdAndUpdate(loggedUser.payHomeId, {
                    $set: {
                        balance: loggedUserPayHome.balance - req.body.amount
                    }
                }, { new: true }).then(data => {
                    success = true;
                    res.json({ success, response: "Done securely. Without any internal affairs" })
                })
            }
        }
        else {
            success = false;
            res.json({ success, response: "The amount you entered is more than your balance" })
        }
    } catch (error) {
        res.status(500).json({ success: false, response: "Some internal error occured" })
        console.log(error)
    }
})

router.get('/fetchbalance', fetchuser, async (req, res) => {
    try {
        let userId = req.user.id;
        const loggedUser = await HomePe.findById(userId);
        const loggedUserPayHome = await User.findById(loggedUser.payHomeId).select("balance")
        res.json({ success: true, response: loggedUserPayHome.balance })
    } catch (error) {
        res.status(500).json({ success: false, response: "Some internal error occured" })
    }
})

router.get('/getpin', fetchuser, async (req, res) => {
    try {
        let userId = req.user.id;
        const loggedUser = await HomePe.findById(userId);
        res.json({ success: true, response: loggedUser.pin })
    } catch (error) {
        res.status(500).json({ success: false, response: "Some internal error occured" })
        console.log(error)
    }

})

router.get('/qrcode', fetchuser, async (req, res) => {
    const userId = req.user.id;

    const loggedUser = await HomePe.findById(userId);

    const qrToUrl = await generateQR(loggedUser.qrCode)
    res.json({ success: true, response: qrToUrl })
})

module.exports = router