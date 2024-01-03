const jwt = require('jsonwebtoken');

const decodeStoreName = (req) => {
    // get store id from token in cookie
    const tokenCookies = req.cookies.storeToken;
    if (!tokenCookies) {
        return false;
    }
    const decoded = jwt.decode(tokenCookies);
    const storeName = decoded.storeName;
    return storeName;
}

module.exports = decodeStoreName;