const jwt = require('jsonwebtoken');

const decodeStoreId = (req) => {
    // get store id from token in cookie
    const tokenCookies = req.cookies.token;
    if (!tokenCookies) {
        return false;
    }
    const decoded = jwt.decode(tokenCookies);
    const store_id = decoded.store[0].store_id;
    return store_id;
}

module.exports = decodeStoreId;