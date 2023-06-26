CREATE DATABASE IF NOT EXISTS PostSite;

USE PostSite;

CREATE TABLE tb_user (
    id INT NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    primary key (id)
);


DELIMITER $$
CREATE PROCEDURE sp_user (
IN namesp varchar(255),
IN emailsp varchar(255),
IN passwordsp varchar(255)
)
BEGIN
insert into tb_user (name, email, password) values (namesp, emailsp, passwordsp);
END $$
DELIMITER;


DESCRIBE tb_user;
