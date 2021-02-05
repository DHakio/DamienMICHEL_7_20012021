const selfOrAdmin = require('../classes/selfOrAdmin');
const models  = require('../models');

exports.getAll = (request, response, next) => {
    // Request : null
    // Response : User[]

    models.User.findAll()
        .then(users => response.status(200).json(users))
        .catch(error => response.status(500).json(error))
}

exports.getOne = (request, response, next) => {
    // Request : null
    // Response : User
    
    let user_id = request.params.id;

    if(user_id == null || isNaN(user_id) ) {
        return response.status(400).json("Aucun ID n'a été envoyé")
    }

    models.User.findOne({where: { id: user_id}})
        .then(user => {
            models.Admin.findOne({where: {UserId: user.id}})
                .then(admin => {
                    user.dataValues.admin = admin ? true : false;
                    return response.status(200).json(user)
                })
                .catch(error => response.status(500).json(error))
        })
        .catch(error => response.status(500).json(error))
}

exports.update = (request, response, next) => {
    // Request : {name: String?, first_name: String?, Email: String?, password: String?}
    // Response : User

    let user_id = request.params.userId;

    if(user_id == null || isNaN(user_id) ) {
        return response.status(400).json("Aucun ID n'a été envoyé")
    }

    selfOrAdmin(request)
        .then(check => {
            if(check == "admin" || check == "self") {
                models.User.update({ ...request.body },{ where: {id: user_id }})
                    .then(user => response.status(200).json(user))
                    .catch(error => response.status(500).json(error))
            }
        })
        .catch(error => response.status(500).json(error))
}

exports.delete = (request, response, next) => {
    // Request : null
    // Response : {Message: String}
    
    let user_id = request.params.userId;

    if(user_id == null || isNaN(user_id) ) {
        return response.status(400).json("Aucun ID n'a été envoyé")
    }
    selfOrAdmin(request)
        .then(check => {
            if(check == "admin" || check == "self") {
                models.User.destroy({where: {id: user_id}})
                    .then(() => response.status(200).json({message: "Utilisateur supprimé avec succès"}))
                    .catch(error => response.status(500).json(error))
            }
            else {
                return response.status(403).json({error: "Accès refusé."})
            }
        })
        .catch(error => response.status(500).json(error))
}