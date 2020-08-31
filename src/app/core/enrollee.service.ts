import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EnrolleeService {
   constructor(private http: HttpClient) { }

  getEnrollee():any {
          return this.http.get('enrollees');
      }
      updateEnrollee(enrolle):any {
          return this.http.put(`enrollees/${enrolle.id}`,enrolle);
      }
}
