const models  = require('../models');

exports.create = (request, response, next) => {
    // Request : {title: String, content: String, user_id: Integer}
    // Response : {message: String}
    
    let title = request.body.title;
    let content = request.body.content;
    let user_id = request.body.user_id;

    if(title == null || content == null || user_id == null) {
        return response.status(400).json({ error: 'Il manque un parametre'});
    }

    models.Topic.create({
        title: title,
        content: content,
        UserId: user_id
    })
        .then(() => response.status(200).json({message: "Topic créé avec succès !"}))
        .catch(error => response.status(500).json({error: error.message}))
}

exports.getAll = (request, response, next) => {
    // Request : null
    // Response : {topics: Array}

    models.Topic.findAll()
        .then(topics => response.status(200).json({topics: topics}))
        .catch(error => response.status(500).json({error: error.message}));
}

exports.getOne = (request, response, next) => {
    // Request : null
    // Response : {topic: Topic}

    let topic_id = request.params.id

    if(topic_id == null || isNaN(topic_id)) {
        return response.status(400).json({error: "Aucun ID n'a été envoyé"})
    }

    models.Topic.findOne({ where: {id: topic_id}})
        .then(topic => response.status(200).json({topic: topic}))
        .catch(error => response.status(500).json({error: error.message}));
}

exports.update = (request, response, next) => {
    // Request : {title: String?, content: String?}
    // Response : {topic: Topic}

    let topic_id = request.params.id;

    if(topic_id == null || isNaN(topic_id) ) {
        return response.status(400).json({message: "Aucun ID n'a été envoyé"})
    }

    models.Topic.update({ ...request.body },{ where: {id: topic_id }})
        .then(topic => response.status(200).json({topic: topic}))
        .catch(error => response.status(500).json({error: error.message}));
}

exports.delete = (request, response, next) => {
    // Request : null
    // Response : {Message: String}
    
    let topic_id = request.params.id;

    if(topic_id == null || isNaN(topic_id) ) {
        return response.status(400).json({message: "Aucun ID n'a été envoyé"})
    }

    models.Topic.destroy({where: { id: topic_id}})
        .then(() => response.status(200).json({message: "Topic supprimé avec succès"}))
        .catch(error => response.status(500).json({error: error.message}))
}