import {Component, inject, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import IJob from "../shared/job.model";
import {JsonPipe, NgIf} from "@angular/common";
import {JobsService} from "../shared/jobs.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-postajob',
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe,
    NgIf
  ],
  templateUrl: './postajob.component.html',
  styleUrl: './postajob.component.scss'
})
export class PostajobComponent {
  @ViewChild('jobForm') jobForm?: NgForm;
  jobService = inject(JobsService);
  router = inject(Router);
  job: Partial<IJob> = {
    j_cname: '',
    j_email: '',
    j_title: '',
    j_description: '',
    j_appdeadline: '',
    j_u_id: '',
    created_at: ''
  }
  message?: string;

  onSubmit() {
    this.jobService.postAJob(this.job)
      .subscribe({
        next: ({message}) => {
          if (this.jobForm) {
            this.jobForm.resetForm();
          }
          this.message = message;
          this.router.navigate(['/jobs']);
        },
        error: (error) => {
          this.message = error.error.message;
        }
      })
  }
}
