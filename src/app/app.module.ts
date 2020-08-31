import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { EnrolleeService } from './core/enrollee.service';
import { CommonService } from './core/common.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
        ToastrModule.forRoot({
          timeOut:5000,
          positionClass:'toast-bottom-right'
        })
  ],
  providers: [EnrolleeService,CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
