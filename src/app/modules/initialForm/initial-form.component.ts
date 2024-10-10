import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';
import { SeniorityLevelEnum } from '../../shared/SeniorityLevelEnum';
import { CustomValidators } from '../../shared/validators';
import { DynamicFormService } from '../../services/dynamicForm.service';

@Component({
  selector: 'app-initial-form',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    CommonModule,
  ],
  templateUrl: './initial-form.component.html',
  styleUrl: './initial-form.component.scss',
})
export class InitialFormComponent implements OnInit {
  dynamicForm: FormGroup;
  seniorityEnum = SeniorityLevelEnum;

  isJunior: BehaviorSubject<boolean> = new BehaviorSubject(false);

  seniority = [
    { value: SeniorityLevelEnum.Junior, viewValue: 'Junior' },
    { value: SeniorityLevelEnum.Mid, viewValue: 'Mid' },
    { value: SeniorityLevelEnum.Senior, viewValue: 'Senior' },
  ];

  constructor(
    private fb: FormBuilder,
    private dynamicFormService: DynamicFormService,
    private router: Router
  ) {
    this.dynamicForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      surname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      isSearchWork: [true, Validators.required],
      seniorityLevel: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.dynamicForm.get('seniorityLevel')?.valueChanges.subscribe((value) => {
      this.onSelectChange(value);
    });
  }

  getSeniorityFormValue(): SeniorityLevelEnum {
    return this.dynamicForm.get('seniorityLevel')?.value;
  }

  onSelectChange(seniorityValue: any): void {
    this.dynamicForm.removeControl('juniorValidation');
    this.dynamicForm.removeControl('midValidation');

    if (seniorityValue === SeniorityLevelEnum.Junior) {
      this.dynamicForm.addControl(
        'juniorValidation',
        new FormControl('', [
          Validators.required,
          CustomValidators.isEqualFour(),
        ])
      );
    } else if (seniorityValue === SeniorityLevelEnum.Mid) {
      this.dynamicForm.addControl(
        'midValidation',
        new FormControl('', [
          Validators.required,
          CustomValidators.noALetterValidator(),
        ])
      );
    } else if (seniorityValue === SeniorityLevelEnum.Senior) {
      console.log(seniorityValue);
    }
  }

  onSubmit(): void {
    this.dynamicFormService.updateFormData(this.dynamicForm);
    this.router.navigateByUrl('seniorForm');
  }
}
