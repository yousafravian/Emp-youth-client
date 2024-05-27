import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {LeaderBoardResult} from "./leaderboard.model";
import {IUser} from "./user.model";
import {catchError, map, of} from "rxjs";
import IJob from "./job.model";
import IMentoring from "./mentoring.model";

@Injectable({
  providedIn: 'root'
})
export class MentoringService {

  router = inject(Router);
  http = inject(HttpClient);


  createMentoring(mentor: Partial<IMentoring>, file: File) {

    const formData = new FormData();
    formData.append('m_name', mentor.m_name!);
    formData.append('m_email', mentor.m_email!);
    formData.append('m_phone', mentor.m_phone!);
    formData.append('m_enquiry', mentor.m_enquiry!);
    if (file) {
      formData.append('file', file);
    }
    return this.http.post('mentoring', formData);
  }

  getMentorings() {
    return this.http.get<{ mentorings: IMentoring[] }>('viewmentoring');
  }

  getFile(id: string) {
    return this.http.get('file/' + id, {responseType: 'blob'});
  }
}
