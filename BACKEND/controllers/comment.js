const models  = require('../models');

exports.create = (request, response, next) => {
    // Request : {content: String, topic_id: Integer, user_id: Integer}
    // Response : {message: String}
    
    let content = request.body.content;
    let topic_id = request.body.topic_id;
    let user_id = request.body.user_id;

    if(content == null || topic_id == null || user_id == null) {
        return response.status(400).json({ error: 'Il manque un parametre'});
    }

    models.Comment.create({
        content: content,
        TopicId: topic_id,
        UserId: user_id
    })
        .then(() => response.status(200).json({message: "Commentaire créé avec succès !"}))
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
    // Response : {comment: Comment}

    let comment_id = request.params.id;

    if(comment_id == null || isNaN(comment_id) ) {
        return response.status(400).json({message: "Aucun ID n'a été envoyé"})
    }

    models.Comment.update({ ...request.body },{ where: {id: comment_id }})
        .then(comment => response.status(200).json({comment: comment}))
        .catch(error => response.status(500).json({error: error.message}));
}

exports.delete = (request, response, next) => {
    // Request : null
    // Response : {Message: String}
    
    let comment_id = request.params.id;

    if(comment_id == null || isNaN(comment_id) ) {
        return response.status(400).json({message: "Aucun ID n'a été envoyé"})
    }

    models.Comment.destroy({where: { id: comment_id}})
        .then(() => response.status(200).json({message: "Commentaire supprimé avec succès"}))
        .catch(error => response.status(500).json({error: error.message}))
}