import {Component, ElementRef, Input, Inject, ViewChild, ViewContainerRef} from '@angular/core';
import {ModalService} from './modal.service.ts';
import {DOCUMENT} from '@angular/platform-browser';

@Component({
  selector: 'modal',
  template: require('./modal.component.html'),
  styles: [require('./modal.component.scss')]
})
export class ModalComponent {
  @ViewChild('content', {read: ViewContainerRef}) content: ViewContainerRef;

  constructor(
    private elementRef: ElementRef,
    private modal: ModalService,
    private viewContainer: ViewContainerRef
  ) {

    console.log('xiaoyu - in ModalComponent constructor - 1: ', this.modal);
    this.modal.setOpenFunction(() => {
      /*
      this.modal.currentComponent = this.modal.modalData['component'];
      this.open(this.modal.modalData['component'], this.modal.modalData['data'], this.modal.injector);
      */
      console.log('xiaoyu - in ModalComponent constructor: ', this.modal);

      this.open(this.modal.currentComponent, null, null);
    });
  }

  isModalOpen() {
    if (this.modal.modalOpenState && this.modal.currentComponent === null) {
      open();
    }
    return this.modal.modalOpenState;
  }

  setContentHeight() {
    console.log("content size changed");
  }

  open(component, data, injector): void {
    this.content.createComponent(component, undefined, injector);

    // hide overflow on page once modal is open
    /*let classList = this.document.getElementsByTagName('body')[0].classList;
    classList.add(this.OVERFLOW_CLASS);

    each( keys(data), (key) => {
      resolverRef.instance[key] = data[key];
    });
    resolverRef.instance['closeModal'] = this.close.bind(this);
    resolverRef.instance['closeOverride'] = this.closeOverride.bind(this);*/
  }
}