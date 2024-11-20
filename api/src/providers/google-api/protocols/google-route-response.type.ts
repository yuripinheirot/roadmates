export type GoogleRoute = {
  distanceMeters: number;
  duration: string;
  polyline: {
    encodedPolyline: string;
  };
};

export type GoogleRouteResponse = {
  routes: GoogleRoute[];
};
