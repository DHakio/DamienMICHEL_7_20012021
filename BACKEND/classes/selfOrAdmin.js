const jwt = require('jsonwebtoken');
const models = require('../models');

module.exports = async (request, Model = null) => {
    const token = request.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, ENCODING_KEY);
    const userId = decoded.userId;
    const isAdmin = decoded.admin;

    return new Promise((resolve, reject) => {
        if(isAdmin) {
            resolve("admin")
        }
    
        if(Model) {
            eval("models." + Model +".findOne({where: {id: " + request.params.id +"}})")
                .then(item => {
                    if(userId == item.UserId) {
                        resolve("self")
                    }
                })
                .catch(error => console.error(error))
        }
        else {
            if(request.params.userId && userId == request.params.userId) {
                resolve("self")
            }
            else {
                reject("Verification self or admin impossible");
            }
        }
    })
}