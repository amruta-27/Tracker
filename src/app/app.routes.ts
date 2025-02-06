import { Routes } from '@angular/router';
import { WorkoutFormComponent } from './workout-form/workout-form.component';
import { WorkoutListComponent } from './workout-list/workout-list.component';
import { HomeComponent } from './home/home.component';
export const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' }, 
    { path: 'home', component: HomeComponent },
  { path: 'Workout-list', component: WorkoutListComponent },
  { path: 'Workout-form', component: WorkoutFormComponent }
];
