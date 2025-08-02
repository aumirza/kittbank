export interface IATM {
  _id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  company: string;
  machine: string;
  location: {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
  };
  locationInWord: string;
  latitude: number;
  longitude: number;
  __v: number;
}
