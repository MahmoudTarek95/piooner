import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NGXToastrService {

  constructor(private toastrService: ToastrService) { }

    // Success Type
    TypeSuccess() {
      this.toastrService.success('Your changes have been saved!');
    }

    // Info Type
    TypeInfo(message) {
      this.toastrService.info(message);
    }

    // // Warning Type
    TypeWarning(message) {
      this.toastrService.warning(message);
    }

    // Error Type
    TypeError() {
      this.toastrService.error('Internal Server Error');
    }

    TypeErrorDynamic(message) {
      this.toastrService.error(message);
    }

}
