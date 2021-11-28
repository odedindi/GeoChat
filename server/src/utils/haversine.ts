export const getAerialDistance = (
  point1: { lat: number; lng: number },
  point2: { lat: number; lng: number },
): number => {
  const { lat: lat1, lng: lng1 } = point1;
  const { lat: lat2, lng: lng2 } = point2;
  if (lat1 === lat2 && lng1 === lng2) return 0;

  const deg2rad = (deg: number) => deg * (Math.PI / 180);

  const R = 6371; // Earth's radius(km)
  const dLat = deg2rad(lat2 - lat1);
  const dLng = deg2rad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
};
