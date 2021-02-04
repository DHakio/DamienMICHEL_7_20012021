const selfOrAdmin = require('../classes/selfOrAdmin');
const models  = require('../models');

exports.create = (request, response, next) => {
    // Request : {title: String, content: String, user_id: Integer}
    // Response : {message: String, post: Post}
    
    let title = request.body.title;
    let content = request.body.content;
    let user_id = request.body.user_id;

    if(title == null || content == null || user_id == null) {
        return response.status(400).json({ error: 'Il manque un parametre'});
    }

    models.Post.create({
        title: title,
        content: content,
        UserId: user_id
    })
        .then(post => response.status(200).json({message: "Post créé avec succès !", post}))
        .catch(error => response.status(500).json({error: error.message}))
}

exports.getAll = (request, response, next) => {
    // Request : null
    // Response : Array

    models.Post.findAll({
        order: [['id', 'DESC']],
        include: [
            {model: models.User, attributes: ['id', 'name', 'first_name']},
            models.Comment
        ]
        })
        .then(posts => response.status(200).json({posts}))
        .catch(error => response.status(500).json({error: error.message}));
}

exports.getOne = (request, response, next) => {
    // Request : null
    // Response : {post: Post[]}

    let post_id = request.params.id

    if(post_id == null || isNaN(post_id)) {
        return response.status(400).json({error: "Aucun ID n'a été envoyé"})
    }

    models.Post.findOne({ 
        where: {id: post_id},
        include: [
            {model: models.User, attributes: ['id', 'name', 'first_name']},
            {model: models.Comment, include: {model: models.User, attributes: ['id', 'name', 'first_name']}}
        ]
    })
        .then(post => response.status(200).json({post: [post]}))
        .catch(error => response.status(500).json({error: error.message}));
}

exports.update = (request, response, next) => {
    // Request : {title: String?, content: String?}
    // Response : {post: Post}

    let post_id = request.params.id;

    if(post_id == null || isNaN(post_id) ) {
        return response.status(400).json({message: "Aucun ID n'a été envoyé"})
    }

    selfOrAdmin(request, "Post")
        .then(check => {
            if(check == "admin" || check == "self") {
                models.Post.update({ ...request.body },{ where: {id: post_id }})
                    .then(post => response.status(200).json({post: post}))
                    .catch(error => response.status(500).json({error: error.message}));
            }
        })
        .catch(error => response.status(500).json({error: error.message}));
}

exports.delete = (request, response, next) => {
    // Request : null
    // Response : {Message: String}
    
    let post_id = request.params.id;

    if(post_id == null || isNaN(post_id) ) {
        return response.status(400).json({message: "Aucun ID n'a été envoyé"})
    }

    selfOrAdmin(request, "Post")
        .then(check => {
            if(check == "admin" || check == "self") {
                models.Post.destroy({where: {id: post_id}})
                    .then(() => response.status(200).json({message: "Post supprimé avec succès"}))
                    .catch(error => response.status(500).json({error: error.message}))
            }
            else {
                return response.status(401).json({error: "Accès refusé."})
            }
        })
        .catch(error => response.status(500).json({error: error.message}));
}