import { Routes } from '@angular/router';
import { InitialFormComponent } from './modules/initialForm/initial-form.component';
import { SeniorFormComponent } from './modules/seniorForm/senior-form.component';

export const routes: Routes = [
  { path: '', component: InitialFormComponent},
  { path: 'seniorForm', component: SeniorFormComponent}
];
