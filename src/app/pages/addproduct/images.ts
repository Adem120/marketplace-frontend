import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TicketService } from '../../service/ticketservice';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FileUpload, FileUploadEvent } from 'primeng/fileupload';
import { Product } from 'src/app/model/product/product.module';
import { Photo } from 'src/app/model/product/image.module';
@Component({
    styles: [`
 
.image-container {
    position: relative; 
}

.delete-button {
    position: absolute;
    bottom: 5px; 
    right: 5px; 
    padding: 0;
    background: none;
    border: none;
    cursor: pointer;
    opacity: 0; 
    transition: opacity 0.3s ease; 
}
.principale-button {
    position: absolute;
    bottom: 5px; 
    left: 8px; 
    padding: 0;
    background: none;
    border: none;
    cursor: pointer;
    opacity: 0; 
    transition: opacity 0.3s ease; 
}


.image-container:hover .principale-button {
    opacity: 1;
}
.image-container:hover .delete-button {
    opacity: 1;
}
`],
    template: `
     <div class="stepsdemo-content">
        <p-card>
   <ng-container >
    <p-galleria [value]="selectedFiles" [(visible)]="displayBasic" [responsiveOptions]="responsiveOptions" [containerStyle]="{'max-width': '50%'}" [numVisible]="1" [circular]="true" [fullScreen]="true" [showItemNavigators]="true">
        <ng-template pTemplate="item" let-item>
            <img [src]="item.path" style="width: 100%; display: block;"/>
        </ng-template>
        <ng-template pTemplate="thumbnail" let-item>
            <div class="grid grid-nogutter justify-content-center" >
                <img [src]="item.path" style="display: block; max-width: 150px;  max-height: 100px; "/>
            </div>
        </ng-template>
    </p-galleria>
    
    
                                     <section class="w-1/2 mx-auto border-dashed border-2 border-gray-300 rounded-lg p-8 text-center"
                                        (dragover)="onDragOver($event)"
                                        (dragleave)="onDragLeave($event)"
                                        (drop)="onDrop($event)">
                                            <header>
                                                 <p>
                                                    <span>Drag and drop your</span>&nbsp;<span>files anywhere or</span>
                                                </p>
                                                <input #fileInput (change)="onFileSelected($event)" id="hidden-input" type="file" accept=".png, .jpg, .jpeg" multiple class="hidden" />

                                                <a (click)="openFileExplorer()" id="button"
                                                    >
                                                    Upload a file
                                                </a>
                                            </header>
                                        </section>

                                <div class=" mb-4 mt-3">
                                <div  class="flex flex-wrap ">
                                    <div class="ml-3">
                                        <h1 class="text-xm ">
                                            Images
                                            </h1>
                                           </div>
                                           <div class="ml-3 mt-2">
                                            <button *ngIf="selectedFiles.length>0" class="w-1/2"  pButton type="button" icon="pi pi-external-link" (click)="displayBasic = true"></button>
                                        </div>   
                                        </div>
                                         

                                            <p  [ngClass]="{'text-red-500': nbphoto, 'text-blue-500': !nbphoto}">
                                                * au moin 3 photos
                                            </p>
                                            <p class="text-xm" [ngClass]="{'text-red-500': principale, 'text-blue-500': !principale}">
                                                 *selectionner la photo principale 
                                                 </p>
                                            <div class="flex flex-wrap">

    <div *ngFor="let selectedFile of selectedFiles; let i = index" class="image-container w-3 mb-2 mx-3" style="min-width: 100px; min-height: 75px">
        <img [src]="selectedFile.path" alt="upload preview" class="img-preview w-full h-full sticky object-cover rounded-md bg-fixed mx-3" />


        <button class="delete-button" (click)="deleteImage(i)">
            <i class="pi pi-trash"  style="color: red;font-size: 1.5rem"></i>
        </button>
        <button class="principale-button" (click)="principaleimage(i)" >
            <i class="pi pi-check"  style="color: blue;font-size: 1.5rem"></i>
        </button>
    </div>
</div>
</div>

 
        <div class="grid grid-nogutter justify-content-between mt-2">
            <p-button label="Back" (onClick)="prevPage()" icon="pi pi-angle-left"></p-button>
            <p-button label="Next" (onClick)="nextPage()" icon="pi pi-angle-right" iconPos="right"></p-button>
        </div>
   

   </ng-container>
</p-card>
</div>

    `,
     providers: [MessageService]
})
export class Images implements OnInit {
    displayBasic!: boolean;

    isDragging = false;
    photo:Photo=new Photo();
    @ViewChild('fileInput') fileInput!: ElementRef;
    Produit:Product=new Product();
    principale!:boolean;
    nbphoto:boolean=false;
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
    selectedFiles : any[] = [];
    images :any[]=[];

