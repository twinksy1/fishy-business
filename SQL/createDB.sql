-- Sequences
CREATE SEQUENCE merchSeq
START 1000
INCREMENT 1;

CREATE SEQUENCE customerPurchaseSeq
START 1000
INCREMENT 1;

-- Schemas
CREATE TABLE IF NOT EXISTS fish (
	merchID INTEGER NOT NULL PRIMARY KEY CHECK(merchID > 0),
	species VARCHAR(50) NOT NULL DEFAULT 'N/A',
	genus VARCHAR(50) NOT NULL DEFAULT 'N/A',
	commonName VARCHAR(50) NOT NULL,
	price NUMERIC CHECK(price > 0.00) NOT NULL,
	amount INTEGER NOT NULL CHECK(amount >= 0) DEFAULT 1,
	isInvertebrate BOOLEAN DEFAULT FALSE,
	waterType VARCHAR(50) NOT NULL,
	phRange VARCHAR(50) NOT NULL,
	description VARCHAR(500)
);
CREATE TABLE IF NOT EXISTS plant (
	merchID INTEGER NOT NULL PRIMARY KEY CHECK(merchID > 0),
	species VARCHAR(50) NOT NULL DEFAULT 'N/A',
	genus VARCHAR(50) NOT NULL DEFAULT 'N/A',
	commonName VARCHAR(50) NOT NULL,
	amount INTEGER NOT NULL CHECK(amount >= 0) DEFAULT 1,
	price NUMERIC CHECK(price > 0.00) NOT NULL,
	waterType VARCHAR(50) NOT NULL,
	phRange VARCHAR(50) NOT NULL,
	description VARCHAR(500)
);
CREATE TABLE IF NOT EXISTS customer (
	email VARCHAR(50) NOT NULL PRIMARY KEY,
	firstName VARCHAR(50) NOT NULL,
	lastName VARCHAR(50) NOT NULL,
	password VARCHAR(50) NOT NULL,
	street VARCHAR(50) NOT NULL,
	city VARCHAR(50) NOT NULL,
	state VARCHAR(50) NOT NULL,
	phoneNumber VARCHAR(14) DEFAULT '',
	dateJoined TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	ccn VARCHAR(16) DEFAULT '',
	securityCode VARCHAR(3) DEFAULT '',
	expirationDate VARCHAR(5) DEFAULT ''
);
CREATE TABLE IF NOT EXISTS customerPurchase (
	orderNum INTEGER NOT NULL CHECK(orderNum > 0),
	merchID INTEGER NOT NULL CHECK(merchID > 0),
	customerEmail VARCHAR(50) NOT NULL,
	itemAmount INTEGER NOT NULL CHECK(itemAmount > 0),
	priceEach NUMERIC NOT NULL CHECK(priceEach > 0.00),
	date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Views
CREATE OR REPLACE VIEW retrieveFreshwaterFish AS
	SELECT * FROM fish WHERE waterType = 'fresh' AND isInvertebrate = FALSE;
CREATE OR REPLACE VIEW retrieveSaltwaterFish AS
	SELECT * FROM fish WHERE waterType = 'salt' AND isInvertebrate = FALSE;
CREATE OR REPLACE VIEW retrieveFreshwaterInvertebrates AS
	SELECT * FROM fish WHERE waterType = 'fresh' AND isInvertebrate = TRUE;
CREATE OR REPLACE VIEW retrieveSaltwaterInvertebrates AS
	SELECT * FROM fish WHERE waterType = 'salt' AND isInvertebrate = TRUE;
CREATE OR REPLACE VIEW retrieveFreshwaterPlants AS
	SELECT * FROM plant WHERE waterType = 'fresh';
CREATE OR REPLACE VIEW retrieveSaltwaterPlants AS
	SELECT * FROM plant WHERE waterType = 'salt';

-- Procedures
CREATE OR REPLACE PROCEDURE updateFishAmount(id INTEGER, newAmount INTEGER)
LANGUAGE SQL
AS $$
	UPDATE fish
	SET amount = newAmount
	WHERE merchID = id;
$$;
CREATE OR REPLACE PROCEDURE updatePlantAmount(id INTEGER, newAmount INTEGER)
LANGUAGE SQL
AS $$
	UPDATE fish
	SET amount = newAmount
	WHERE merchID = id;
$$;