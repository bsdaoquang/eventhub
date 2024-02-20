export interface LocationModel {
  title: string;
  id: string;
  language: string;
  resultType: string;
  localityType: string;
  address: Address;
  highlights: Highlights;
}

export interface Address {
  label: string;
  countryCode: string;
  countryName: string;
  county: string;
  city: string;
  postalCode: string;
}

export interface Highlights {
  title: Title[];
  address: Address2;
}

export interface Title {
  start: number;
  end: number;
}

export interface Address2 {
  label: Label[];
  city: City[];
}

export interface Label {
  start: number;
  end: number;
}

export interface City {
  start: number;
  end: number;
}
