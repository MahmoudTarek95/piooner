import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormService } from 'app/shared/services/form.service';
import { NGXToastrService } from 'app/shared/services/toastr.service';
import { Subscription } from 'rxjs';

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

  constructor(private formService:FormService, private toasterService:NGXToastrService, private cd:ChangeDetectorRef) {
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
  ngOnDestroy(){
    this.subscription.unsubscribe()
  }


}
