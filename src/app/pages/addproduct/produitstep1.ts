import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../service/ticketservice';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product/product.module';
import { ProductService } from 'src/app/service/product.service';
import { Subscription, defaultIfEmpty } from 'rxjs';

@Component({
    template: `
        <div  class="stepsdemo-content">
      
            <p-card  >
                <ng-template pTemplate="title"> Ajouter Produit </ng-template>
                <ng-template  pTemplate="content">
                    <div class="p-fluid ml-8 " >
                        <div class="field min-w-min w-8">
                        <label for="titre">titre<span class="text-red-500">*</span></label>
                            <input
                                #titre="ngModel"
                                id="firstname"
                                type="text"
                                required
                                pInputText
                                [(ngModel)]="produit.titre "
                                [ngClass]="{ 'ng-dirty': (titre.invalid && submitted) || (titre.dirty && titre.invalid) }"
                            />
                            <small *ngIf="(titre.invalid && submitted) || (titre.dirty && titre.invalid)" class="p-error">titre obligatoire.</small>
                        </div>
                        <div class="field min-w-min w-8">
                            <label for="titre">code<span class="text-red-500">*</span></label>
                            <input
                                #code="ngModel"
                                id="firstname"
                                type="text"
                                required
                                pInputText
                                [(ngModel)]="produit.code"
                                [ngClass]="{ 'ng-dirty': (code.invalid && submitted) || (code.dirty && code.invalid) }"
                            />
                            <small *ngIf="(code.invalid && submitted) || (code.dirty && code.invalid)" class="p-error">code obligatoire</small>
                        </div>
                        <div class="field min-w-min w-8">
                            <label for="titre">marque<span class="text-red-500">*</span></label>
                            <input
                                #marque="ngModel"
                                id="firstname"
                                type="text"
                                required
                                pInputText
                                [(ngModel)]="produit.marque"
                                [ngClass]="{ 'ng-dirty': (marque.invalid && submitted) || (marque.dirty && marque.invalid) }"
                            />
                            <small *ngIf="(marque.invalid && submitted) || (marque.dirty && marque.invalid)" class="p-error">marque obligatoire</small>
                        </div>
                        <div class="field min-w-min w-8">
                            <label for="titre">descreption :<span class="text-red-500">*</span></label>
                            <textarea    #description="ngModel" id="firstname" rows="5" cols="30" pInputTextarea 
                            [(ngModel)]="produit.description"
                            [ngClass]="{ 'ng-dirty': (description.invalid && submitted) || (description.dirty && description.invalid) }"></textarea>
                            <small *ngIf="(description.invalid && submitted) || (description.dirty && description.invalid)" class="p-error">descreption obligatoire</small>


                            
                        </div>
                    </div>
                </ng-template>          
                <ng-template pTemplate="footer">
                    <div class="grid grid-nogutter justify-content-end">
                        <p-button label="Next" (onClick)="nextPage()" icon="pi pi-angle-right" iconPos="right"></p-button>
                    </div>
                    
                </ng-template>
            </p-card>
            </div> 
        
    `
})
export class Produitstep1 implements OnInit {
  public produit= new Product();

    submitted: boolean = false;
    styles = {
        'bg-primery': true,
    }
    dataLoaded!: boolean ;
    subscription!: Subscription;
    update: boolean=false ;
    constructor(public ticketService: TicketService, private router: Router,public produitservice:ProductService) {}

    ngOnInit() {
        this.dataLoaded = false;
        this.produitservice.updatecomponent
        .subscribe(data => {
            if (data) {
                console.log(data);
                this.update = true;
                this.ticketService.setProduitInformation(data);
               this.produit= this.ticketService.getProduitInformation();
                 console.log(this.produit);
            
            } 
        });
        console.log(this.update);
     this.produit=this.ticketService.getProduitInformation();
     console.log(this.produit);

/*        if(this.update==false){
        console.log("hhhhhh")
        let produit = new Product();
        this.ticketService.setProduitInformation(produit);

           this.produit=this.ticketService.getProduitInformation();
           console.log(this.produit);       } */ 
    }
    
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    nextPage() {
       console.log(this.produit);
        if (this.produit.titre) {
            this.ticketService.setProduitInformation(this.produit);
            this.router.navigate(['pages/steps/step2']);

            return;
        }

        this.submitted = true;
    }
}
