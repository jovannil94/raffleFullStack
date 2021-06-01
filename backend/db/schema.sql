DROP DATABASE IF EXISTS raffle_database;
CREATE DATABASE raffle_database;

\c raffle_database;

DROP TABLE IF EXISTS entries;
DROP TABLE IF EXISTS raffles;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR,
    lastname VARCHAR,
    email VARCHAR UNIQUE,
    phone VARCHAR UNIQUE,
    registered_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE raffles (
    id SERIAL PRIMARY KEY,
    name VARCHAR UNIQUE,
    secret_token VARCHAR UNIQUE,
    created_at TIMESTAMP DEFAULT NOW(),
    raffled_at VARCHAR,
    winner_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE entries (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    raffle_id INTEGER REFERENCES raffles(id) ON DELETE CASCADE
);