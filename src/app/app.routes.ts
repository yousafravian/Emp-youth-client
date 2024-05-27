import {
  ActivatedRouteSnapshot,
  CanActivateFn, Router,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {inject} from "@angular/core";
import {HomeComponent} from "./home/home.component";
import {RegisterComponent} from "./auth/register/register.component";
import {ForgotPasswordComponent} from "./auth/forgot-password/forgot-password.component";
import {UserService} from "./shared/user.service";
import {map} from "rxjs";
import {JobsComponent} from "./jobs/jobs.component";
import {PostajobComponent} from "./postajob/postajob.component";
import {MentoringComponent} from "./mentoring/mentoring.component";
import {JobDetailComponent} from "./jobs/job-detail/job-detail.component";
import {ApplyforjobComponent} from "./jobs/applyforjob/applyforjob.component";
import {ViewmentoringComponent} from "./viewmentoring/viewmentoring.component";
import {TrainingsComponent} from "./trainings/trainings.component";
import {CvComponent} from "./cv/cv.component";
import {CvBuilderComponent} from "./cv-builder/cv-builder.component";


export const redirectAuthorizedUser: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot) => {
  const router = inject(Router);
  const userService = inject(UserService);
  const isAuthenticated$ = userService.isAuthenticated();

  return isAuthenticated$.pipe(
    map(isAuthenticated => {
      if (isAuthenticated) {
        return router.parseUrl('/');
      }
      return true;
    })
  );
}
export const redirectUnAuthorizedUser: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot) => {
  const router = inject(Router);
  const userService = inject(UserService);
  const isAuthenticated$ = userService.isAuthenticated();

  return isAuthenticated$.pipe(
    map(isAuthenticated => {
      if (!isAuthenticated) {
        return router.parseUrl('/auth/login');
      }
      return true;
    })
  );
}

export const routes: Routes = [
  {
    path: 'auth',
    canActivate: [
      redirectAuthorizedUser
    ],
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'forgot',
        component: ForgotPasswordComponent
      }
    ]
  },
  {
    path: '',
    canActivate: [
      redirectUnAuthorizedUser
    ],
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'jobs',
        component: JobsComponent,
      },
      {
        path: 'jobs/:id',
        component: JobDetailComponent,
      },
      {
        path: 'applyforjob/:id',
        component: ApplyforjobComponent,
      },
      {
        path: 'postajob',
        component: PostajobComponent,
      },
      {
        path: 'mentoring',
        component: MentoringComponent,
      },
      {
        path: 'viewmentoring',
        component: ViewmentoringComponent,
      },
      {
        path: 'training',
        component: TrainingsComponent,
      },
      {
        path: 'C.V',
        component: CvComponent,
      },
      {
        path: 'cv-builder/1',
        component: CvBuilderComponent,
        data: {
          theme: 'blue',
        }
      },
      {
        path: 'cv-builder/2',
        component: CvBuilderComponent,
        data: {
          theme: 'green',
        }
      }
    ]
  },
  {
    path: "**",
    redirectTo: 'games'
  }
];
