module.exports = {
    isLogedin: (req, res, next) => {
        const jwt = require('jsonwebtoken');
        const token = req.cookies.storeToken;
        //console.log(token)
        if (!token) {
            return res.status(401).send(
                ` 
            <div style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;">
            <div style="width: 100%; text-align:center;"> 
                <h1>Nice try hecker but DON'T try again!</h1>
                <img style=" width: 100px;" src="https://media.tenor.com/ZX95mDnlodwAAAAd/the-rock-sus-eye.gif" />
              </div>
          </div>`);
        }

        const secret = process.env.JWT_SECRET;

        try {
            const verify = jwt.verify(token, secret);

            if (verify !== null) {
                next();
            } else {
                res.status(401).send({
                    success: false,
                    msg: "Access denied!"
                });
            }
        } catch (error) {
            res.status(401).send({
                success: false,
                msg: "Invalid token!"
            });
        }
    }
}