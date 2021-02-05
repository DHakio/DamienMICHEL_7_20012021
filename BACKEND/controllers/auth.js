const models = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.signup = (request, response, next) => {
    // Request : {name: String, first_name: String, email: String, password: String}
    // Response : {message: String}
    let name = request.body.name;
    let first_name = request.body.first_name;
    let email = request.body.email;
    let password = request.body.password;

    if(name == null || first_name == null || email == null || password == null) {
        return response.status(400).json({ error: 'Il manque un parametre'});
    }

    bcrypt.hash(password, 10)
        .then(hash => {
            models.User.create({
                name: name,
                first_name: first_name,
                email: email,
                password: hash
            })
            .then(() => {
                return response.status(201).json({message: "Utilisateur bien enregistré !"})
            })
            .catch(error => {
                console.log('hum');
                return response.status(400).json(error.errors[0]);
            });
        })
        .catch(error => {
            return response.status(400).json(error);
        });
}

exports.login = (request, response, next) => {
    // Request : {email: String, password: String}
    // Response : {userId: String, token: String}

    let email = request.body.email;
    let password = request.body.password;

    if(email == null || password == null) {
        return response.status(400).json({ error: 'Il manque un parametre'});
    }

    models.User.findOne({ where: {email: email}})
        .then(user => {
            if(!user) {
                return response.status(401).json({error: "Mot de passe incorrect"});
            }
            bcrypt.compare(password, user.password)
                .then(isValid => {
                    if(!isValid) {
                        return response.status(401).json({error: 'Mot de pass incorrect'});
                    }
                    models.Admin.findOne({where: {UserId: user.id}})
                        .then(admin => {
                            let isAdmin = admin ? true : false;
                            return response.status(200).json({
                                userId: user.id,
                                admin: isAdmin,
                                token: jwt.sign({userId: user.id, admin: isAdmin}, ENCODING_KEY, {expiresIn: '12h'})
                            });

                        })
                        .catch(error => response.status(500).json({error: error.message}))
                })
                .catch(error => {
                    return response.status(500).json({error: error.message});
                });
        })
        .catch(error => {
            return response.status(500).json({error: error.message});
        });
}