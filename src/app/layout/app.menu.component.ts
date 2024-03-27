import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/formlayout'] },
                ]
            },
            {
                label: 'UI Components',
                items: [
                    { label: 'Product', icon: 'pi pi-fw pi-id-card', routerLink: ['/pages/crud'] },
                    { label: 'commande', icon: 'pi pi-fw pi-shopping-cart', routerLink: ['/pages/steps'] },
                    { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/floatlabel'] },
                    { label: 'offre', icon: 'pi pi-fw pi-percentage', routerLink: ['/pages/offre'] },
                    
                ]
            },
            
            {
                label: 'Pages',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                   
                    {
                        label: 'Auth',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Login',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: 'Error',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/auth/error']
                            },
                            {
                                label: 'Access Denied',
                                icon: 'pi pi-fw pi-lock',
                                routerLink: ['/auth/access']
                            }
                        ]
                    },
                   
                ]
            },
          
           
        ];
    }
}
