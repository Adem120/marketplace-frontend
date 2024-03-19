import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';




@NgModule({
    imports: [RouterModule.forChild([
        { path: 'crud', loadChildren: () => import('./crud/crud.module').then(m => m.CrudModule) }, 
        {path:'steps', loadChildren: () => import('./demo/steps.module').then(m => m.StepsModuleapp)}, 
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
