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
followers int(20) default 0,
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

INSET INTO vacations(description, country, image, date_start, date_finish, price)
VALUES('magic vacation for couples','Seychelles','https://smartravel.tips/wp-content/uploads/2017/05/433047_13030814240010759491.jpg',DATE '2020-12-28', DATE '2021-01-04',820) ,
('just like home','Israel','https://3er1viui9wo30pkxh1v2nh4w-wpengine.netdna-ssl.com/wp-content/uploads/prod/sites/93/2020/01/Israel-1024x683.jpg',DATE '2021-03-11', DATE '2021-03-17',30) ,
('for people who like a good shopping','New York','https://blog-www.pods.com/wp-content/uploads/2019/04/MG_1_1_New_York_City-1.jpg',DATE '2020-07-03', DATE '2021-08-06',1100) ,
('everything in one country','Mexico','https://specials-images.forbesimg.com/imageserve/5ecd3cd9cafaec0006c6f234/960x0.jpg?fit=scale',DATE '2020-02-17', DATE '2021-02-28',615) ,
('best night-life!','Berlin','https://upload.wikimedia.org/wikipedia/commons/6/6c/Aerial_view_of_Berlin_%2832881394137%29.jpg',DATE '2020-01-12', DATE '2021-01-16',320) ,
('life time experience','Brazil','https://wifinowevents.s3.amazonaws.com/uploads/2020/05/Rio.jpeg',DATE '2021-03-25', DATE '2021-04-07',787) ,
('best ski vacation!','France','https://www.powderbeds.com/uploads/Cande2918.jpg',DATE '2021-02-22', DATE '2021-02-26',456);

Insert into users(private_name, family_name, user_name, password)
Values('atalya','roichman','atalyaro',"$2b$10$u.SPMt5H5B9zvt/2UM2A2OZ2G5B4wpMtJwqV34yVJq84If9waafie") ,
('omer','naar','omernaar',"$2b$10$u.SPMt5H5B9zvt/2UM2A2OZ2G5B4wpMtJwqV34yVJq84If9waafie") ,
('mai','nitzan','maithequeen',"$2b$10$Zxl2gBEITac3oYUoqEaPZOsMD/mAk7YhM1SJzfKYdj79td.t0.OQq") ,
('amir','tchetchik','amir_t1',"$2b$10$IrHQBdrQQlZIilkXXHToZOor8AWRhH5iqDvn92Br/r6VYDzTBYP9O"),
('yahav','nayer','yahoov',"$2b$10$VCZhVRz8c1v2mwLexuTgp.L9zNGu9vEK5cJBRxF/KjjYHILMm5gja");

UPDATE users
SET access=1
WHERE user_id=1;

INSERT INTO follows (user_id,vacation_id)
VALUES(2,3),
(2,5),
(3,3),
(3,4),
(3,5),
(4,3),
(4,4),
(5,3),
(5,4),
(5,6);

UPDATE vacations
SET followers=4
WHERE vacation_id=3;

UPDATE vacations
SET followers=2
WHERE vacation_id=5;

UPDATE vacations
SET followers=3
WHERE vacation_id=4;

UPDATE vacations
SET followers=1
WHERE vacation_id=6;

-- all the passwords are 1234
-- my website is: "http://34.201.56.22:3000/"
-- you can find all the project at my git - atalyaro