import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {LeaderBoardResult} from "./leaderboard.model";
import {IUser} from "./user.model";
import {catchError, map, of} from "rxjs";
import IJob from "./job.model";

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  router = inject(Router);
  http = inject(HttpClient);


  getJobs() {
    return this.http.get<{ jobs: IJob[]}>('jobs');
  }

  getJobById(id: string) {
    return this.http.get<{ job: IJob & { already_applied: string; jobApplicationsCount: number } }>('jobs/' + id);
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

  applyForJob(ja_message: string, ja_j_id: string, file: File) {
    const formData = new FormData();
    formData.append('ja_message', ja_message);
    formData.append('ja_j_id', ja_j_id);
    formData.append('file', file);

    return this.http.post<{ message: string }>('applyforjob', formData);
  }

  postAJob(job: Partial<IJob>) {
    return this.http.post<{ message: string }>('postajob', job);
  }
}
