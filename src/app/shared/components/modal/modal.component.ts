import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  closeResult = '';
  buttons = []
  template
  @Output() buttonId:EventEmitter<any> = new EventEmitter()

  constructor(public modalService: NgbModal) {}

  ngOnInit():void{}

  click(buttonId){
    this.buttonId.emit(buttonId)
    this.modalService.dismissAll()
  }
}
