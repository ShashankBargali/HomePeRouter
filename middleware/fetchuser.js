const jwt = require('jsonwebtoken');
JWT_SECRET = 'ShashankTheGreat@123';


const fetchuser = (req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).json({success: false, response: 'Please enter a token to continue'});
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data;
        next();
    } catch (error) {
        res.status(500).json({success: false, response: error.message})
    }
}
module.exports = fetchuser;