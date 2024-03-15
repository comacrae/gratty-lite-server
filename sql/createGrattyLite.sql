CREATE TABLE users (
id int AUTO_INCREMENT,
username varchar(255) NOT NULL,
first_name varchar(255) NOT NULL,
last_name varchar(255) NOT NULL,
created_at timestamp,
PRIMARY KEY(id),
CONSTRAINT UNIQUE(username)
);

CREATE TABLE followers(
follower_id int,
followed_id int,
created_at timestamp,
FOREIGN KEY (follower_id) REFERENCES users(id),
FOREIGN KEY (followed_id) REFERENCES users(id),
CONSTRAINT cannot_self_follow CHECK (follower_id <> followed_id),
CONSTRAINT no_duplicate_follows UNIQUE(follower_id, followed_id);
);

CREATE TABLE posts(
id int NOT NULL AUTO_INCREMENT,
author_id int NOT NULL,
created_at timestamp,
PRIMARY KEY (id),
FOREIGN KEY (author_id) REFERENCES users(id)
);

CREATE TABLE list_items(
id int NOT NULL AUTO_INCREMENT,
post_id int NOT NULL,
item_text varchar(255) NOT NULL,
FOREIGN KEY (post_id) REFERENCES posts(id),
PRIMARY KEY (id)
);