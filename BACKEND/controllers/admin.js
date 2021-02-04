const selfOrAdmin = require('../classes/selfOrAdmin');
const models = require('../models');


exports.create = (request, response, next) => {
    // Request : null
    // Response : {message: String}
    let user_id = request.params.id;

    if(user_id == null || isNaN(user_id) ) {
        return response.status(400).json({message: "Aucun ID n'a été envoyé"})
    }

    selfOrAdmin(request)
        .then(check => {
            if(check == "admin") {
                models.Admin.create({ UserId: user_id })
                    .then(() => {
                        return response.status(200).json({message: "Admin rajouté avec succès"}); 
                    })
                    .catch(error => response.status(500).json({message: error.message}))
            }
            else {
                return response.status(403).json({message: "Accès refusé"});
            }
        })
        .catch(error => response.status(500).json({message: error.message}))
}

exports.delete = (request, response, next) => {
    // Request : null
    // Response : {message: String}
    let user_id = request.params.id;

    if(user_id == null || isNaN(user_id) ) {
        return response.status(400).json({message: "Aucun ID n'a été envoyé"})
    }

    selfOrAdmin(request)
        .then(check => {
            if(check == "admin") {
                models.Admin.destroy({ where: { UserId: user_id }})
                    .then(() => {
                        response.status(200).json({message: "Admin supprimé avec succès"});
                    })
                    .catch(error => response.status(500).json({message: error.message}))
            }
            else {
                return response.status(403).json({message: "Accès refusé"});
            }
        })
        .catch(error => response.status(500).json({message: error.message}))
}

exports.isAdmin = (request, response, next) => {
    // Request : null
    // Response : {isAdmin: boolean}
    let user_id = request.params.id;
    let isAdmin = false;

    if(user_id == null || isNaN(user_id) ) {
        return response.status(400).json({message: "Aucun ID n'a été envoyé"})
    }

    models.Admin.findOne({where: {UserId: user_id}})
        .then(admin => {
            if(admin) {isAdmin = true;}
            response.status(200).json({isAdmin: isAdmin});
        })
        .catch(error => response.status(500).json({message: error.message}));
}