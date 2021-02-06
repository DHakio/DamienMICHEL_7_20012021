const selfOrAdmin = require('../classes/selfOrAdmin');
const models  = require('../models');
const fs = require('fs');

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
    // Request : {user: {name: String, first_name: String}, avatar: File}
    // Response : User.id: number

    const user_id = request.params.userId;
    const user = JSON.parse(request.body.user);

    if(user_id == null || isNaN(user_id) ) {
        return response.status(400).json("Aucun ID n'a été envoyé")
    }

    selfOrAdmin(request)
        .then(check => {
            if(check == "admin" || check == "self") {

                if(!request.file) {
                    models.User.update({ name: user.name, first_name: user.first_name },{ where: {id: user_id }})
                    .then(() => response.status(200).json(user_id))
                    .catch(error => response.status(500).json(error))
                }
                else {
                    models.User.findOne({where: {id: user_id}})
                        .then(user => {
                            const filename = user.avatar.split('/images/avatars/')[1];
                            updateWithAvatar = () => {
                                models.User.update({
                                    name: user.name,
                                    first_name: user.first_name,
                                    avatar: request.protocol + "://" + request.get('host') + "/images/avatars/" + request.file.filename
                                },
                                {
                                    where: {id: user_id}
                                })
                                    .then(() => response.status(200).json(user_id))
                                    .catch(error => {
                                        response.status(400).json({error})
                                    });
                            }

                            if(filename !== "default.png") { // Already have a custom avatar => let's delete the old one
                                fs.unlink('images/avatars/' + filename, updateWithAvatar)
                            }
                            else {
                                updateWithAvatar()
                            }
                        })
                        .catch(error => response.status(500).json(error))
                }
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

                models.User.findOne({where: {id: user_id}})
                    .then(user => {

                        deleteUser = () => {
                            models.User.destroy({where: {id: user_id}})
                                .then(() => response.status(200).json({message: "Utilisateur supprimé avec succès"}))
                                .catch(error => response.status(500).json(error))
                        }

                        if(user.avatar) {
                            const filename = user.avatar.split('/images/avatars/')[1];
                            fs.unlink('images/avatars/' + filename, deleteUser());
                        }
                        else {
                            deleteUser()
                        }
                    })
                    .catch(error => response.status(500).json(error))
            }
            else {
                return response.status(403).json({error: "Accès refusé."})
            }
        })
        .catch(error => response.status(500).json(error))
}