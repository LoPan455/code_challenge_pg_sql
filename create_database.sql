-- Database name
phi
-- Document your create tables SQL here
CREATE TABLE treats (
id SERIAL PRIMARY KEY,
name VARCHAR(80),
description VARCHAR(240),
pic VARCHAR(240)
);

INSERT INTO treats (name, description, pic)
VALUES ('Cupcake', 'A delicious cupcake', '/assets/cupcake.jpg'),
('Donuts', 'Mmmm donuts', '/assets/donuts.jpg');
