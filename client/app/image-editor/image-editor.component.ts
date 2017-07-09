import {Component} from '@angular/core';
import { ModalService } from '../modal/modal.service.ts';


@Component({
  selector: 'image-editor',
  template: require('./image-editor.component.html'),
  styles: [require('./image-editor.component.scss')],
  providers: [ModalService]
})

export class ImageEditorComponent {
  constructor () {}
}