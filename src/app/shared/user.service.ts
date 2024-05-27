import {HttpClient} from "@angular/common/http";
import {Injectable, inject} from "@angular/core";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {LeaderBoardResult} from "./leaderboard.model";
import {IUser} from "./user.model";
import {catchError, map, of, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  router = inject(Router);
  http = inject(HttpClient);


  isAuthenticated() {
    return this.http.get('isAuthenticated')
      .pipe(
        map(() => true),
        catchError(() => {
            return of(false);
          }
        ),
        tap((isAuthenticated) => {
          if (!isAuthenticated) {
            localStorage.removeItem('User');
          }
        })
      );
  }

  logout() {
    localStorage.removeItem('User');
    return this.http.get('logout');
  }

  register(user: Partial<IUser>) {
    return this.http.post<Partial<IUser>>('register', user)
  }

  login(username: string, password: string) {
    const payload: Partial<IUser> = {
      email: username,
      password
    }
    return this.http.post<{ message: string, user: IUser }>('login', payload)
  }
}
