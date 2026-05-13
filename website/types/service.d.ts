// website\types\article.d.ts

export interface ServiceDomain {
  _id: string;
  name: string;
  slug: string;
}

export interface Service {
  _id?: string;
  title: string;
  domain?: string | ServiceDomain | null;
  subHeading?: string | null;
  description?: string | null;
  thumbnail?: string | null;
  isActive?: boolean;
  read_time?: string;
}
