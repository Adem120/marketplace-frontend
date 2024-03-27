import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from '../model/product/product.module';
    
    @Injectable()
    export class TicketService {
        
        public produit = new Product();
        formData = new FormData();
        private paymentComplete = new Subject<any>();
        paymentComplete$ = this.paymentComplete.asObservable();
    
        getProduitInformation() {
            console.log(this.produit);
            return this.produit;
        }
    
        setProduitInformation(produit: Product) {
            this.produit = produit;
            console.log(produit);
        }
        getFormData() {
            return this.formData;
        }
        setFormData(formData: FormData) {
            this.formData = formData;
        }
    
        complete() {
            this.paymentComplete.next(this.produit);
        }
     
    }
    