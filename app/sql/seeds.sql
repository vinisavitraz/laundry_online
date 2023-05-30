INSERT INTO users (id, name, email, password, birthDate, role) VALUES (nextval('users_sequence'), 'Maria', 'maria@mail.com', '123', '2000-01-01', 'employee');
INSERT INTO users (id, name, email, password, birthDate, role) VALUES (nextval('users_sequence'), 'Mario', 'mario@mail.com', '123', '1990-12-12', 'employee');

INSERT INTO users (id, name, email, password, document, phone, cep, street, streetNumber, district, city, state, role) VALUES (nextval('users_sequence'), 'João', 'joao@mail.com', '123', '19530433050', '8927334973', '35501426', 'Rua Professora Martha Eugênia', '1234', 'Santo André', 'Divinópolis', 'MG', 'customer');
INSERT INTO users (id, name, email, password, document, phone, cep, street, streetNumber, district, city, state, role) VALUES (nextval('users_sequence'), 'José', 'jose@mail.com', '123', '65279868078', '4522648670', '49065350', 'Rua Epaminondas SantAna', '1234', 'Industrial', 'Aracaju', 'SE', 'customer');
INSERT INTO users (id, name, email, password, document, phone, cep, street, streetNumber, district, city, state, role) VALUES (nextval('users_sequence'), 'Joana', 'joana@mail.com', '123', '65191307020', '7528393253', '69306690', 'Avenida Nossa Senhora da Consolata', '1234', 'São Pedro', 'Boa Vista', 'RR', 'customer');
INSERT INTO users (id, name, email, password, document, phone, cep, street, streetNumber, district, city, state, role) VALUES (nextval('users_sequence'), 'Joaquina', 'joaquina@mail.com', '123', '81985223015', '8720084098', '29302160', 'Rua Colatina', '1234', 'Zumbi', 'Cachoeiro de Itapemirim', 'ES', 'customer');

INSERT INTO clothings (id, name, washPrice, washTime) VALUES (nextval('clothings_sequence'), 'Calça', 10.00, 3);
INSERT INTO clothings (id, name, washPrice, washTime) VALUES (nextval('clothings_sequence'), 'Camisa', 20.00, 4);
INSERT INTO clothings (id, name, washPrice, washTime) VALUES (nextval('clothings_sequence'), 'Camiseta', 15.00, 2);
INSERT INTO clothings (id, name, washPrice, washTime) VALUES (nextval('clothings_sequence'), 'Meia', 4.00, 1);
INSERT INTO clothings (id, name, washPrice, washTime) VALUES (nextval('clothings_sequence'), 'Cueca', 8.00, 1);