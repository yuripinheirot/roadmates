type Leg = {
  startLocation: {
    latLng: {
      latitude: number;
      longitude: number;
    };
  };
  endLocation: {
    latLng: {
      latitude: number;
      longitude: number;
    };
  };
};

export type GoogleRoute = {
  distanceMeters: number;
  duration: string;
  legs: Leg[];
};

export type GoogleRouteResponse = {
  routes: GoogleRoute[];
};
