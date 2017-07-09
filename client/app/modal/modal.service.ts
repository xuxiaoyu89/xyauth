import {Injectable} from '@angular/core';

@Injectable()
export class ModalService {
    public modalData: Object = {};
    public currentComponent: any = null;
    private openFunction;
    public modalOpenState: boolean = false;
    setModalProperties(component, data) {
        console.log('xiaoyu - in setModalProperties: ', this.openFunction);
        this.modalData = data;
        this.currentComponent = component;
        this.modalOpenState = true;
        this.openFunction();
    }

    setOpenFunction(fn) {
        console.log('xiaoyu - in setOpenFunction, ', fn);
        this.openFunction = fn; 
    }
}
