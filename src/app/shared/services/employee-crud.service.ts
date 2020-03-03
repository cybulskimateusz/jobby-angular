import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { AuthService } from '../services/auth.service';
import { Employee } from '../models/employee.model';


@Injectable({
  providedIn: 'root'
})
export class EmployeeCrudService {

  employeeData: any;
  employeesCollection = this.afs.collection('employees');

  constructor(
    public afs: AngularFirestore,
    public authService: AuthService
  ) {
  }

  createOrUpdateEmployee(employee: Employee) {
    this.deleteEmployee();
    this.createEmployee(employee);
  }

  private createEmployee(employee: Employee) {
    return this.employeesCollection.add({ employee });
  }

  readEmployee() {
    return this.afs.collection('employees', ref => ref.where('employeeID', '==', this.authService.getUserData.uid));
  }

  deleteEmployee() {
    return this.readEmployee().doc().delete();
  }

}
