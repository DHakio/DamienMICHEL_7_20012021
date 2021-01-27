const models  = require('../models');

exports.getAll = (request, response, next) => {
    // Request : null
    // Response : {users : Array}

    models.User.findAll()
        .then(users => response.status(200).json({users: users}))
        .catch(error => response.status(500).json({error: error.message}))
}

exports.getOne = (request, response, next) => {
    // Request : null
    // Response : {user: User}
    
    let user_id = request.params.id;

    if(user_id == null || isNaN(user_id) ) {
        return response.status(400).json({message: "Aucun ID n'a été envoyé"})
    }

    models.User.findOne({where: { id: user_id}})
        .then(user => response.status(200).json({user: user}))
        .catch(error => response.status(500).json({error: error.message}))
}

exports.update = (request, response, next) => {
    // Request : {name: String?, first_name: String?, Email: String?, password: String?}
    // Response : {user: User}

    let user_id = request.params.id;

    if(user_id == null || isNaN(user_id) ) {
        return response.status(400).json({message: "Aucun ID n'a été envoyé"})
    }

    models.User.update({ ...request.body },{ where: {id: user_id }})
        .then(user => response.status(200).json({user: user}))
        .catch(error => response.status(500).json({error: error.message}));
}

exports.delete = (request, response, next) => {
    // Request : null
    // Response : {Message: String}
    
    let user_id = request.params.id;

    if(user_id == null || isNaN(user_id) ) {
        return response.status(400).json({message: "Aucun ID n'a été envoyé"})
    }

    models.User.destroy({where: { id: user_id}})
        .then(() => response.status(200).json({message: "Utilisateur supprimé avec succès"}))
        .catch(error => response.status(500).json({error: error.message}))
}