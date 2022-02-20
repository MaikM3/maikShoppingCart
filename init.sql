CREATE TABLE tax (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  percentage decimal NULL,
  fixedAmount decimal NULL
);

CREATE TABLE item (
  ID SERIAL PRIMARY KEY,
  description VARCHAR(255) NOT NULL,
  price decimal NOT NULL,
  createdAt date NOT NULL,
  updatedAt date NULL
);

INSERT INTO tax (name, percentage)
VALUES  ('vat', 12);

INSERT INTO item (description, price, createdAt, updatedAt)
VALUES  ('Soap', 2.2, now(), now());