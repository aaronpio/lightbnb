INSERT INTO users
  (name, email, password)
VALUES
  ('Aaron Yo', 'aaron@aaron.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Joe Hi', 'joe@joe.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Tim Hey', 'tim@tim.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties
  (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES
  (1, 'Cave', '*description*', 'cave.com', 'cave2.com', 10, 1, 1, 1, 'Canada', 'cave road', 'Caveville', 'Ontario', 'n4w8k7', true ),
  (2, 'house', '*description*', 'house.com', 'house2.com', 50, 2, 3, 3, 'Canada', 'house road', 'Houseville', 'Ontario', 'n2w2k2', false ),
  (3, 'Hole', '*description*', 'hole.com', 'hole2.com', 20, 3, 2, 2, 'Canada', 'hole road', 'Holeville', 'Ontario', 'n6w6k6', true );

INSERT INTO reservations
  (start_date, end_date, property_id, guest_id)
VALUES
  ('2020-01-01', '2020-02-02', 1, 1),
  ('2020-03-03', '2020-04-04', 2, 2),
  ('2020-05-05', '2020-06-06', 3, 3);

INSERT INTO property_reviews
  (guest_id, property_id, reservation_id, rating)
VALUES
  (1, 1, 1, 3),
  (2, 2, 2, 9),
  (3, 3, 3, 2);
  