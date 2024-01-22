const jwt = require('jsonwebtoken');
decodeUserStore = (req) => {
    console.log(req)
    // get user store data from token in cookie
    const userTokenCookies = req.cookies.userToken
    if (!userTokenCookies) {
        return false;
    }
    const decoded = jwt.decode(userTokenCookies);
    const userData = decoded;
    return userData;
}

module.exports = decodeUserStore;