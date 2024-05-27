import {Component, inject, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormsModule, NgForm} from "@angular/forms";
import {NgIf} from "@angular/common";
import {MentoringService} from "../shared/mentoring.service";
import IMentoring from "../shared/mentoring.model";

@Component({
  selector: 'app-mentoring',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './mentoring.component.html',
  styleUrl: './mentoring.component.scss'
})
export class MentoringComponent {
  @ViewChild('mentoringForm') mentoringForm?: NgForm;
  http = inject(HttpClient)
  mentoringService = inject(MentoringService)
  mentoring = {
    m_name: '',
    m_email: '',
    m_phone: '',
    m_enquiry: ''
  };
  file: File | null = null;
  message: string | undefined;
  error_message: string | undefined;


  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  onSubmit() {
    if (this.file) {
      this.mentoringService.createMentoring(this.mentoring, this.file).subscribe({
        next: (response: any) => {
          if (this.mentoringForm) {
            this.mentoringForm.resetForm();
          }
          this.message = 'Form submitted successfully!';
          this.error_message = undefined;
        },
        error: (error) => {
          this.error_message = 'There was an error submitting the form.';
          this.message = undefined;
        }
      });
    }
  }
}
