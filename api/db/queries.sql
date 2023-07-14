
CREATE DATABASE project;

CREATE TABLE campaigns
(
	_id varchar(100) NOT NULL PRIMARY KEY,
	firstName varchar(250) NOT NULL,
	lastName varchar(250) NOT NULL,
	church varchar(100) NOT NULL,
	streetAddress varchar(100) ,
	otherAddress varchar(100) ,
	city varchar(250) ,
	state varchar(250) ,
	zip varchar(250) ,
	phone varchar(250) ,
	email varchar(250) ,
	adOffer varchar(250)
)


CREATE TABLE churches
(
	_id VARCHAR(100) NOT NULL PRIMARY KEY,
	constituentId VARCHAR(100),
	constituentSASMD VARCHAR(100),
	primaryAddress VARCHAR(250),
	preferredAddressLine VARCHAR(250),
	preferredCityState VARCHAR(250),
	preferredZip VARCHAR(250),
	churchNumber VARCHAR(250),
	constituentAddedBy VARCHAR(250),
	preferredAddressLine1 VARCHAR(250),
	preferredAddressLine2 VARCHAR(250),
	advoCount VARCHAR(250),
	preferredCity VARCHAR(250),
	preferredState VARCHAR(250)
)