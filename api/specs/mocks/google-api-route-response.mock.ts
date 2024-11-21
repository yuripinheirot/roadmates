import { GoogleRouteResponse } from '@/providers/google-api/protocols/google-route-response.type';

export const googleApiRouteResponseMock: GoogleRouteResponse = {
  routes: [
    {
      distanceMeters: 300,
      duration: '365s',
      legs: [
        {
          startLocation: {
            latLng: {
              latitude: 0,
              longitude: 0,
            },
          },
          endLocation: {
            latLng: {
              latitude: 1,
              longitude: 1,
            },
          },
        },
      ],
    },
    {
      distanceMeters: 100,
      duration: '165s',
      legs: [
        {
          startLocation: {
            latLng: {
              latitude: 0,
              longitude: 0,
            },
          },
          endLocation: {
            latLng: {
              latitude: 1,
              longitude: 1,
            },
          },
        },
      ],
    },
  ],
};
