import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { DatePipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private toastr: ToastrService, private http: HttpClient) {  }


  SuccessMessage(message): any {
    this.toastr.success(message);
  }
  FailureMessage(message): any {
    this.toastr.error(message);

  }
  WarningMessage(message): any {
    this.toastr.warning(message);
  }

}
