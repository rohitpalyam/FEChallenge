
import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {EnrolleeService } from './core/enrollee.service'
import { CommonService } from './core/common.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  message: string;
  timeStamp: string;
  enrollesDetails:any[]=[];
  selectedEnrolle:any;
  enrolleeInfoForm: FormGroup;
  editIndex:any;
  submitted = false;
  constructor(private enrolleeService: EnrolleeService,private commonService: CommonService,private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.initEnrolleEditFormBuilder();
    this.getEnrollees();

  }
  get f() { return this.enrolleeInfoForm.controls; }

  editEnrolle(enroller, index){
    this.editIndex=index;
    this.selectedEnrolle=enroller;
    console.log(index);
    console.log(enroller);
    this.enrolleeInfoForm.setValue({
      id:enroller.id,
      name:enroller.name,
      status:enroller.active,
    });
    setTimeout(function() {
      window.scrollTo(0,document.body.scrollHeight);
    }, 100);

    
  }
  enrollerStatusChange(objenroller, index){
    objenroller.active=! objenroller.active;
    this.enrolleeService.updateEnrollee(objenroller).subscribe((result) => {
      debugger;
      if(this.editIndex!=undefined)
      this.enrollesDetails[this.editIndex]= objenroller;
      let message=objenroller.active?'Enroller Status Actived Sucessfully.':'Enroller Status deactivated successfully.';
      this.commonService.SuccessMessage(message);
    });
  }

  onReset(){
    this.selectedEnrolle=undefined;
    this.editIndex=undefined;
    this.submitted = false;
    this.enrolleeInfoForm.reset();

  }
  updateEnroller(){
    this.submitted = true;
    if(this.enrolleeInfoForm.invalid){
      return;
    }
    let objEnrolle:any=this.selectedEnrolle;
    objEnrolle.name=this.enrolleeInfoForm.value.name;
    objEnrolle.active=this.enrolleeInfoForm.value.status;
    this.enrolleeService.updateEnrollee(objEnrolle).subscribe((result) => {
      if(this.editIndex!=undefined)
      this.enrollesDetails[this.editIndex]= result;
      let message='Enroller Updated Sucessfully.';
      this.commonService.SuccessMessage(message);
      this.selectedEnrolle=undefined;
      this.editIndex=undefined;
    });
  }

  initEnrolleEditFormBuilder():any{
    this.enrolleeInfoForm=this.formBuilder.group({
      id:[{value:'',disable:true},Validators.required],
      name:[{value:''},Validators.required],
      status:[false,Validators.required],
    });
  }

  getEnrollees(){
    this.enrolleeService.getEnrollee().subscribe((result) => {
      this.enrollesDetails = result;
    });
  }
}
