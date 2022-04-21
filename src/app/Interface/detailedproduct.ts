import { IProduct } from './products';

export interface IDetailedProduct extends IProduct {
  description: string;
  url: string;
  category: string;
  image: string;
  providedBy: {
    companyName: string;
    address: {
      street: string;
      city: string;
      zipCode: string;
      county: string;
      country: string;
    };
    social: {
      name: string;
      link: string;
    };
    phone: string;
  };
  releaseDate: string;
  status: string;
  service: string;
  callToAction: string[];
}
