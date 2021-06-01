\c raffle_database;

INSERT INTO users
    (id, firstname, lastname, email, phone)
VALUES
    (1, 'John', 'Doe', 'johndoe@gmail.com', '123-456-7891'),
    (2, 'Jane', 'Doe', 'janedoe@gmail.com', '987-654-3219'),
    (3, 'Jose', 'Doe', 'josedoe@gmail.com', '243-567-9317'),
    (4, 'James', 'Doe', 'jamesdoe@gmail.com', '656-856-1439'),
    (5, 'Jorge', 'Doe', 'jorgedoe@gmail.com', '123-345-9347');

INSERT INTO raffles
    (id, name, secret_token)
VALUES
    (1, 'raffle1', 'token1'),
    (2, 'raffle2', 'token2');

INSERT INTO entries
    (id, user_id, raffle_id)
VALUES
    (1, 1, 1),
    (2, 3, 1),
    (3, 5, 1),
    (4, 2, 2),
    (5, 4, 2),
    (6, 1, 2);