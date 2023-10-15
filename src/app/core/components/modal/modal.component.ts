import { Component, ComponentRef,ViewChild,ViewContainerRef,OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, AfterViewInit{
  componentRef?: ComponentRef<any>;
 @ViewChild('componentContainer', { read: ViewContainerRef }) componentContainer!: ViewContainerRef;

 ngOnInit(): void {
  console.log(this.componentContainer);
  
   
 }

 ngAfterViewInit(): void {
  setTimeout(()=>{
    this.vv();

  },50)
 }

 vv(){
  console.log(this.componentContainer);
  this.componentContainer.insert(this.componentRef!.hostView);
  
 }

  addComponent(componentRef: ComponentRef<any>): void {
    this.componentRef = componentRef;
  }
}
