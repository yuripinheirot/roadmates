import { GoogleRouteResponse } from '@/providers/google-api/protocols/google-route-response.type';

export const googleApiRouteResponseMock: GoogleRouteResponse = {
  routes: [
    {
      distanceMeters: 300,
      duration: '365s',
      polyline: {
        encodedPolyline: 'ipkcFfichVnP@j@BLoFVwM{E?',
      },
    },
    {
      distanceMeters: 100,
      duration: '165s',
      polyline: {
        encodedPolyline: 'ipkcFfichVnP@j@BLoFVwM{E?',
      },
    },
  ],
};
