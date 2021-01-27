const models = require('../models');


exports.create = (request, response, next) => {
    // Request : null
    // Response : {message: String}
    let user_id = request.params.id;

    if(user_id == null || isNaN(user_id) ) {
        return response.status(400).json({message: "Aucun ID n'a été envoyé"})
    }

    models.Admin.create({ UserId: user_id })
        .then(() => {
            response.status(200).json({message: "Admin rajouté avec succès"});
        })
        .catch(error => {
            response.status(500).json({message: error});
        })
}

exports.delete = (request, response, next) => {
    // Request : null
    // Response : {message: String}
    let user_id = request.params.id;

    if(user_id == null || isNaN(user_id) ) {
        return response.status(400).json({message: "Aucun ID n'a été envoyé"})
    }
    
    models.Admin.destroy({ where: { UserId: user_id }})
        .then(() => {
            response.status(200).json({message: "Admin supprimé avec succès"});
        })
        .catch(error => {
            response.status(500).json({message: error.message});
        })
}