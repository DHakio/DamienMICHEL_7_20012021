const selfOrAdmin = require('../classes/selfOrAdmin');
const models  = require('../models');

exports.create = (request, response, next) => {
    // Request : {content: String, post_id: Integer, user_id: Integer}
    // Response : {message: String}
    
    let content = request.body.content;
    let post_id = request.body.post_id;
    let user_id = request.body.user_id;

    if(content == null || post_id == null || user_id == null) {
        return response.status(400).json({ error: 'Il manque un parametre'});
    }

    models.Comment.create({
        content: content,
        PostId: post_id,
        UserId: user_id
    })
        .then(comment => response.status(200).json({message: "Commentaire créé avec succès !"}))
        .catch(error => response.status(500).json({error: error.message}))
}

exports.getAll = (request, response, next) => {
    // Request : null
    // Response : {comments: Array}

    models.Comment.findAll()
        .then(comments => response.status(200).json({comments: comments}))
        .catch(error => response.status(500).json({error: error.message}));
}

exports.getOne = (request, response, next) => {
    // Request : null
    // Response : {comment: Comment}

    let comment_id = request.params.id

    if(comment_id == null || isNaN(comment_id)) {
        return response.status(400).json({error: "Aucun ID n'a été envoyé"})
    }

    models.Comment.findOne({ where: {id: comment_id}})
        .then(comment => response.status(200).json({comment: comment}))
        .catch(error => response.status(500).json({error: error.message}));
}

exports.update = (request, response, next) => {
    // Request : {content: String?}
    // Response : {message: String}

    let comment_id = request.params.id;

    if(comment_id == null || isNaN(comment_id) ) {
        return response.status(400).json({message: "Aucun ID n'a été envoyé"})
    }

    selfOrAdmin(request, "Comment")
        .then(check => {
            if(check == "admin" || check == "self") {
                models.Comment.update({ ...request.body },{ where: {id: comment_id }})
                    .then(() => response.status(200).json({message: "Commentaire modifié avec succès"}))
                    .catch(error => response.status(500).json({error: error.message}));
            }
        })
        .catch(error => response.status(500).json({error: error.message}));
}

exports.delete = (request, response, next) => {
    // Request : null
    // Response : {Message: String}
    
    let comment_id = request.params.id;

    if(comment_id == null || isNaN(comment_id) ) {
        return response.status(400).json({message: "Aucun ID n'a été envoyé"})
    }

    selfOrAdmin(request, "Comment")
        .then(check => {
            if(check == "admin" || check == "self") {
                models.Comment.destroy({where: { id: comment_id}})
                    .then(() => response.status(200).json({message: "Commentaire supprimé avec succès"}))
                    .catch(error => response.status(500).json({error: error.message}))
            }
        })
        .catch(error => response.status(500).json({error: error.message}));
}