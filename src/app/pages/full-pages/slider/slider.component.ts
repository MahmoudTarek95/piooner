import { Component, OnInit } from '@angular/core';
import { FormService } from 'app/shared/services/form.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  loadingIndicator
  sliderList
  columns

  constructor(private formService:FormService) {
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
    })
  }

  getSliderList(){
    this.formService.get('Slider/ListSliders').subscribe((res:any) => {
      this.sliderList = res.data
      console.log(this.sliderList)
    })
  }

}
