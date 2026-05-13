// website\types\domain.d.ts

export interface Domain {
  _id: string;
  id: string;
  name: string;
  parentDomain: {
    _id: string;
    name: string;
  } | null;
}

export interface DomainApiResponse {
  message: string;
  data: Domain[];
}