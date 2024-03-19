    import { NgModule } from '@angular/core';
    import { RouterModule } from '@angular/router';
    import { StepsRoutingDemo } from './steps-routing-demo';
    import { SeatDemo } from './seatdemo';
    import { PersonalDemo } from './personaldemo';
    import { PaymentDemo } from './paymentdemo';
    import { ConfirmationDemo } from './confirmationdemo';

    @NgModule({
        imports: [RouterModule.forChild([
            { path: '', component: StepsRoutingDemo,
            children: [
                { path: 'personal', component: PersonalDemo },
                { path: 'seat', component: SeatDemo },
                { path: 'payment', component: PaymentDemo },
                { path: 'confirmation', component: ConfirmationDemo },
                { path: '', redirectTo: 'personal', pathMatch: 'full' },
            ]
        }
        ])],
        exports: [RouterModule]
    })
    export class DemoRoutingModule { }
