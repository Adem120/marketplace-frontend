import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';



@NgModule({
    imports: [RouterModule.forChild([
        { path: 'crud', loadChildren: () => import('./crud/crud.module').then(m => m.CrudModule), 
     
    },

       
                { path: '', redirectTo: 'personal', pathMatch: 'full' },
       
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
