import {Component, inject, OnInit} from '@angular/core';
import IMentoring from "../shared/mentoring.model";
import {NgForOf, NgIf} from "@angular/common";
import {MentoringService} from "../shared/mentoring.service";

@Component({
  selector: 'app-viewmentoring',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './viewmentoring.component.html',
  styleUrl: './viewmentoring.component.scss'
})
export class ViewmentoringComponent implements OnInit {
  mentoringService = inject(MentoringService);
  mentorings: IMentoring[] = [];

  ngOnInit() {
    this.mentoringService.getMentorings().subscribe(({mentorings}: { mentorings: IMentoring[] }) => {
      this.mentorings = mentorings;
    });
  }

  onViewAttachment(id: string) {
    this.mentoringService.getFile(id)
      .subscribe(blob => {
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      });
  }
}
