import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataService } from '../data.service';

@Component({
  selector: 'app-workout-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './workout-list.component.html',
  styleUrl: './workout-list.component.css'
})
export class WorkoutListComponent {

  constructor(private dataService: DataService){}  

  workouts: any[] = [];
  filteredWorkouts: any[] = [];
  paginatedWorkouts: any[] = [];
  searchQuery: string = '';
  selectedWorkoutType: string = '';
  workoutTypes: string[] = ['Running', 'Yoga', 'Gym', 'Cycling','Cardio','Boxing','Upper body','Pilates'];
  totalmin:number=0;

  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;

  ngOnInit() {
    this.loadWorkouts();
  }

  loadWorkouts() {
    this.workouts=this.dataService.getworkouts() || [];
    this.filterWorkouts();
  }

  getWorkoutTypes(workout: any): string {
    return workout.workoutType.map((item: any) => item.type).join(', ');
  }

  filterWorkouts() {
    this.filteredWorkouts = this.workouts.filter(workout =>
      workout.userName.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
      (this.selectedWorkoutType ? workout.workoutType.includes(this.selectedWorkoutType) : true)
    );

    this.totalPages = Math.ceil(this.filteredWorkouts.length / this.itemsPerPage);
    this.currentPage = 1;
    this.paginate();
  }

  paginate() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedWorkouts = this.filteredWorkouts.slice(start, end);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginate();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginate();
    }
  }

  deleteWorkout(workoutId: string, workoutUser: any) {
    const del=confirm(`Are you sure you want to delete ${workoutUser} ?`);
    if(del){
    let workouts = JSON.parse(localStorage.getItem('workouts') || '[]');
    workouts = workouts.filter((workout: any) => workout.id !== workoutId);

    localStorage.setItem('workouts', JSON.stringify(workouts));
    }

    alert('Workout deleted Successfully');

    this.loadWorkouts();
  }


  
}
