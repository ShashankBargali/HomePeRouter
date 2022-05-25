const express = require('express');
const User = require('../models/Auth');
const HomePe = require('../models/HomePe');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
JWT_SECRET = 'ShashankTheGreat@123'


router.post('/login', async (req, res) => {
    const { acno, pin } = req.body;
    let success = false;
    const account = await HomePe.findOne({ acno })
    if (!account) {
        const payAc = await User.findOne({ acno })
        if (!payAc) {
            res.status(404).json({ success, response: "Can't find this account. Please create account on PayHome first and then login to Homepe. If Created then enter correct credentials" })
            return;
        }
        else if (pin === payAc.pin) {
            let start = 'homeUpi://asbvb'
            let upiId = payAc.acno + '@homepe'
            const salt = await bcrypt.genSalt(15);
            let qrCode = start + salt + '/?upiId=' + upiId + '&secured=true';

            HomePe.create({
                name: payAc.name,
                age: payAc.age,
                payHomeId: payAc._id,
                acno: payAc.acno,
                pin: payAc.pin,
                upiId: upiId,
                qrCode: qrCode
            }).then(user => {
                const data = {
                    user: {
                        id: user.id
                    }
                }
                let authtoken = jwt.sign(data.user, JWT_SECRET);
                success = true
                res.json({ success, response: authtoken })
            }).catch(err => {
                res.json({ success, response: err })
            })
        }
        else {
            res.json({ success, response: "Can't find this account. Please create account on PayHome first and then login to Homepe. If Created then enter correct credentials" })
            return;
        }
        return;
    }
    if (pin === account.pin) {
        const data = {
            user: {
                id: account.id
            }
        }
        let authtoken = jwt.sign(data.user, JWT_SECRET);
        success = true
        res.json({ success, response: authtoken })
        return;
    }
    else {
        res.json({ success, response: "Can't find this account. Please create account on PayHome first and then login to Homepe. If Created then enter correct credentials" })
    }
})

router.get('/fetchbankdetails', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;

        const loggedUser = await HomePe.findById(userId);
        if (!loggedUser) {
            res.json({ success: false, response: "Can't find this Home Pe Account" })
            return;
        }
        const loggedUserPayHome = await User.findById(loggedUser.payHomeId).select("acno").select('name');

        res.json({ success: true, response: loggedUserPayHome })
    } catch (error) {
        res.json({ success: false, response: "Some Internal Error Occured" })
    }
})

router.put('/changepin', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const pin = req.body.pin;

        const loggedUser = await HomePe.findByIdAndUpdate(userId, {$set: {
            pin: pin
        }});
        if (!loggedUser) {
            res.json({ success: false, response: "Can't find this Home Pe Account" })
            return;
        }
        res.json({ success: true, response: loggedUserPayHome })
    } catch (error) {
        res.json({ success: false, response: "Some Internal Error Occured" })
    }
})
module.exports = router