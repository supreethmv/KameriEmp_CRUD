import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/employee.service';
import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  employee: Employee;
  employees: Employee[];
  _id:string;
  _count:number;
  _currentIndex:number;

  constructor(private _route: ActivatedRoute, 
    private _employeeService: EmployeeService,
    private _router: Router) { }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this._id = params['_id'];
      //this.employee = this._employeeService.getEmployee(this._id);
      this._employeeService.getEmployee(this._id).subscribe((data)=>this.employee=data);
      this._employeeService.getEmployees().subscribe((data)=>{                              //This is inefficient
        this.employees=data;
        this._count=this.employees.length;
        //for (let emp in this.employees){
        //  if(this._id===this.employees[emp]._id){
        //    this._currentIndex=this._id;
        //    break;
        //  }
        //}
        for (var _index = 0; _index < this._count; _index++) {
          if(this._id===this.employees[_index]._id){
            this._currentIndex=_index;
            break;
          }
        }
        console.log(this._id);
      });
    });
  }

  getNextEmployee() {
    this._currentIndex = this._currentIndex + 1;
    if (this._currentIndex === this._count){
      this._currentIndex = 0;
    }
    this._router.navigate(['/employees', this.employees[this._currentIndex]._id]);
  }
}