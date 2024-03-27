import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListProductRoutingModule } from './list-product-routing.module';
import {  ListProductComponent } from './list-product.component';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { AutoComplete, AutoCompleteModule } from 'primeng/autocomplete';
import { StepsModule } from 'primeng/steps';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TicketService } from 'src/app/service/ticketservice';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
@NgModule({
    imports: [
        CommonModule,
        ListProductRoutingModule,
        TableModule,
        FileUploadModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        InputTextareaModule,
        DropdownModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        AutoCompleteModule,
        StepsModule,
        ProgressSpinnerModule,
        CardModule,
        TagModule
    ],
    declarations: [ListProductComponent],
    providers: [TicketService],
    exports: [],


})
export class ListProductModule { }
