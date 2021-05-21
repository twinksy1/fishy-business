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

-- Views
CREATE OR REPLACE VIEW retrieveFreshwaterFish AS
	SELECT * FROM fish WHERE waterType = 'fresh' AND isInvertebrate = FALSE;
CREATE OR REPLACE VIEW retrieveSaltwaterFish AS
	SELECT * FROM fish WHERE waterType = 'salt' AND isInvertebrate = FALSE;
CREATE OR REPLACE VIEW retrieveFreshwaterInvertebrates AS
	SELECT * FROM fish WHERE waterType = 'fresh' AND isInvertebrate = TRUE;
CREATE OR REPLACE VIEW retrieveSaltwaterInvertebrates AS
	SELECT * FROM fish WHERE waterType = 'salt' AND isInvertebrate = TRUE;

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