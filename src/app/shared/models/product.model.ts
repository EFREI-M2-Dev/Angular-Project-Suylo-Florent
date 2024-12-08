import {LicenceModel} from "./licence.model";

export interface ProductModel {
  id: number;
  name: string;
  licence: LicenceModel;
  price: string;
  sex: string;
  subtitle: string;
  description: string;
  releaseDate: string;
  imgCover?: string;
  isFeatured?: boolean;
}
