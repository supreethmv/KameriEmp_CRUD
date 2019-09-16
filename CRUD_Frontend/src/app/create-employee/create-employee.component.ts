import { Component, OnInit, ViewChild } from '@angular/core';
import { Department } from '../models/department.model';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../employee.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  departments: Department[] = [
    { id: 1, name: 'Help Desk' },
    { id: 2, name: 'HR' },
    { id: 3, name: 'IT' },
    { id: 4, name: 'Payroll' }
  ];
  previewPhoto = false;
  employee: Employee;
  constructor(private _employeeService: EmployeeService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.paramMap.subscribe(parameterMap => {
      const _id = parameterMap.get('_id');
      this.getEmployee(_id);
    });
  }
  getEmployee(_id: string) {
    if (_id === 'newEmployee') {
      this.employee = {
        _id: null,
        name: null,
        gender: null,
        contactPreference: null,
        phoneNumber: null,
        email: null,
        dateOfBirth: null,
        department: '-1',
        isActive: null,
        photoPath: null
      };
    }
    else{
      //this.employee=Object.assign({},this._employeeService.getEmployee(id));
      this._employeeService.getEmployee(_id).subscribe((data)=>this.employee=data);
    }
  }
  saveEmployee(): void {
    if(this.employee._id == null)
    {
    this._employeeService.addEmployee(this.employee).subscribe((data)=>{
      console.log(data);
      this._router.navigate(['list']);
    });
  }
  else{
    this._employeeService.updateEmployee(this.employee).subscribe(()=>{
      this._router.navigate(['list']);
    });
  }
  }
  togglePhotoPreview() {
    this.previewPhoto = !this.previewPhoto;
  }

}
