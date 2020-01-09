const { Pool } = require("pg");

const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "lightbnb"
});

/// Users
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

const getUserWithEmail = function(email) {
  const queryString = `
  SELECT * FROM users
  WHERE email IN ($1)`;
  const values = [email.toLowerCase()];

  return pool.query(queryString, values).then(res => res.rows[0]);
};
exports.getUserWithEmail = getUserWithEmail;

//------------------------------------------------------------------

const getUserWithId = function(id) {
  const queryString = `
  SELECT * FROM users
  WHERE id IN ($1)`;
  const values = [id];

  return pool.query(queryString, values).then(res => res.rows[0]);
};
exports.getUserWithId = getUserWithId;

//------------------------------------------------------------------

const addUser = function(user) {
  const queryString = `
  INSERT INTO users (name, password, email) 
  VALUES ($1, $2, $3)`;

  const values = [user.name, user.password, user.email];

  return pool.query(queryString, values).then(res => res.rows[0]);
};
exports.addUser = addUser;

/// Reservations
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

const getAllReservations = function(guest_id, limit = 10) {
  const queryString = `
  SELECT *, cover_photo_url
  FROM reservations
  JOIN properties ON property_id = properties.id
  WHERE guest_id = $1
  LIMIT $2`;
  const values = [guest_id, limit];

  return pool.query(queryString, values).then(res => res.rows);
};
exports.getAllReservations = getAllReservations;

/// Properties
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

const getAllProperties = function(options, limit = 10) {
  let queryParams = [];

  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating 
  FROM properties 
  JOIN property_reviews ON properties.id = property_id
  `;

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  }

  if (options.owner_id) {
    queryParams.push(`%${options.owner_id}%`);
    if (queryParams.length > 1) {
      queryString += `AND owner_id LIKE $${queryParams.length}`;
    } else {
      queryString += `WHERE owner_id LIKE $${queryParams.length}`;
    }
  }

  if (options.minimum_price_per_night && options.maximum_price_per_night) {
    queryParams.push(Number(options.minimum_price_per_night) * 100);
    queryParams.push(Number(options.maximum_price_per_night) * 100);
    if (queryParams.length > 2) {
      queryString += `AND properties.cost_per_night BETWEEN $${queryParams.length -
        1} AND $${queryParams.length}`;
    } else {
      queryString += `WHERE properties.cost_per_night BETWEEN $${queryParams.length -
        1} AND $${queryParams.length}`;
    }
  }

  if (options.minimum_rating) {
    queryParams.push(Number(options.minimum_rating));
    if (queryParams.length > 1) {
      queryString += `AND rating >= $${queryParams.length}`;
    } else {
      queryString += `WHERE rating >= $${queryParams.length}`;
    }
  }

  queryParams.push(limit);
  queryString += ` 
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length}
  `;

  return pool.query(queryString, queryParams).then(res => res.rows);
};
exports.getAllProperties = getAllProperties;

//------------------------------------------------------------------
const addProperty = function(property) {
  const queryString = `
  INSERT INTO properties (  owner_id,
    title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, street, city, province, post_code, country,parking_spaces, number_of_bathrooms, number_of_bedrooms) 
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
  RETURNING *`;

  const values = [
    property.owner_id,
    property.title,
    property.description,
    property.thumbnail_photo_url,
    property.cover_photo_url,
    property.cost_per_night,
    property.street,
    property.city,
    property.province,
    property.post_code,
    property.country,
    property.parking_spaces,
    property.number_of_bathrooms,
    property.number_of_bedrooms
  ];

  return pool.query(queryString, values).then(res => res.rows[0]);
};
exports.addProperty = addProperty;
