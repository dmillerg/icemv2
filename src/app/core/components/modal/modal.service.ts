import { DOCUMENT } from '@angular/common';
import {
  Injectable,
  ComponentFactoryResolver,
  Injector,
  Inject,
  TemplateRef,
  ComponentRef,
  Type,
  ApplicationRef,
  EmbeddedViewRef,
} from '@angular/core';
import { ModalComponent } from './modal.component';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalNotifier?: Subject<string>;

  private componentFactoryResolver: ComponentFactoryResolver;
  private appRef: ApplicationRef;
  private injector: Injector;
  private modalContainer: HTMLElement;

  constructor(
    private resolver: ComponentFactoryResolver,
    injector: Injector,
    @Inject(DOCUMENT) private document: Document,
    componentFactoryResolver: ComponentFactoryResolver,
    appRef: ApplicationRef
  ) {
    this.componentFactoryResolver = componentFactoryResolver;
    this.appRef = appRef;
    this.injector = injector;
    this.modalContainer = document.createElement('div');
    document.body.appendChild(this.modalContainer);
  }

  open(content: TemplateRef<any>, options?: { size?: string; title?: string }) {
    const modalComponentFactory =
      this.resolver.resolveComponentFactory(ModalComponent);
      console.log(typeof modalComponentFactory);
      
    const contentViewRef = content.createEmbeddedView(null);
    const modalComponent = modalComponentFactory.create(this.injector, [
      contentViewRef.rootNodes,
    ]);
    
    modalComponent.hostView.detectChanges();
    this.document.body.appendChild(modalComponent.location.nativeElement);
    modalComponent.hostView.detectChanges();

    this.document.body.appendChild(modalComponent.location.nativeElement);
    this.modalNotifier = new Subject();
    return this.modalNotifier?.asObservable();
  }

  closeModal() {
    this.modalNotifier?.complete();
  }

  submitModal() {
    this.modalNotifier?.next('confirm');
    this.closeModal();
  }

  openModal(component: Type<any>): ComponentRef<any> {
    const modalComponentFactory = this.componentFactoryResolver.resolveComponentFactory(ModalComponent);
    const compRef = modalComponentFactory.create(this.injector);
  
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    const componentRef = componentFactory.create(this.injector);
  
    // Añade el componente al DOM dentro del componente de modal
    const modalComponentInstance = compRef.instance;
    modalComponentInstance.addComponent(componentRef);
  
    this.appRef.attachView(compRef.hostView);
  
    this.modalContainer.appendChild((compRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement);
  
    return componentRef;
  }
}
