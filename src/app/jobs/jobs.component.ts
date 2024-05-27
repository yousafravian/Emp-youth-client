import {Component, inject, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import IJob from "../shared/job.model";
import {JobsService} from "../shared/jobs.service";

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [
    RouterLink,
    DatePipe,
    NgForOf,
    NgIf
  ],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.scss'
})
export class JobsComponent implements OnInit {
  jobsService = inject(JobsService);
  jobs: IJob[] = [];

  ngOnInit() {
    this.jobsService.getJobs()
      .subscribe({
        next: ({jobs}) => {
          this.jobs = jobs;
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

}
