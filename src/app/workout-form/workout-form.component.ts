import { Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataService } from '../data.service';

@Component({
  selector: 'app-workout-form',
  standalone: true,
  imports: [FormsModule, CommonModule,],
  templateUrl: './workout-form.component.html',
  styleUrl: './workout-form.component.css'
})
export class WorkoutFormComponent {

  constructor(private dataService: DataService){}

  userName: string = '';
  workoutType: string = '';
  workoutMinutes: number = 0;
  workoutTypes: string[] = ['Running', 'Yoga', 'Gym', 'Cycling','Cardio','Boxing','Upper body','Pilates'];
  selectedWorkouts: { [key: string]: boolean } = {};
  minutes: { [key: string] :number} = {};


  
  addWorkout() {

    const selectedWorkoutTypes = Object.keys(this.selectedWorkouts)
    .filter(type => this.selectedWorkouts[type]) 
    .map(type => ({
      type, 
      minutes: this.minutes[type] || 10
    }));

    if (!this.userName || selectedWorkoutTypes.length === 0 || selectedWorkoutTypes.some(workout => !workout.minutes || workout.minutes <= 10)) {
      alert('please fill all fields and select at least one workout type with minutes greater than 0');
    return;
    }

    const totalMinutes = selectedWorkoutTypes.reduce((sum, workout) => sum + workout.minutes, 0);



    const newWorkout = {
      id: this.generateUniqueId(),
      userName: this.userName,
      workoutType: selectedWorkoutTypes,
      workoutMinutes: totalMinutes
    };
    let x=console.log("passed newworkout");

    console.log('User Name:', this.userName);
    console.log('Workout Type:', selectedWorkoutTypes);
    console.log('Workout Minutes:', totalMinutes);


    this.dataService.saveWorkout(newWorkout);
    alert("Workout added Successfully!!!");

    this.userName = '';
    this.workoutMinutes = 0;
    this.selectedWorkouts = {};
    this.minutes = {};

  }

  generateUniqueId(): string {
    return new Date().getTime().toString();
  }

}
