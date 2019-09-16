import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/employee.service';


@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent implements OnInit {

  @Input() employee:Employee;
  @Output() deleteId = new EventEmitter<string>();

  constructor(private _router: Router, private _route:ActivatedRoute, private _employeeService:EmployeeService) { }

  ngOnInit() {
  }

  editEmployee(){
    this._router.navigate(['/edit',this.employee._id]);
  }

  deleteEmployee(){
    this._employeeService.deleteEmployee(this.employee._id).subscribe(()=>{
      console.log(`Employee with ID = ${this.employee._id} deleted`);
      this.deleteId.emit(this.employee._id);
    });
  }
}