import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DynamicFormService {

  private formData = new BehaviorSubject<any>(null);
  formData$ = this.formData.asObservable();

  updateFormData(data: any) {
    this.formData.next(data);
  }

}
