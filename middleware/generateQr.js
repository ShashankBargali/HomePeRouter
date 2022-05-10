const QRCode = require('qrcode');

const generateQR = async text => {
	try {
		const qrToUrl = await QRCode.toDataURL(text, {type: 'image/jpeg'});
        return qrToUrl;

	} catch(err){
		console.log(err);
	}
}


module.exports = generateQR;