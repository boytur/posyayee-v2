const jwt = require('jsonwebtoken');

const decodeStoreId = (req) => {
    // get store id from token in cookie
    const tokenCookies = req.cookies.storeToken;
    if (!tokenCookies) {
        return false;
    }
    const decoded = jwt.decode(tokenCookies);
    const storeId = decoded.storeId;
    return storeId;
}

module.exports = decodeStoreId;