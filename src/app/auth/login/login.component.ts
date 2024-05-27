import {Component, inject} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {AbstractControl, FormsModule, ValidationErrors} from "@angular/forms";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {UserService} from "../../shared/user.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  userService = inject(UserService);
  router = inject(Router);
  error?: string;

  username: string = 'john@yahoo.com';
  password: string = 'Naniteninjas1!';


  onSignIn(): void {
    this.userService.login(this.username, this.password)
      .subscribe({
        next: ({message, user}) => {
          localStorage.setItem('User', JSON.stringify(user));

          this.router.navigate(['/']);
        },
        error: (error: HttpErrorResponse) => {
          this.error = error.error.message;
        }
      });
  }

}
