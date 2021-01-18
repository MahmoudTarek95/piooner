import { Injectable } from "@angular/core";
import { interval } from "rxjs";
import { FormService } from "./form.service";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  constructor(private formService: FormService) {
    this.formService.get("Home/ListContactUsForm").subscribe((res: any) => {
      console.log();
      localStorage.setItem("contact", JSON.stringify(res.data.slice(0, 5)));
      localStorage.setItem("isMatched", "true");
    });
  }

  sendNotification() {
    interval( 10000).subscribe((res) => {
      this.formService.get("Home/ListContactUsForm").subscribe((res: any) => {
        let savedList = JSON.parse(localStorage.getItem("contact"));
        let firstFive = res.data.slice(0, 5);
        if (savedList[0]?.id == firstFive[0]?.id) {
        } else {
          localStorage.setItem("contact", JSON.stringify(firstFive));
          localStorage.setItem("isMatched", "false");
        }
      });
    });
    // this.formService.get('Home/ListContactUsForm')
  }
}
