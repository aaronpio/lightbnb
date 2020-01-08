
SELECT properties.*, reservations.*, avg(rating)
FROM property_reviews
  JOIN properties ON property_reviews.property_id = properties.id
  JOIN reservations ON property_reviews.property_id = reservations.property_id
WHERE property_reviews.guest_id = 1
GROUP BY properties.id, reservations.start_date, reservations.end_date
HAVING reservations.end_date < now()
::date
ORDER BY start_date
LIMIT 10;