    img!: any;
    constructor(private messageService: MessageService,private router:Router,public ticketService: TicketService ) {}
    ngOnInit(): void {
        this.Produit=this.ticketService.getProduitInformation();
        if(this.Produit.images){
           this.Produit.images.forEach(element => {
                       console.log(element.path)
                    let photo=   this.base64toFile(element.path,element.nom!,element.type)
                       
                    this.generateFileUrl(photo).then((url: string) => {
                        console.log(url)
                    })
                       this.images.push(photo)
                       console.log(this.images)

                     
                       let url1= 'data:image/png;base64,'+element.path
                   
                        this.selectedFiles.push({ nom: element.nom, path:url1,principale:element.principale }); 
                       
                        console.log(this.selectedFiles)
              }); 
       
                       
         
            
            
            

                
        }
        
       
        
    }
    base64toFile(base64String: any, filename: string, mimeType: string): any | null {
      // Convert the Base64 string to a Blob
      const byteCharacters = atob(base64String);
      const byteArrays = [];
      for (let offset = 0; offset < byteCharacters.length; offset += 512) {
          const slice = byteCharacters.slice(offset, offset + 512);
          const byteNumbers = new Array(slice.length);
          for (let i = 0; i < slice.length; i++) {
              byteNumbers[i] = slice.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
      }
      const blob = new Blob(byteArrays, { type: mimeType });
  
      // Create a File object from the Blob
      try {
          const file = new File([blob], filename, { type: mimeType });
          return file;
      } catch (e) {
          console.error("Error creating File object:", e);
          return null;
      }
  }
  
  
  
    openFileExplorer(): void {
        // Trigger the file input click event to open the file explorer
        this.fileInput.nativeElement.click();
      }
    onFileSelected(event: any): void {
        const selectedFile: FileList = event.target.files;
        
        for (let i = 0; i < selectedFile.length; i++) {

          const file: File = selectedFile[i];
          if(this.selectedFiles.length>1){
            this.nbphoto=false;
          }
        
          this.generateFileUrl(file).then((url: string) => {
            console.log(url)
            this.selectedFiles.push({ nom: file.name, path:url,principale:0 });
            let  photo:File = new File([file],file.name,{type:file.type})
            this.images.push(photo);
            console.log(this.images)
          
          });
        }
      }
      
      
      
      
      generateFileUrl(file: any): Promise<string> {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
      
      
          reader.onload = () => {
            resolve(reader.result as string);
          };
      
          reader.onerror = (error) => {
            reject(error);
          };
      
          reader.readAsDataURL(file);
        });
      }
      onDragOver(event: DragEvent): void {
        event.preventDefault();
        this.isDragging = true;
      }
      
      onDragLeave(event: DragEvent): void {
        event.preventDefault();
        this.isDragging = false;
      }
      
      onDrop(event: DragEvent): void {
        event.preventDefault();
        this.isDragging = false;
      
        const files = event.dataTransfer?.files;
        if (files) {
          this.handleSelectedFiles(files);
        }
      }
      private handleSelectedFiles(files: FileList): void {
        for (let i = 0; i < files.length; i++) {
          const file: File = files[i];
      if(this.selectedFiles.length>2){
            this.nbphoto=false;
      }
          this.generateFileUrl(file).then((url: string) => {
            this.selectedFiles.push({ nom: file.name, path:url,principale:0 });
            let  photo:File = new File([file],file.name,{type:file.type})
            this.images.push(photo)
           
            
          });
        }
      }
      
      deleteImage(index: number): void {
        this.selectedFiles.splice(index, 1);
        this.images.splice(index,1)
        if(this.selectedFiles.length<3){
            this.nbphoto=true;
        }
      }
      principaleimage(index: number): void {
        this.principale=false;
        this.selectedFiles.forEach(element => {
            element.principale=0;
        });
        this.selectedFiles[index].principale=1;
        
      }
   
    nextPage() {
        this.nbphoto=false;
        if(this.selectedFiles.length<3){
            this.nbphoto=true;
           
        }
        if(this.Produit.id==null){
        this.principale=true;
       
        this.selectedFiles.forEach(element => {
          
            if(element.principale==1){
                this.principale=false;
                
                
            }
            });}
        if(this.selectedFiles.length>2 && !this.principale && this.nbphoto==false){
            const formData = new FormData();
            for (let file of this.images) {
              console.log(file) 
             formData.append('image[]', file);
            }
            let nameimage:string=''
              this.selectedFiles.forEach(element => {
          
                if(element.principale==1){
                    nameimage=element.nom;
                    
                    
                }})
              formData.append('principale',nameimage)
            
            this.ticketService.setFormData(formData);
            this.Produit.images=this.selectedFiles;

            this.ticketService.setProduitInformation(this.Produit);
            this.router.navigate(['pages/steps/confirmation']);
         
            return;
        } 
    }
    prevPage() {
        this.router.navigate(['pages/steps/step2']);
    }
    }