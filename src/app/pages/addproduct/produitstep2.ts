import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../service/ticketservice';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product/product.module';
import { CategorieService } from 'src/app/service/categorie.service';
import { Categorie } from 'src/app/model/product/categorie.module';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { FilterService } from 'primeng/api';

@Component({
    template: `
        <div class="stepsdemo-content">
            <p-card>
                <ng-template pTemplate="title"> Information Produit </ng-template>
                <ng-template  pTemplate="content">
                <div class="p-fluid ml-8 ">
                        <div class="field min-w-min w-8">
                        <label for="quantite">quantite<span class="text-red-500">*</span></label>
                        <p-inputNumber
                        #quantite="ngModel"
                            id="quantite"
                            [showButtons]="true"
                            [(ngModel)]="produit.quantite" inputId="minmax" mode="decimal"
                            [ngClass]="{ 'ng-dirty': (!quantite.value && submitted) || (quantite.dirty && !quantite.value) }"

                            [min]="0" [max]="10000"> </p-inputNumber>
                            
                            <small *ngIf="(!quantite.value && submitted) || (quantite.dirty && !quantite.value)" class="p-error">quantité obligatoire.</small>
                        </div>
                        <div class="field min-w-min w-8">
                            <label for="prix">prix<span class="text-red-500">*</span></label>
                            <p-inputNumber
                            #prix="ngModel"
                                id="prix"
                                [showButtons]="true"
                            [(ngModel)]="produit.prix" inputId="minmax" mode="decimal"
                            [ngClass]="{ 'ng-dirty': (!prix.value && submitted) || (prix.dirty && !prix.value) }"

                            [min]="0" [max]="10000"> </p-inputNumber>
                           
                            <small *ngIf="(!prix.value && submitted) || (prix.dirty && !prix.value)"class="p-error">prix obligatoire</small>
                        </div>
                        <div class="field min-w-min w-8">
                            <label for="titre">prix de livraison<span class="text-red-500">*</span></label>
                            <p-inputNumber
                            #prixLivr="ngModel"
                                id="prixLivr"
                                [showButtons]="true"
                            [(ngModel)]="produit.prixLivr" inputId="minmax" mode="decimal"
                            [ngClass]="{ 'ng-dirty': (!prixLivr.value && submitted) || (prixLivr.dirty && !prixLivr.value) }"

                            [min]="0" [max]="100"> </p-inputNumber>
                            <small *ngIf="(!prixLivr.value && submitted) || (prixLivr.dirty && !prixLivr.value)" class="p-error">prixde livraison obligatoire</small>

                        </div>
                        
               
    
    <div class="filed ">
        <div class="mb-2">
    <label for="Categorie">Categorie<span class="text-red-500">*</span></label>
    </div>
    <div class="field min-w-min w-8">
    <p-autoComplete id="categorie" #categorie="ngModel" [(ngModel)]="produit.categorie" [dropdown]="true" [suggestions]="filteredCategories" (completeMethod)="filtercat($event)" field="titre"
    [ngClass]="{ 'ng-dirty': (categorie.invalid && submitted) || (categorie.dirty && categorie.invalid) }">
   
    <ng-template let-categorie pTemplate="item">
            <div class="flex align-items-center gap-2">
                <div>{{ categorie.titre }}</div>
            </div>
        </ng-template>
</p-autoComplete>

</div>

</div>

 <small *ngIf="(produit.categorie==null && submitted) " class="p-error">Categorie obligatoire</small>

</div>         

                </ng-template>
                <ng-template pTemplate="footer">
                    <div class="grid grid-nogutter justify-content-between">
                        <p-button label="Back" (onClick)="prevPage()" icon="pi pi-angle-left"></p-button>
                        <p-button label="Next" (onClick)="nextPage()" icon="pi pi-angle-right" iconPos="right"></p-button>
                    </div>
                </ng-template>
            </p-card>
        </div>
        `
})

export class Produitsteps2 implements OnInit {
    constructor(public ticketService: TicketService, private router: Router,private categorieservice:CategorieService,private filterService: FilterService) {}

  
    categories: Categorie[] = [];
    filteredCategories: Categorie[] = [];
   
   


   
    produit= new Product();
    submitted: boolean = false;

    ngOnInit() {
         this.categorieservice.getCategorie().subscribe(data =>{
            console.log(data);
            this.categories = data;
        }) 
        
        
        this.produit = this.ticketService.getProduitInformation();
    }

    
    nextPage() {
/*         this.produit.categorie=this.categories.find(categorie => categorie.nom === this.selectCategorie.nom);
 */
        if (this.produit.prix && this.produit.prixLivr && this.produit.quantite && this.produit.categorie) {
            this.ticketService.setProduitInformation(this.produit);

            this.router.navigate(['pages/steps/image']);

            return;
        }
        this.submitted = true;

    
    }

    prevPage() {
        this.router.navigate(['pages/steps/step1']);
    }
    filtercat(event: AutoCompleteCompleteEvent) {
        let filtered: any[] = [];
        let query = event.query;

        for (let i = 0; i < (this.categories as any[]).length; i++) {
            let item = (this.categories as any[])[i];
          
            if (item.titre.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              
                filtered.push(item);
            }
        }
        this.filteredCategories = filtered;
    }
}