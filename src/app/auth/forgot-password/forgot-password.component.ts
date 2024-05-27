import {Component, inject} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {AbstractControl, FormsModule, ValidationErrors} from "@angular/forms";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {UserService} from "../../shared/user.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  userService = inject(UserService);
  router = inject(Router);
  error?: string;

  username: string = '';
  password: string = 'admin@123';


  onSubmit(): void {
    this.userService.login(this.username, this.password)
      .subscribe({
        next: ({message, user}) => {

          this.router.navigate(['/auth/login']);
        },
        error: () => {
        }
      });
  }

}
