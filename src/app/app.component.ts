import { Component, OnInit } from '@angular/core';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { ProductService } from './service/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  items!: MenuItem[];
  products: any[] = [];
  title = 'markentplace-frontend';
  public role='admin'
  constructor(private productService: ProductService,private primengConfig: PrimeNGConfig) { }
  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.productService.getProductsSmall().then(data => this.products = data);

    this.items = [
      { label: 'Add New', icon: 'pi pi-fw pi-plus' },
      { label: 'Remove', icon: 'pi pi-fw pi-minus' }
  ];
  }

}
