import {HttpClient} from "@angular/common/http";
import {Injectable, inject} from "@angular/core";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {LeaderBoardResult} from "./leaderboard.model";
import {IUser} from "./user.model";
import {catchError, map, Observable, of, tap} from "rxjs";


export type FormData = {
  fname: string;
  address: string;
  expertise_area: { area: string }[];
  mname: string;
  aboutme: string;
  skills: {
    [key in string]: boolean
  };
  educationalInfo: { university: string; degree: string; startYear: string; endYear: string }[];
  nationality: string;
  phone: string;
  hobbies: { hobby: string }[];
  dob: string;
  name: string;
  keySkills: { skill: string }[];
  email: string;
  startDate: string;
  theme: string;
}
@Injectable({
  providedIn: 'root'
})
export class CvService {

  router = inject(Router);
  http = inject(HttpClient);

  postCvData(cvData: FormData): Observable<any> {
    const { name, fname, mname, dob, address, aboutme, phone, email, nationality, skills, educationalInfo, keySkills, expertise_area, hobbies, startDate, theme } = cvData;

    const body = {
      name,
      fname,
      mname,
      dob,
      address,
      aboutme,
      phone,
      email,
      nationality,
      theme,
      skills: Object.keys(skills).filter(key => skills[key]),
      degrees: educationalInfo.map(info => info.degree),
      universities: educationalInfo.map(info => info.university),
      startYears: educationalInfo.map(info => info.startYear),
      endYears: educationalInfo.map(info => info.endYear),
      key_skills: keySkills.map(skill => skill.skill),
      expertise_area: expertise_area.map(expertise => expertise.area),
      hobbies: hobbies.map(hobby => hobby.hobby),
      startDate
    };

    return this.http.post('cv-builder', body, { responseType: 'blob' })
  }
}
