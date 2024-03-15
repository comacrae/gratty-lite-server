INSERT INTO users (username, first_name, last_name, created_at)
VALUES
      ('comacrae', 'Colin', 'MacRae', NOW()),
      ('jdoe', 'Jane', 'Doe', NOW()),
      ('rfrost', 'Robert', 'Frost', NOW());

INSERT INTO followers(follower_id, followed_id, created_at)
VALUES
      (1,2,NOW()),
      (1,3,NOW()),
      (2,3,NOW()),
      (3,1,NOW());

INSERT INTO posts (author_id, created_at)
VALUES
      (1, NOW()),
      (1, NOW()),
      (2, NOW()),
      (3, NOW());

INSERT INTO list_items (post_id, item_text)
VALUES
      (1, "Puppies"),
      (1, "Kittens"),
      (1, "Rainbows and stuff"),
      (2, "My dog"),
      (2, "Pancakes"),
      (3, "The sun"),
      (3, "The moon"),
      (3, "Backrubs"),
      (4, "Coding");