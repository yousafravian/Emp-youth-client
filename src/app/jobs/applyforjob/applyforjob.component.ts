import {Component, inject} from '@angular/core';
import {JobsService} from "../../shared/jobs.service";
import {ActivatedRoute} from "@angular/router";
import {IUser} from "../../shared/user.model";
import IJob from "../../shared/job.model";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-applyforjob',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './applyforjob.component.html',
  styleUrl: './applyforjob.component.scss'
})
export class ApplyforjobComponent {
  jobService = inject(JobsService);
  route = inject(ActivatedRoute);
  id = this.route.snapshot.paramMap.get('id')!;
  user = JSON.parse(localStorage.getItem('User') ?? "{}") as IUser;
  job?: IJob & { already_applied: string; jobApplicationsCount: number };
  errorMessage?: string;
  ja_message?: any;
  jobId?: string;
  message?: string;
  file?: File;

  onSubmit() {
    if (this.file) {
      this.jobService.applyForJob(this.ja_message, this.id, this.file)
        .subscribe({
          next: ({message}) => {
            this.message = message;
          },
          error: (error: HttpErrorResponse) => {
            this.errorMessage = error.error.message;
          }
        })
    }
  }

  onFileChange($event: Event) {
    this.file = ($event.target as HTMLInputElement).files?.[0];
  }
}
