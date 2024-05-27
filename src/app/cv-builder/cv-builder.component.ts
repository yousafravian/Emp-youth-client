import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {CvService, FormData} from "../shared/cv.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-cv-builder',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './cv-builder.component.html',
  styleUrls: ['./cv-builder.component.scss']
})
export class CvBuilderComponent implements OnInit {

  @ViewChild('ngForm') ngForm?: NgForm;

  cvService = inject(CvService)
  route = inject(ActivatedRoute);

  formData: FormData = {
    name: '',
    fname: '',
    mname: '',
    dob: '',
    address: '',
    aboutme: '',
    phone: '',
    email: '',
    nationality: '',
    skills: {
      teamwork: false,
      initiative: false,
      leadership: false,
      professionalism: false,
      analytical: false,
      organised: false,
      ability: false,
    },
    educationalInfo: [
      { degree: '', university: '', startYear: '', endYear: '' }
    ],
    keySkills: [
      { skill: '' }
    ],
    expertise_area: [
      { area: '' }
    ],
    hobbies: [
      { hobby: '' }
    ],
    startDate: '',
    theme: this.route.snapshot.data['theme'] as string
  };


    /*{
    "name": "Yousaf Raza",
    "fname": "Muratab Ali",
    "mname": "Farwa",
    "dob": "2024-05-26",
    "address": "74/1 Lawrance Road,lahore",
    "aboutme": "Me",
    "phone": "03474557250",
    "email": "yousafrazaravian@gmail.com",
    "nationality": "Pakistani",
    "skills": {
      "teamwork": true,
      "initiative": true,
      "leadership": true,
      "professionalism": true,
      "analytical": false,
      "organised": false,
      "ability": false
    },
    "educationalInfo": [
      {
        "degree": "BSCS",
        "university": "GCU",
        "startYear": "2024-05-05",
        "endYear": "2024-05-19"
      },
      {
        "degree": "BSCS",
        "university": "GCU",
        "startYear": "2024-05-05",
        "endYear": "2024-05-26"
      }
    ],
    "keySkills": [
      {
        "skill": "GCU"
      },
      {
        "skill": "GCU"
      },
      {
        "skill": "GCU"
      }
    ],
    "expertise_area": [
      {
        "area": "GCU"
      }
    ],
    "hobbies": [
      {
        "hobby": "GCU"
      }
    ],
    "startDate": "2024-05-29",
    "theme": "green"
  }*/

  ngOnInit(): void {
  }

  addMore(section: string): void {
    if (section === 'education') {
      this.formData.educationalInfo.push({degree: '', university: '', startYear: '', endYear: ''});
    } else if (section === 'keySkill') {
      this.formData.keySkills.push({skill: ''});
    } else if (section === 'expertise') {
      this.formData.expertise_area.push({area: ''});
    } else if (section === 'hobby') {
      this.formData.hobbies.push({hobby: ''});
    }
  }

  onSubmit(): void {
    this.cvService.postCvData(this.formData).subscribe(data  => {
      this.ngForm?.resetForm();
      const url = window.URL.createObjectURL(new Blob([data], { type: 'application/pdf' }));
      const a = document.createElement('a');
      a.href = url;
      a.download = 'resume.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });
  }
}
