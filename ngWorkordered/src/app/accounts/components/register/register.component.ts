import { AccountsService } from '@accounts/services/accounts/accounts.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertsService } from '@alerts/services/alerts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  constructor(
    private fb: FormBuilder,
    private accountsService: AccountsService,
    private alertsService: AlertsService,
    private router: Router
  ) { }


  // ! - definite assignment assertion
  registrationForm!: FormGroup;
  registrationSubscription!: Subscription;

  showPassword = false;
  showPasswordConfirmation = false;
  groups = ['Operators', 'Technicians', 'QA', 'Supervisors', 'Managers',
    'Distribution', 'Office Staff'];

  // for the alert
  username!: string;


  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      first_name: ['', {
        validators: [Validators.required],
        updateOn: 'blur'
      }],
      last_name: ['', {
        validators: [Validators.required],
        updateOn: 'blur'
      }],
      payroll_number: ['', {
        validators: [Validators.required],
        updateOn: 'blur'
      }],
      phone_number: ['', {
        validators: [Validators.required],
        updateOn: 'blur'
      }],
      alternative_phone_number: ['', {
        updateOn: 'blur'
      }],
      group: ['', {
        validators: [Validators.required],
        updateOn: 'blur'
      }],
      password: ['', {
        validators: [Validators.required],
        updateOn: 'blur'
      }],
      password_confirmation: ['', {
        validators: [Validators.required]

      }]
    });
  }

  get f(): any {
    return this.registrationForm.controls;
  }

  // upon successful registration
  // navigate to login page and
  // display success alert with the username
  register(): void {
    this.registrationSubscription = this.accountsService.registerUser(this.registrationForm.value)
      // tslint:disable-next-line: deprecation
      .subscribe(
        {
          next: (user: any) => this.registrationSuccessful(user),
          complete: () => this.registrationComplete()
        }
      );
  }

  // successfull registration callback
  registrationSuccessful(user: any): void {
    this.username = user[`message`];
  }

  registrationComplete(): void {
    this.alertsService.success(
      `Registration successful. Your username is ${this.username}.`
    );
    this.router.navigate(['accounts/login']);

  }

  // load the login component
  loginPage(): void {
    this.router.navigate(['accounts/login']);
  }

  ngOnDestroy(): void {
    this.registrationSubscription?.unsubscribe();
  }
}
