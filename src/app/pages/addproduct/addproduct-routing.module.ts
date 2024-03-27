    import { NgModule } from '@angular/core';
    import { RouterModule } from '@angular/router';
    import { StepsRoutingDemo } from './steps-routing-demo';
    import { Produitsteps2 } from './produitstep2';
    import { Images } from './images';
    import { ConfirmationDemo } from './confirmationdemo';
import { Produitstep1 } from './produitstep1';

    @NgModule({
        imports: [RouterModule.forChild([
            { path: '', component: StepsRoutingDemo,
            children: [
                { path: 'step1', component: Produitstep1 },
                { path: 'step2', component: Produitsteps2 },
                { path: 'image', component: Images },
                { path: 'confirmation', component: ConfirmationDemo },
                { path: '', redirectTo: 'step1', pathMatch: 'full' },
            ]
        }
        ])],
        exports: [RouterModule]
    })
    export class AddproductRoutingModule { }
