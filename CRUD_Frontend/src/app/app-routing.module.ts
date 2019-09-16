import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListEmployeesComponent } from './list-employees/list-employees.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { EmployeeDetailsComponent } from './list-employees/employee-details/employee-details.component';


const routes: Routes = [
  { path: 'list', component: ListEmployeesComponent },
  { path: 'edit/:_id', component: CreateEmployeeComponent },
  { path: 'employees/:_id', component: EmployeeDetailsComponent},
  { path: '', redirectTo: '/list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
