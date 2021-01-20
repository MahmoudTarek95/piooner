import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormService } from 'app/shared/services/form.service';
import { ModalService } from 'app/shared/services/modal.service';
import { NGXToastrService } from 'app/shared/services/toastr.service';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit,OnDestroy {
  loadingIndicator
  sliderList
  columns
  subscription:Subscription

  constructor(private formService:FormService, private toasterService:NGXToastrService, private cd:ChangeDetectorRef,private modalService:ModalService) {
    this.columns = [
      {
        name:'Title',
        prop:'title',
        width:150
      },
      {
        name:'Subtitle',
        prop:'subTitle',
        width:150
      },
    ]
  }

  ngOnInit(): void {
    this.getSliderList()
  }

  deleteRow(id){
    this.formService.post('Slider/DeleteSlider/' + id, {}).subscribe(res => {
      this.getSliderList()
      this.toasterService.TypeSuccess()
    },(error) => {
      this.toasterService.TypeError()
    })
  }

  getSliderList(){
    this.subscription = this.formService.get('Slider/ListSliders').subscribe((res:any) => {
      this.sliderList = res.data
      this.cd.markForCheck()
      console.log(this.sliderList)
    })
  }
  openModal(id){
    const buttons = [
      {
        id:1,
        name:'Delete',
        class:'btn-danger'
      },
      {
        id:2,
        name:'Cancel',
        class:'btn-primary'
      }
    ]
    this.modalService.open(buttons)
    this.modalService.btnId.pipe(first()).subscribe(btnId => {
      if(btnId == 1){
        this.deleteRow(id)
      }else{
        this.modalService.dismissModal()
      }
    })
  }
  ngOnDestroy(){
    this.subscription.unsubscribe()
  }


}
