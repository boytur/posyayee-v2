const jwt = require('jsonwebtoken');

const decodeStoreId = (req) => {
    //get store id from token
    const token = req.headers.authorization;
    const tokenWithoutBearer = token.replace("Bearer ", "");
    const decoded = jwt.decode(tokenWithoutBearer);
    const storeId = decoded.storeId;

    return storeId;
}

module.exports = decodeStoreId;