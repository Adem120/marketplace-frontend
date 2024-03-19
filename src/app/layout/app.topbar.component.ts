import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    styles: [`
    .badge {
    position: absolute;
    top: 12px;
    right: 50px;
    background-color: red;
    color: white;
    border-radius: 50%;
    padding: 5px;
    font-size: 7px;
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
