import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product/product.module';
import { MenuItem, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/service/product.service';
import { FilterService, SelectItemGroup } from 'primeng/api';
import { AutoCompleteCompleteEvent } from 'src/app/model/product/autocomplet.module';
import { CategorieService } from 'src/app/service/categorie.service';
import { Categorie } from 'src/app/model/product/categorie.module';
import { Subscription } from 'rxjs';

@Component({
    templateUrl: './crud.component.html',
    providers: [MessageService]
})
export class CrudComponent implements OnInit {

    productDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    products: Product[] = [];

    product: Product = {};

    selectedProducts: Product[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    categorie!: Categorie;
    categoriesfilter: Categorie[] = [];
   
     subscription!: Subscription;
    categories: Categorie[] = [];
    items: MenuItem[] | undefined;

    activeIndex: number = 0;


    onActiveIndexChange(event: number) {
        this.activeIndex = event;
    }
    constructor( private productService: ProductService, private messageService: MessageService,private categorieservice:CategorieService) { }

    ngOnInit() {
        this.categorieservice.getCategorie().subscribe(data =>{
            console.log(data);
            this.categories = data;
        })
        
        this.items = [
            {
                label: 'Personal',
                command: (event: any) => this.messageService.add({severity:'info', summary:'First Step', detail: event.item.label})
            },
            {
                label: 'Seat',
                command: (event: any) => this.messageService.add({severity:'info', summary:'Second Step', detail: event.item.label})
            },
            {
                label: 'Payment',
                command: (event: any) => this.messageService.add({severity:'info', summary:'Third Step', detail: event.item.label})
            },
            {
                label: 'Confirmation',
                command: (event: any) => this.messageService.add({severity:'info', summary:'Last Step', detail: event.item.label})
            }
        ];
     this .productService.getProducts().subscribe(data => {
        this.products = data;
           console.log(data);})
      
 
     
        this.cols = [
            { field: 'product', header: 'Product' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' },
            { field: 'rating', header: 'Reviews' },
            { field: 'inventoryStatus', header: 'Status' }
        ];

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    openNew() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(product: Product) {
        this.product = { ...product };
        this.productDialog = true;
    }

    deleteProduct(product: Product) {
        this.deleteProductDialog = true;
        this.product = { ...product };
    }

    confirmDeleteSelected() {
        this.deleteProductsDialog = false;
        this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
        this.selectedProducts = [];
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.products = this.products.filter(val => val.id !== this.product.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        this.product = {};
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

   /* saveProduct() {
        this.submitted = true;

        if (this.product.name?.trim()) {
            if (this.product.id) {
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
                this.products[this.findIndexById(this.product.id)] = this.product;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                this.product.id = this.createId();
                this.product.code = this.createId();
                this.product.image = 'product-placeholder.svg';
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
                this.products.push(this.product);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            this.products = [...this.products];
            this.productDialog = false;
            this.product = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }
*/
    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
    filterCategorie(event: AutoCompleteCompleteEvent) {
        let filtered: Categorie[] = [];
        let query = event.query;

        for (let i = 0; i < (this.categories as any[]).length; i++) {
            let cat = (this.categories as any[])[i];
            if (cat.nom.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(cat);
            }
        }

        this.categoriesfilter = filtered;
    }
}
