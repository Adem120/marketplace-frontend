import { Image } from "src/app/api/image";
import { Categorie } from "./categorie.module";

interface InventoryStatus {
  label: string;
  value: string;
}
export interface Product {
  id?: string;
  titre?: string;
  description?: string;
  prix?: number;
  quantite?: number;
  category?: Categorie;
  images?: Image[];
  
}