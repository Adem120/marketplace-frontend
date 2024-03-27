import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { TicketService } from '../../service/ticketservice';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/service/product.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product/product.module';

@Component({
    selector: 'steps-routing-demo',
    templateUrl: './steps-routing-demo.html',
    providers: [MessageService]
})
export class StepsRoutingDemo implements OnInit {
    items!: MenuItem[];

    subscription!: Subscription;
    formadata:FormData=new FormData();
    constructor(public messageService: MessageService, public ticketService: TicketService,private productservice:ProductService,private router:Router) {}

    ngOnInit() {
        this.items = [
            {
                label: 'Information',
                routerLink: 'step1'
            },
            {
                label: 'Details',
                routerLink: 'step2'
            },
            {
                label: 'Images',
                routerLink: 'image'
            },
            {
                label: 'Confirmation',
                routerLink: 'confirmation'
            }
        ];
      
        this.subscription = this.ticketService.paymentComplete$.subscribe((produit) => {
           this.formadata= this.ticketService.getFormData();
           this.formadata.append('titre',produit.titre);
           console.log(produit);
              this.formadata.append('description',produit.description);
                this.formadata.append('code',produit.code);
                this.formadata.append('marque',produit.marque);
                this.formadata.append('prix',produit.prix);
                this.formadata.append('prixLivr',produit.prixLivr);
                this.formadata.append('quantite',produit.quantite);
                this.formadata.append('categorie',produit.categorie);
                this.formadata.append('categorie_id',produit.categorie.id);
              console.log(this.formadata.get('titre'));
              if(this.formadata.get('titre')!=null&&this.formadata.get('description')!=null&&this.formadata.get('code')!=null&&this.formadata.get('marque')!=null&&this.formadata.get('prix')!=null&&this.formadata.get('prixLivr')!=null&&this.formadata.get('quantite')!=null&&this.formadata.get('categorie')!=null&&this.formadata.get('categorie_id')!=null)
           if(produit.id==null){
              this.productservice.addProduct(this.formadata).subscribe(
                data => {
                    let produit=new Product();
                    this.ticketService.setProduitInformation(produit)
                    this.messageService.add({ severity: 'success', summary: 'votre produit ajouter' });
                    this.router.navigate(['pages/crud']);
                },
                error => {
                    if (error.error && error.error.message) {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
                    } else {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'problém dans votre donnéé' });
                    }
                }
            );}
            else{
                this.formadata.append('id',produit.id);
                this.formadata.append('etat',produit.etat);
                this.productservice.updateProduct(this.formadata).subscribe(
                    data => {
                        this.messageService.add({ severity: 'success', summary: 'produit modifier'});
                        this.router.navigate(['pages/crud']);
                    },
                    error => {
                        if (error.error && error.error.message) {
                            this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
                        } else {
                            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while processing your request.' });
                        }
                    }
                );
            }
        });
        
 

    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}