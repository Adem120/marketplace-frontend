import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListeOffreComponent } from './liste-offre/liste-offre.component';
import { AddoffreComponent } from './addoffre/addoffre.component';




@NgModule({
    imports: [RouterModule.forChild([
        { path: 'crud', loadChildren: () => import('./list-product/list-product.module').then(m => m.ListProductModule) }, 
        {path:'steps', loadChildren: () => import('./addproduct/steps.module').then(m => m.StepsModuleapp)}, 
        {path:'offre',component:ListeOffreComponent},
        {path:'ajouteroffre',component:AddoffreComponent},
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
