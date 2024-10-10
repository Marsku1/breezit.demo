import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DynamicFormService } from '../../services/dynamicForm.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';

@Component({
  selector: 'app-senior-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    CommonModule,
  ],
  templateUrl: './senior-form.component.html',
  styleUrl: './senior-form.component.scss',
})
export class SeniorFormComponent implements OnInit {
  isLookingForJob: boolean = true;
  submittedData!: string;

  formData!: FormGroup;

  constructor(
    private dynamicFormService: DynamicFormService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dynamicFormService.formData$.subscribe((value) => {
      if (value) {
        this.formData = value;
        if (!this.formData.get('isSearchWork')?.value) {
          this.formData.addControl(
            'seniorValidation',
            new FormControl('', [
              Validators.required,
              Validators.minLength(140),
            ])
          );
        }
      } else this.router.navigateByUrl('');
    });
  }

  onSubmit(): void {
    this.submittedData = JSON.stringify(this.formData.value);
  }
}
