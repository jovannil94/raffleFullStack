const db = require("../db/index");

const getAllRaffles = async (req, res, next) => {
    try {
        let raffles = await db.any('SELECT * FROM raffles');
        res.status(200).json({
            status: "Success",
            message: "All raffles",
            payload: raffles
        })
    } catch (error) {
        res.status(400).json({
            status: "Error",
            message: "Couldn't retrieve all raffles",
            payload: error
        })
        next(error);
    }
}

const getSingleRaffle = async (req, res, next) => {
    try {
        let raffle = await db.one(`SELECT * FROM raffles WHERE id = $/id/`, {
            id: req.params.id
        });
        res.status(200).json({
            status: "Success",
            message: "Retrieved raffle",
            payload: raffle
        })
    } catch (error) {
        res.status(400).json({
            status: "Error",
            message: "Couldn't retrieve the raffle",
            payload: error
        })
        next(error);
    }
}

const getParticipants = async (req, res, next) => {
    try {
        let participants = await db.any(`SELECT * FROM entries LEFT JOIN users ON entries.user_id = users.id WHERE raffle_id = $/id/`, {
            id: req.params.id
        });
        if(participants.length) {
            res.status(200).json({
                status: "Success",
                message: "Retrieved participants",
                payload: participants
            })
        } else {
            res.status(300).json({
                status: "Error",
                message: "Raffle does not exist",
                payload: participants
            })
        }
    } catch (error) {
        res.status(400).json({
            status: "Error",
            message: "Couldn't get participants",
            payload: error
        })
        next(error);
    }
}

const getWinner = async (req, res, next) => {
    try {
        let winner = await db.one(`SELECT users.id, users.firstname, users.lastname, users.email, users.phone, users.registered_at FROM users 
        LEFT JOIN raffles ON users.id = raffles.winner_id 
        WHERE raffles.id = $/id/`, {
            id: req.params.id
        })
        res.status(200).json({
            status: "Success",
            message: "Retrieved winner",
            payload: winner
        })
    } catch (error) {
        res.status(400).json({
            status: "Error",
            message: "Couldn't get winner",
            payload: error
        })
        next(error);
    }
}

const createRaffle = async (req, res, next) => {
    try {
        let raffle = await db.one(
            `INSERT INTO raffles (name, secret_token) 
            VALUES ($/name/, $/secret_token/) 
            RETURNING raffles.name, raffles.secret_token`, {
                name: req.body.name,
                secret_token: req.body.secret_token
            });
        res.status(200).json({
            status: "Success",
            message: "Raffle was created",
            payload: raffle
        })
    } catch (error) {
        res.status(400).json({
            status: "Error",
            message: "Couldn't create raffle",
            payload: error
        })
        next()
    }
}

const signUpUser = async (req, res, next) => {
    try {
        let user = await db.one(`
        INSERT INTO users (firstname, lastname, email, phone) 
        VALUES ($/firstname/, $/lastname/, $/email/, $/phone/) 
        RETURNING *`, {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            phone: req.body.phone
        });
        await db.none(`INSERT INTO entries (user_id, raffle_id) VALUES ($/user_id/, $/raffle_id/)`, {
            user_id: user.id,
            raffle_id: req.params.id
        })
        res.status(200).json({
            status: "Success",
            message: "User was signed up to raffle!",
            payload: user
        })
    } catch (error) {
        res.status(400).json({
            status: "Error",
            message: "Couldn't sign up user",
            payload: error
        })
        next()
    }
}

const pickWinner = async (req, res, next) => {
    try {
        let match = await db.one (`
        SELECT * FROM raffles 
        WHERE secret_token 
        LIKE $/secret_token/
        AND id = $/id/`, {
            secret_token: req.body.secret_token,
            id: req.params.id
        });
        if(match.winner_id === null) {
            let winnerID = await db.one(`
            SELECT users.id FROM users 
            LEFT JOIN entries ON entries.user_id = users.id 
            WHERE raffle_id = $/id/ 
            ORDER BY RANDOM() LIMIT 1`, {
                id: req.params.id
            });
            await db.none (`
            UPDATE raffles 
            SET winner_id = $/winner_id/, raffled_at = $/time_stamp/ 
            WHERE id = $/id/`, {
                id: req.params.id,
                time_stamp: new Date(),
                winner_id: winnerID.id
            });
            let winnerInfo = await db.any(`
            SELECT users.id, users.firstname, users.lastname, users.email, users.phone, users.registered_at FROM users 
            LEFT JOIN raffles ON users.id = raffles.winner_id 
            WHERE raffles.id = $/id/`, {
                id: req.params.id
            });
            res.status(400).json({
                status: "Success",
                message: "Winner picked!",
                payload: winnerInfo
            });
        } else {
            res.status(400).json({
                status: "Unsuccessful",
                message: "There is already an existing winner",
                payload: match.winner_id
            }); 
        }
    } catch (error) {
        res.status(400).json({
            status: "Error",
            message: "Couldn't pick a winner",
            payload: error
        })
        next()
    }
}

module.exports = { getAllRaffles, getSingleRaffle, getParticipants, getWinner, createRaffle, signUpUser, pickWinner };