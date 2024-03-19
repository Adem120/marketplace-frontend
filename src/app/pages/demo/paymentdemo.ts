import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../service/ticketservice';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FileUpload, FileUploadEvent } from 'primeng/fileupload';

@Component({
    template: `
     <p-card>
    <p-galleria [value]="images" [(visible)]="displayBasic" [responsiveOptions]="responsiveOptions" [containerStyle]="{'max-width': '50%'}" [numVisible]="1" [circular]="true" [fullScreen]="true" [showItemNavigators]="true">
        <ng-template pTemplate="item" let-item>
            <img [src]="item.url" style="width: 100%; display: block;"/>
        </ng-template>
        <ng-template pTemplate="thumbnail" let-item>
            <div class="grid grid-nogutter justify-content-center " style="max-width: 100px;  max-height: 100px;">
                <img [src]="item.url" style="display: block; max-width: 150px;  max-height: 100px;"/>
            </div>
        </ng-template>
    </p-galleria>
    
    <button class="left-10"*ngIf="images.length>0" class="mb-2" pButton type="button" icon="pi pi-external-link" label="images" (click)="displayBasic = true"></button>
    
    <p-fileUpload [previewWidth]="150"[showUploadButton]="false" (onSelect)="onFileSelect($event)" (onRemove)="onRemove($event)"  [multiple]="true" accept="image/*" [maxFileSize]="1000000"></p-fileUpload>

    <ng-template pTemplate="footer">
        <div class="grid grid-nogutter justify-content-between">
            <p-button label="Back" (onClick)="prevPage()" icon="pi pi-angle-left"></p-button>
            <p-button label="Next" (onClick)="nextPage()" icon="pi pi-angle-right" iconPos="right"></p-button>
        </div>
    </ng-template>
<p-card>



    `,
     providers: [MessageService]
})
export class PaymentDemo implements OnInit {
    uploadedFiles: any[] = [];
    displayBasic!: boolean ;

    images: ImageFile[] = [];

    responsiveOptions: any[] = [
        {
            breakpoint: '1500px',
            numVisible: 5
        },
        {
            breakpoint: '1024px',
            numVisible: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];
    constructor(private messageService: MessageService,private router:Router) {}

    onUpload(event:FileUploadEvent) {
        for(let file of event.files) {
            this.uploadedFiles.push(file);
        }

        this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
    }
    
  onFileSelect(event: any) {
    for (let file of event.files) {
      const image: ImageFile = {
        name: file.name,
        size: file.size,
        url: URL.createObjectURL(file)
      };
this.images.push(image) 
       
    }}
    onRemove(event: any) {
        this.images = this.images.filter((image) => image.name !== event.file.name);
    }

    ngOnInit(): void {
        
 
    }
    nextPage() {
        this.router.navigate(['pages/steps/confirmation']);
    }

    prevPage() {
        this.router.navigate(['pages/steps/confirmation']);
    }
}
interface ImageFile {
    name: string;
    size: number;
    url?: any; // If you have a URL for the image
  }