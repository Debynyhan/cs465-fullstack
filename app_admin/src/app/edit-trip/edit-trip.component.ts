import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup,} from '@angular/forms';
import { TripDataService } from '../services/trip-data.service';


@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.component.html',
  styleUrl: './edit-trip.component.css',
})
export class EditTripComponent {
  public editForm!: FormGroup;
  public submitted = false;
  private tripCode: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripDataService: TripDataService
  ) {}

  ngOnInit(): void {
    this.tripCode = localStorage.getItem('tripCode');
    if (!this.tripCode) {
      this.router.navigate(['']);
      return;
    }

    this.editForm = this.formBuilder.group({
      _id: [],
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.tripDataService.getTrip(this.tripCode).then((data) => {
      this.editForm.patchValue(data[0]);
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.editForm.valid) {
      this.tripDataService.updateTrip(this.editForm.value).then((data) => {
       
        this.router.navigate(['']);
      });
    }
  }

  get f() {
    return this.editForm.controls;
  }
}
