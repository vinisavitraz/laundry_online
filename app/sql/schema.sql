CREATE SEQUENCE IF NOT EXISTS users_sequence
    INCREMENT 1
    START 1;

CREATE SEQUENCE IF NOT EXISTS tokens_sequence
    INCREMENT 1
    START 1;

CREATE SEQUENCE IF NOT EXISTS clothings_sequence
    INCREMENT 1
    START 1;

CREATE SEQUENCE IF NOT EXISTS orders_sequence
    INCREMENT 1
    START 1;

CREATE SEQUENCE IF NOT EXISTS order_items_sequence
    INCREMENT 1
    START 1;

CREATE TABLE IF NOT EXISTS users
(
    id BIGINT NOT NULL PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(250) NOT NULL,
    document VARCHAR(11) UNIQUE NULL,
    phone VARCHAR(20) NULL,
    cep VARCHAR(12) NULL,
    street VARCHAR(250) NULL,
    streetNumber VARCHAR(10) NULL,
    district VARCHAR(250) NULL,
    city VARCHAR(250) NULL,
    state CHAR(2) NULL,
    birthDate DATE NULL,
    role VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS tokens
(
    id BIGINT NOT NULL PRIMARY KEY,
    token VARCHAR(250) NOT NULL,
    expiresAt TIMESTAMP NOT NULL,
    userId BIGINT NOT NULL,
    CONSTRAINT fk_token_user FOREIGN KEY(userId) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS clothings
(
    id BIGINT NOT NULL PRIMARY KEY,
    name VARCHAR(250) UNIQUE NOT NULL,
    washPrice NUMERIC(10,2) NOT NULL,
    washTime INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS orders
(
    id BIGINT NOT NULL PRIMARY KEY,
    status VARCHAR(50) UNIQUE NOT NULL,
    washPrice NUMERIC(10,2) NOT NULL,
    washTime INTEGER NOT NULL,
    createDate TIMESTAMP NOT NULL,
    paymentDate TIMESTAMP NULL,
    customerId BIGINT NOT NULL,
    CONSTRAINT fk_order_customer FOREIGN KEY(customerId) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS order_items
(
    id BIGINT NOT NULL PRIMARY KEY,
    totalQuantity INTEGER NOT NULL,
    totalWashPrice NUMERIC(10,2) NOT NULL,
    clothingId BIGINT NOT NULL,
    CONSTRAINT fk_order_item_clothing FOREIGN KEY(clothingId) REFERENCES clothings(id),
    orderId BIGINT NOT NULL,
    CONSTRAINT fk_order_item_order FOREIGN KEY(orderId) REFERENCES orders(id)
);