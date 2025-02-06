import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutListComponent } from './workout-list.component';
import { DataService } from '../data.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';

// Mock DataService
class MockDataService {
  getworkouts() {
    return [
      { id: '1', userName: 'John', workoutType: [{ type: 'Running', minutes : 20}] },
      { id: '2', userName: 'Jane', workoutType: [{ type: 'Yoga' ,minutes :30}] }
    ];
  }
}

describe('WorkoutListComponent', () => {
  let component: WorkoutListComponent;
  let fixture: ComponentFixture<WorkoutListComponent>;
  let mockDataService: MockDataService;

  beforeEach(async () => {
    mockDataService = new MockDataService();
    await TestBed.configureTestingModule({
      imports: [FormsModule, CommonModule, WorkoutListComponent],
      declarations: [],
      providers: [{ provide: DataService, useValue: mockDataService }]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load workouts on init', () => {
    spyOn(component, 'loadWorkouts').and.callThrough();
    component.ngOnInit();
    expect(component.loadWorkouts).toHaveBeenCalled();
    expect(component.workouts.length).toBeGreaterThan(0);
  });

  it('should filter workouts by username', () => {
    component.searchQuery = 'John';
    component.filterWorkouts();
    expect(component.filteredWorkouts.length).toBe(1);
    expect(component.filteredWorkouts[0].userName).toBe('John');
  });

  it('should filter workouts by workout type', () => {
    const initialWorkouts = [
      { id: '1', name: 'Workout 1', userName: 'John', workoutType: 'Cardio' },
      { id: '2', name: 'Workout 2', userName: 'Jane', workoutType: 'Strength' },
      { id: '3', name: 'Workout 3', userName: 'John', workoutType: 'Cardio' },
      { id: '4', name: 'Workout 4', userName: 'John', workoutType: 'Yoga' }
    ];
  
    component.workouts = [...initialWorkouts];
    
    component.searchQuery = 'John'; 
    component.selectedWorkoutType = 'Cardio'; 
  
    component.filterWorkouts();
    
    expect(component.filteredWorkouts.length).toBe(2); 
    expect(component.filteredWorkouts[0].workoutType).toBe('Cardio');
    expect(component.filteredWorkouts[1].workoutType).toBe('Cardio');
    expect(component.filteredWorkouts[0].userName).toBe('John');
    expect(component.filteredWorkouts[1].userName).toBe('John');
  });
  

  it('should paginate workouts correctly', () => {
    component.filteredWorkouts = [
      { id: '1', userName: 'John', workoutType: [{ type: 'Running', minutes:20 }] },
      { id: '2', userName: 'Jane', workoutType: [{ type: 'Yoga' , minutes:20}] },
      { id: '3', userName: 'Jack', workoutType: [{ type: 'Cycling', minutes:20 }] }
    ];
    component.itemsPerPage = 2;
    component.paginate();
    expect(component.paginatedWorkouts.length).toBe(2);
    expect(component.paginatedWorkouts[0].userName).toBe('John');
  });

  it('should go to the next page correctly', () => {
    component.currentPage = 1;
    component.totalPages = 3;
    component.nextPage();
    expect(component.currentPage).toBe(2);
  });

  it('should go to the previous page correctly', () => {
    component.currentPage = 2;
    component.prevPage();
    expect(component.currentPage).toBe(1);
  });
  it('should delete a workout successfully', () => {
    // Setup initial workouts data
    const initialWorkouts = [
      { id: '1', name: 'Workout 1', type: 'Cardio' },
      { id: '2', name: 'Workout 2', type: 'Strength' }
    ];

    expect(component.workouts.length).toBe(2);  // Only one workout should remain

  
    // Assign initial workouts to the component
    component.workouts = [...initialWorkouts];
    
    // Spy on confirm and alert
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(window, 'alert');
  
    // Call deleteWorkout method with a workout ID and user
    const workoutId = '1';
    const workoutUser = 'John';
    component.deleteWorkout(workoutId, workoutUser);
    
    // Verify if confirm was called
    expect(window.confirm).toHaveBeenCalled();
    
    // Verify if alert was called
    expect(window.alert).toHaveBeenCalledWith('Workout deleted Successfully');
    
    // Check if the workout with ID '1' is deleted from the workouts array
  });
  
});
