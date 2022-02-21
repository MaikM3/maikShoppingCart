DROP TABLE IF EXISTS shopping_cart_tax CASCADE;
DROP TABLE IF EXISTS shopping_cart_item CASCADE;
DROP TABLE IF EXISTS shopping_cart CASCADE;
DROP TABLE IF EXISTS shopping_cart_status CASCADE;
DROP TABLE IF EXISTS tax CASCADE;
DROP TABLE IF EXISTS item CASCADE;


CREATE TABLE shopping_cart_status (
  ID SERIAL PRIMARY KEY,
	status VARCHAR(255) NOT NULL,
	description VARCHAR(255) NOT NULL
);

INSERT INTO shopping_cart_status (id, status, description)
VALUES  (1, 'created', 'Shopping card has been created and its ready to use'),
(2, 'checkout', 'Shopping card has been taken to checkout process'),
(3, 'invoiced', 'Shopping card has been taken to checkout process');

CREATE TABLE shopping_cart (
  ID SERIAL PRIMARY KEY,
	status_id serial NOT NULL,
	user_id decimal NULL, 
	subtotal decimal NULL,
	discount_amount decimal NULL,
	taxes_amount decimal NULL,
	total  decimal NULL,
	created_at date NOT NULL,
	updated_at date NOT NULL,
	CONSTRAINT fk_shopping_cart_status FOREIGN KEY(status_id) REFERENCES shopping_cart_status(id)
);

CREATE TABLE tax (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  percentage decimal NULL,
  fixed_amount decimal NULL
);

CREATE TABLE item (
  ID SERIAL PRIMARY KEY,
  description VARCHAR(255) NOT NULL,
  price decimal NOT NULL,
  created_at date NOT NULL,
  updated_at date NULL
);

INSERT INTO tax (name, percentage)
VALUES  ('vat', 12),
('localTax', 3),
('techTax', 3);

INSERT INTO item (description, price, created_at, updated_at)
VALUES  ('Mouse', 15, now(), now()),
('Keyboard', 25, now(), now()),
('Monitor 24', 125, now(), now()),
('Mini PC VESA 100', 340, now(), now());

CREATE TABLE shopping_cart_item (
	shopping_cart_id serial NOT NULL,
	item_id serial NOT NULL,
	qty decimal NOT NULL,
	added_price decimal NULL,
	CONSTRAINT fk_shopping_cart FOREIGN KEY(shopping_cart_id) REFERENCES shopping_cart(id),
	CONSTRAINT fk_item FOREIGN KEY(item_id) REFERENCES item(id),
	PRIMARY KEY (shopping_cart_id, item_id)
);

CREATE TABLE shopping_cart_tax (
	shopping_cart_id integer NOT NULL,
	tax_id serial NOT NULL,
	CONSTRAINT fk_shopping_cart FOREIGN KEY(shopping_cart_id) REFERENCES shopping_cart(id),
	CONSTRAINT fk_tax FOREIGN KEY(tax_id) REFERENCES tax(id),
	PRIMARY KEY (shopping_cart_id, tax_id)
);

