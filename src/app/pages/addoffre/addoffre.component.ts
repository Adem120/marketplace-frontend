import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Offre } from 'src/app/model/product/offre.module';

@Component({
  selector: 'app-addoffre',
  templateUrl: './addoffre.component.html',
  styleUrls: ['./addoffre.component.scss']
})
export class AddoffreComponent implements OnInit {
offre = new Offre();
items!: MenuItem[];

home!: MenuItem 
submitted:boolean=false;



ngOnInit(): void {
  this.items = [{ label: 'offre' }, { label: 'ajouteroffre' }];
  this.home = { icon: 'pi pi-home', routerLink: '/' };

}
ajouteroffre(){
this.submitted=true
}

}
