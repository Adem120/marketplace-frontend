import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../service/ticketservice';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product/product.module';

@Component({
    template: `
        <div class="stepsdemo-content">
            <p-card>
            
                    <div class="field col-12 my-auto">
                        <label for="class">titre :</label>
                        <b>{{ produit.titre }} </b>
                    </div>
                    <div class="field col-12 my-auto">
                        <label for="class">code :</label>
                        <b>{{ produit.code }} </b>
                    </div>
                    <div class="field col-12 my-auto">
                        <label for="class">marque :</label>
                        <b>{{ produit.marque }} </b>
                    </div>
                    <div class="field col-12 my-auto">
                        <label for="class">prix :</label>
                        <b>{{ produit.prix }} D</b>
                    </div>
                    <div class="field col-12 my-auto">
                        <label for="class">prix de livraison :</label>
                        <b>{{ produit.prixLivr }} D</b>
                    </div>
                    <div class="field col-12 my-auto">
                        <label for="class">quantite :</label>
                        <b>{{ produit.quantite }} piéces</b>
                    </div>
                    <div class="field col-12 my-auto">
                        <label for="class">categorie :</label>
                        <b>{{ produit.categorie?.titre }} </b>
                    </div>
                    <div class="field col-12 my-auto">
                 <label for="class">images :</label>
                    <div class="card">
    <div *ngIf="produit.images" class="flex flex-wrap">
        <div *ngFor="let img of produit.images; let index = index"  key="index" >
            <img  [src]="img.path" [alt]="img.nom" class="mb-2" style="cursor: pointer; max-width:100px; height: auto;" (click)="imageClick(index)" />

           
        </div>
    </div>

    <p-galleria
        [value]="produit.images"
        [(visible)]="displayCustom"
        [(activeIndex)]="activeIndex"
        [responsiveOptions]="responsiveOptions"
        [containerStyle]="{ 'max-width': '300px' }"
        [numVisible]="1"
        [circular]="true"
        [fullScreen]="true"
        [showItemNavigators]="true"
        [showThumbnails]="false"
    >
        <ng-template pTemplate="item" let-image>
            <img [src]="image.path" style="max-width: 100%; height: auto; display: block;" />
        </ng-template>
    </p-galleria>
</div>


             </div>       
                    
                    
             
                <ng-template pTemplate="footer">
                    <div class="grid grid-nogutter justify-content-between">
                        <p-button label="Back" (onClick)="prevPage()" icon="pi pi-angle-left"></p-button>
                        <p-button label="Complete" (onClick)="complete()" icon="pi pi-angle-right" iconPos="right" styleClass="p-button-success"></p-button>
                    </div>
                </ng-template>
            </p-card>
        </div>

    `

})
export class ConfirmationDemo implements OnInit {
    produit= new Product();
    displayCustom: boolean=false;

    activeIndex: number = 0;

    images: any[] = [];
    constructor(public ticketService: TicketService, private router: Router) {}
    responsiveOptions: any[] = [
        {
            breakpoint: '1500px',
            numVisible: 5
        },
        {
            breakpoint: '1024px',
            numVisible: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];
    
    ngOnInit() {
        this.produit = this.ticketService.getProduitInformation();
        console.log(this.produit);  
        console.log(this.produit.images);
      
    }

    complete() {
        this.ticketService.complete();
    }

    prevPage() {
        this.router.navigate(['pages/steps/image']);
    }
    imageClick(index: number) {
        this.activeIndex = index;
        this.displayCustom = true;
    }

}