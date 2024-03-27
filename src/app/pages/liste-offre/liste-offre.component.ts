import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { PrimeNG_FR } from './primefr'; // Import the custom translation file
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { Offre } from 'src/app/model/product/offre.module';
import { OffreService } from 'src/app/service/offre.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-liste-offre',
  templateUrl: './liste-offre.component.html',
  styleUrls: ['./liste-offre.component.scss']
})
export class ListeOffreComponent implements OnInit{
  offres!: Offre[];

  

  statuses!: any[];

  loading: boolean = true;
  items!: MenuItem[];

  home!: MenuItem 
  activityValues: number[] = [0, 100];
  filteroffres!: Offre[];
  loading1: boolean = true;
  constructor(
  private primeNGConfig: PrimeNGConfig,private offreservice:OffreService,private router:Router) {this.primeNGConfig.setTranslation(PrimeNG_FR);}
  ngOnInit() {
    this.items = [{ label: 'offre' }, { label: 'listeoffre' }];
  this.home = { icon: 'pi pi-home', routerLink: '/' };
     this.offreservice.getoffres().subscribe(data=>{
      this.offres=data
      this.offres.forEach(offre =>{ (offre.dateDebut = new Date(<Date>offre.dateDebut)),
      (offre.dateFin = new Date(<Date>offre.dateFin))}

      );
      this.loading=false
    
      console.log(this.offres)
     })
      this.statuses = [
          { label: 'terminer', value:0 },
          { label: 'en cours', value: 1 },
       
      ];
  }

  clear(table: Table) {
      table.clear();
  }

  getSeverity(status: boolean){
      switch (status) {
          case false:
              return 'danger';

          case true:
              return 'success';

         /*  case 'new':
              return 'info';

          case 'negotiation':
              return 'warning';

          case 'renewal':
              return 'primary'; */
          default:
            return '';
         
         
      }
     
        
  }
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
     
}
openajouteroffre(){
  this.router.navigate(['pages/ajouteroffre']);
  
}
}
