import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { ModalComponent } from '../components/modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  btnId = new Subject<number>();

  constructor(private modal:NgbModal) { }

  open(buttons){
    const modalRef = this.modal.open(ModalComponent,{
      scrollable: true,
      centered:true
    });
    modalRef.componentInstance.buttons = buttons
    modalRef.componentInstance.buttonId.subscribe(value => {
      this.btnId.next(value)
    })
  }
  dismissModal(){
    this.modal.dismissAll()
  }
}
