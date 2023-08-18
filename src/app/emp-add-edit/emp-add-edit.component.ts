import { Component,Inject,OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent implements OnInit {

  empForm: FormGroup;
  education: string[] = [
    'Matric',
    'Intermidiate',
    'Bachelor',
    'Master'
  ];

  constructor(
    private _fb: FormBuilder, 
    private _empSevice:EmployeeService, 
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService:CoreService

  ) {
    this.empForm=this._fb.group({
      firstName: "",
      lastName: "",
      email: "",
      dob:"",
      gender:"",
      education:""
    })
  }
  ngOnInit(): void {
    this.empForm.patchValue(this.data)
  }
  onFormSubmit(){
    if(this.empForm.valid){
      if(this.data){
        this._empSevice.updateEmployee(this.data.id, this.empForm.value).subscribe({
          next: (val : any) =>{
            this._coreService.openSnackBar('Employee updated!')
            this._dialogRef.close(true);
          },
          error:(err: any) => {
            console.error(err)
          }
        })

      }else {
        this._empSevice.addEmployee(this.empForm.value).subscribe({
          next: (val : any) =>{
            this._coreService.openSnackBar('Employee added successfully!')
            this._dialogRef.close(true);
          },
          error:(err: any) => {
            console.error(err)
          }
        })
      }
  }
}
}
