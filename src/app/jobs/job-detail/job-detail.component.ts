import {Component, inject, OnInit} from '@angular/core';
import {JobsService} from "../../shared/jobs.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import IJob from "../../shared/job.model";
import {DatePipe, JsonPipe, NgIf} from "@angular/common";
import {IUser} from "../../shared/user.model";

@Component({
  selector: 'app-job-detail',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    DatePipe,
    JsonPipe
  ],
  templateUrl: './job-detail.component.html',
  styleUrl: './job-detail.component.scss'
})
export class JobDetailComponent implements OnInit {
  jobService = inject(JobsService);
  route = inject(ActivatedRoute);
  id = this.route.snapshot.paramMap.get('id');
  user = JSON.parse(localStorage.getItem('User') ?? "{}") as IUser;
  job?: IJob & { already_applied: string; jobApplicationsCount: number };

  ngOnInit() {
    if (this.id) {
      this.jobService.getJobById(this.id)
        .subscribe(({job}) => {
          this.job = job;
        })
    }
  }
}
