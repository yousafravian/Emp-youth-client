import {Component, inject} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {HttpErrorResponse, HttpStatusCode} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {IUser} from "../../shared/user.model";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {UserService} from "../../shared/user.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  userService = inject(UserService);
  router = inject(Router);

  username: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';
  dob: Date = new Date();
  userType: string = '';
  company: string = '';
  education: string = '';
  terms: boolean = false;
  isEmployer: boolean = false;
  isStudent: boolean = false;
  error?: string;

  toggleFields(): void {
    this.isEmployer = this.userType === 'employer';
    this.isStudent = this.userType === 'student';
  }


  onSubmit(): void {
    const payload: Partial<IUser> =
      {
        email: this.username,
        password: this.password,
        name: this.firstName,
        lastname: this.lastName,
        dob: this.dob,
        userType: this.userType === 'employer' ? 'employer' : 'student',
        company: this.company,
        education: this.education,
      };
    this.userService.register(payload)
      .subscribe({
        next: () => {
          this.router.navigate(['/auth/login']);
        },
        error: (err: HttpErrorResponse) => {
          this.error = err.error.message;
        }
      });
  }
}
