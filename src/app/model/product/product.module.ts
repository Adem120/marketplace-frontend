import { Categorie } from "./categorie.module";
import { Photo } from "./image.module";
import { Offre } from "./offre.module";

interface InventoryStatus {
  label: string;
  value: string;
}
export class Product {
  id?: string;
  titre?: string;
  code?: string;
  description?: string;
  marque?: string;
  prix?: number;
  prixLivr?: number;
  quantite?: number;
  etat?: string;
  categorie?: Categorie;
  categorie_id?: number;
  offre?: Offre;
  images?: Photo[];
 
  
}