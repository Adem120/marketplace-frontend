import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    styles: [`
    .badge {
    position: absolute;
    top: 0px;
    left:28px;
    color: white;
    border-radius: 60%;
    font-size:1.5rem;
    width:15px;

    background-color:red;
}
`]
})
export class AppTopBarComponent implements OnInit{

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService) { }
    visible: boolean = false;

  ngOnInit() {
 this.visible = false;
 console.log(this.visible);

  }

    showDialog() {
 
        this.visible = !this.visible;
    }
    
     
}
