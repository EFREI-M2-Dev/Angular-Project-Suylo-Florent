import {Licence} from "./Licence";

export interface Product{
  id: number;
  name: string;
  licence: Licence;
  price: string;
  sex: string;
  subtitle: string;
  description: string;
  releaseDate: string;
}
