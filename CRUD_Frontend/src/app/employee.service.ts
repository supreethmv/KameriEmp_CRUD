import { Injectable } from '@angular/core';
import { Employee } from './models/employee.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  listEmployess = new BehaviorSubject<Employee[]>([]);
  //([
  //  {
  //    id: 1,
  //    name: 'Supreeth',
  //    gender: 'Male',
  //    contactPreference: 'Email',
  //    email: 'mark@gmail.com',
  //    dateOfBirth: new Date('10/25/1995'),
  //    department: '3',
  //    isActive: true,
  //    photoPath: 'assets/images/emp1.png'
  //  },
  //  {
  //    id: 2,
  //    name: 'Thinh',
  //    gender: 'Male',
  //    contactPreference: 'Phone',
  //    phoneNumber: 2345978640,
  //    dateOfBirth: new Date('11/20/1990'),
  //    department: '2',
  //    isActive: false,
  //    photoPath: 'assets/images/emp2.png'
  //  },
  //  {
  //    id: 3,
  //    name: 'Mathias',
  //    gender: 'Male',
  //    contactPreference: 'Phone',
  //    phoneNumber: 5432978640,
  //    dateOfBirth: new Date('3/25/1990'),
  //    department: '3',
  //    isActive: true,
  //    photoPath: 'assets/images/emp3.png'
  //  },
  //]);

  cast = this.listEmployess.asObservable();
  baseUrl = 'http://localhost:3000/employees';

  constructor(private httpclient:HttpClient) {
    //this.httpclient.get<Employee[]>("../assets/raw_data/emps.json").subscribe((data)=>{this.listEmployess.next(data)});
    //this.httpclient.get<Employee[]>('http://localhost:3000/employees').subscribe((data)=>{this.listEmployess.next(data)});
  }

  //getEmployee(id: number): Employee {
  //  return this.listEmployess.value.find(e => e.id === id);
  //}

  getEmployee(_id: string): Observable<Employee> {
    return this.httpclient.get<Employee>(`${this.baseUrl}/${_id}`)
  }

  getEmployees(): Observable<Employee[]>{
    return this.httpclient.get<Employee[]>(this.baseUrl);
  }

  //save(employee: Employee): Observable<Employee> {
  //  if (employee.id === null) {
  //    //const maxid = this.listEmployess.value.reduce(function(e1,e2){
  //    //  return (e1.id > e2.id)? e1 : e2;
  //    //}).id;
  //    //employee.id=maxid + 1;
  //    //this.listEmployess.value.push(employee);
  //    return this.httpclient.post<Employee>(this.baseUrl,employee,{
  //      headers: new HttpHeaders({
  //        'Content-Type':'application/json'
  //      })
  //    })
  //  }
  //  else{
  //    //const foundIndex= this.listEmployess.value.findIndex(e=>e.id===employee.id);
  //    //this.listEmployess.value[foundIndex]=employee;
  //    return this.httpclient.put<Employee>(`${this.baseUrl}/${employee.id}`,employee,{
  //      headers: new HttpHeaders({
  //        'Content-Type' : 'application/json'
  //      })
  //    })
  //  }
  //}

  addEmployee(employee: Employee): Observable<Employee> {
    return this.httpclient.post<Employee>(this.baseUrl,employee,{
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    })
  }

  updateEmployee(employee: Employee): Observable<any> {
  return this.httpclient.put<any>(`${this.baseUrl}/${employee._id}`,employee,{
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  })
}
  deleteEmployee(_id:string): Observable<void> {
  //  const i=this.listEmployess.value.findIndex(e=>e.id===id)
  //  if( i!==-1)
  //  this.listEmployess.value.splice(i,1);
  return this.httpclient.delete<void>(`${this.baseUrl}/${_id}`);
  }
}
