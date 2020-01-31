export const getEncodedLocation = location => {
  const { street, city, state, zip, latitude, longitude } = location;
  const defaultLocation = 'City Hall, Austin, Texas 78701';
  if (street) {
    return encodeURIComponent(
      `${street} ${city || 'Austin'}, ${state || 'Texas'} ${zip}`,
    );
  }
  if (latitude && longitude) {
    return encodeURIComponent(`${latitude}, ${longitude}`);
  }
  return encodeURIComponent(defaultLocation);
};
