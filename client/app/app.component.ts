import { Component } from '@angular/core';
import 'reflect-metadata';
import {ModalService} from './modal/modal.service.ts';

@Component({
  selector: 'my-app',
  template: require('./app.component.html'),
  styles: [require('./app.component.scss')],
  providers: [ModalService]
})
export class AppComponent { }
