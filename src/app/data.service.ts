import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }
  

  saveWorkout(workout:any){
    if (isPlatformBrowser(this.platformId)) {
    let workouts = this.getworkouts();
    workouts.push(workout);
    localStorage.setItem('workouts', JSON.stringify(workouts));
  }
}
getworkouts() {
  if (isPlatformBrowser(this.platformId)) {
    const storedWorkouts = JSON.parse(localStorage.getItem('workouts') || '[]');

    return storedWorkouts.map((storedWorkout: any) => {
      return {
        id: storedWorkout.id || '',
        userName: storedWorkout.userName || '',
        workoutType: Array.isArray(storedWorkout.workoutType) ? storedWorkout.workoutType : [storedWorkout.workoutType],
        workoutMinutes: typeof storedWorkout.workoutMinutes === 'number' ? storedWorkout.workoutMinutes : 0
      };
    });
  }
  return [];
}
}
