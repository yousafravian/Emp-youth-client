import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterLink} from "@angular/router";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {IUser} from "../shared/user.model";
import {UserService} from "../shared/user.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    NgOptimizedImage
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit, OnDestroy {
  userService = inject(UserService);
  router = inject(Router);

  user?: IUser;
  destroy$ = new Subject<void>();

  ngOnInit() {
    this.updateUser();

    this.router.events
      .pipe(takeUntil(this.destroy$))
      .subscribe(e => {
        setTimeout(() => {
          if (e instanceof NavigationEnd) {
            this.updateUser();
          }
        })
      })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  logout() {
    this.userService.logout().subscribe(() => {
      localStorage.removeItem('User');
      this.router.navigate(['/auth/login']);
    });
  }

  private updateUser() {
    const user = localStorage.getItem('User');
    if (user) {
      this.user = JSON.parse(user) as IUser;
    } else {
      this.user = undefined;
    }
  }
}
