const bcrypt = require('bcryptjs')
const QRCode = require('qrcode')

const encryptPass = async (detail) => {
    const url = new URL('http://youtube.com/?game=freefire')
    const game = url.searchParams.get('game')
    console.log(game)
    
}

const detail = {
    name: 'Shashank',
    age: 15,
    class: 10,
    cardNo: '4403 1513 8189'
}
encryptPass(JSON.stringify(detail))

