CREATE DATABASE tripbook;

USE tripbook;

CREATE TABLE users(
user_id int auto_increment,
private_name varchar(30),
family_name varchar(30),
user_name varchar(30),
password varchar(255),
access boolean default false,
primary key(user_id)
);

CREATE TABLE vacations(
vacation_id int auto_increment,
description text,
country varchar(40),
image varchar(255),
date_start date,
date_finish date,
price int(20),
followers int(20),
primary key(vacation_id)
);

CREATE TABLE follows(
id int auto_increment,
user_id int,
vacation_id int,
primary key(id),
foreign key(user_id) references users(user_id),
foreign key(vacation_id) references vacations(vacation_id)
);