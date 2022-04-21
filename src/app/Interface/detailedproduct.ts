import { IProduct } from './products';

export interface IDetailedProduct extends IProduct {
  description: string;
  url: string;
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
  service: string;
  callToAction: string[];
}
