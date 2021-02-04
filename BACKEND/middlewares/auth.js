const jwt = require('jsonwebtoken');

module.exports = (request, response, next) => {
    try {
        const token = request.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, ENCODING_KEY);
        const userId = decoded.userId;
        if(request.body.userId && request.body.userId !== userId) {
            response.status(401).json({error: "Mauvaise identification"});
        }
        else {
            next();
        }
    }
    catch {
        response.status(401).json({error: "Vous devez être identifié"});
    }
}