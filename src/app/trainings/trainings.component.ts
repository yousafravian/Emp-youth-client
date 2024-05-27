import {Component, inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
  selector: 'app-trainings',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './trainings.component.html',
  styleUrl: './trainings.component.scss'
})
export class TrainingsComponent {
  sanitizor = inject(DomSanitizer);
  skills: string[] = [
    'Software Developing',
    'Vocal Communication',
    'Leadership',
    'Financial Management',
    'Organisation',
    'Logical Thinking'
  ];

  selectedSkills: { [key: string]: boolean } = {};
  trainingCoursesHtml: SafeHtml = '';
  errorMessage: string = '';
  message: string = '';

  mostPopularCourses = [
    {
      title: 'Communication Skills Course',
      description: 'Master the arts of writing, presenting and storytelling to impress, influence and inspire.',
      link: 'https://advanceonline.cam.ac.uk/courses/compelling-communication-skills/?utm_medium=cpc&utm_source=google&utm_campaign=5A_CCS_Geo1_%7BB%7D&gad_source=1&gclid=Cj0KCQiA4NWrBhD-ARIsAFCKwWuWO5eRmdPvs574DYy2L5TLx2VXQilpZh6wY84vu6p16wSb35qiUT0aAq1aEALw_wcB'
    },
    {
      title: 'Programming Skills Course',
      description: 'Simplilearn’s comprehensive Python Course and Training will teach you the basics of Python, data operations, conditional statements, shell scripting, and Django.',
      link: 'https://www.simplilearn.com/mobile-and-software-development/python-development-training'
    },
    {
      title: 'Organisation Skills Course',
      description: 'This Organisational Skills Course equips learners with proper organisational skills for boosting workplace efficiency and time management',
      link: 'https://www.theknowledgeacademy.com/courses/personal-development-training/organisational-skills/'
    },
    {
      title: 'Leadership Skills Course',
      description: 'Learn the basics of team leading with our online CPD course.',
      link: 'https://cpdonline.co.uk/course/team-leading/?gad_source=1&gclid=Cj0KCQiA4NWrBhD-ARIsAFCKwWtlXodaX9-WiqJmHKb4d-aQRF2RYrgLcF3o1C6rNI7F862sYUEHlxYaAvwaEALw_wcB'
    },
    {
      title: 'Logical Thinking Skills Course',
      description: 'Improve your logical and critical thinking skills in this free online course. Identify common obstacles to effective thinking.',
      link: 'https://www.futurelearn.com/courses/logical-and-critical-thinking'
    }
  ];

  trainingCourses = [
    {
      title: 'Software Development Course',
      description: 'Our Coding Kickstarter courses will give you the skills and confidence you need to supercharge your career in tech.',
      link: 'https://codefirstgirls.com/courses/coding-kickstarter/?utm_source=google&utm_medium=cpc&utm_campaign=19683759491:&utm_term={keywordid}:coding%20classes:b:&utm_content=145848882213:647977329288:g::c&hsa_acc=4524824748&hsa_cam=19683759491&hsa_grp=145848882213&hsa_mt=b&hsa_src=g&hsa_ad=647977329288&hsa_net=adwords&hsa_kw=coding%20classes&hsa_tgt=aud-1959322198445:kwd-1302885925&hsa_ver=3&gad_source=1&gclid=Cj0KCQiA4NWrBhD-ARIsAFCKwWt7sp0UqsoHIlcKZC3Ui5DqW59vu65s7Q_BP6qPvUvghpCyAhXiS1saAssrEALw_wcB'
    },
    {
      title: 'Vocal Communication Course',
      description: 'Communication Skills for Persuasion, Assertiveness and All Business Communication Needs',
      link: 'https://www.udemy.com/course/the-complete-communication-skills-master-class-for-life/'
    },
    {
      title: 'Leadership Course',
      description: 'Academic leadership masterclasses designed to shape the future of academic management and leadership in your institution.',
      link: 'https://www.gatenbysanderson.com/academic-leadership-masterclasses/?gclid=Cj0KCQiA4NWrBhD-ARIsAFCKwWuFiW2aqCqRnktiwehz7JAkKWIgaXmoXpTjyrKQ3O8vDtk-TegH1yAaAqlnEALw_wcB'
    },
    {
      title: 'Adaptability Course',
      description: 'To survive in today’s constantly changing business landscape requires being comfortable in uncertainty. Adaptability is what allows people and businesses to solve problems, overcome challenges and move back from the edge of attrition to the more stable ground of relevance.',
      link: 'https://www.classcentral.com/course/adaptability-and-resiliency-25328'
    },
    {
      title: 'Organization Course',
      description: 'In this free online course, learn how to organize and declutter your life to achieve your goals and improve productivity',
      link: 'https://alison.com/course/organization-masterclass'
    }
  ];

  ngOnInit() {
    // Initialize the selectedSkills object
    this.skills.forEach(skill => this.selectedSkills[skill] = false);
  }

  toggleSelection(skill: string) {
    this.selectedSkills[skill] = !this.selectedSkills[skill];
    // this.updateTrainingCourses();
  }

  updateTrainingCourses() {
    const selectedSkills = Object.keys(this.selectedSkills).filter(skill => this.selectedSkills[skill]);
    const coursesHtml = selectedSkills.map(skill => {
      const courseLinks = this.getCourseLinksForSkill(skill);
      return `
          <h4>Courses for ${skill}</h4>
          ${courseLinks.join('<br/>')}
        `;
    }).join('');

    this.trainingCoursesHtml = this.sanitizor.bypassSecurityTrustHtml(coursesHtml);
  }

  getCourseLinksForSkill(skill: string): string[] {
    const courseMappings: { [key: string]: string[] } = {
      'Programming': [
        '<a href="https://skills.cogrammar.com/?utm_source=google&utm_medium=cpc&utm_campaign={aip_HyperionDev-DfE_Conversion_Search}&utm_content=158277155652&utm_term=free%20coding%20courses&gad_source=1&gclid=Cj0KCQiA4NWrBhD-ARIsAFCKwWs6xeohajNGHuHbgQ-4belRUEzWXfYPRkG9W6JIGQlRMuJtZ5DakMUaAkUhEALw_wcB" target="_blank">Software Engineering Bootcamp</a>',
        '<a href="https://www.futurelearn.com/courses/computer-programming-for-everyone" target="_blank">Introduction to Computer Programming</a>',
        '<a href="https://www.codecademy.com/" target="_blank">Coding</a>'
      ],
      'Software Developing': [
        '<a href="" target="_blank">Software Development Kickstarter Class </a>',
        '<a href="https://www.futurelearn.com/courses/computer-science-essentials-algorithms" target="_blank">Fundamentals of Algorithms</a>',
        '<a href="https://alison.com/tag/software-development" target="_blank">Introduction to Software Development</a>'
      ],
      'Vocal Communication': [
        '<a href="" target="_blank">Communication Skills MAster Class</a>',
        '<a href="https://www.mygreatlearning.com/academy/learn-for-free/courses/effective-communication" target="_blank">Effective Communication Course</a>',
        '<a href="https://www.coursera.org/learn/finding-your-professional-voice" target="_blank">Finding your Professional Voice</a>'
      ],
      'Leadership': [
        '<a href="" target="_blank">Academic Leadership Masterclasses</a>',
        '<a href="https://leadership.global/landing-pages/leadership-training.html?gclid=Cj0KCQiA4NWrBhD-ARIsAFCKwWvSnxDXLPNZWf0dq9u_ntIEwQ4yNCqqLpK5PMMAxcvUXYrGxyGEDfYaAk5TEALw_wcB" target="_blank">Leadership Development</a>',
        '<a href="https://alison.com/tag/leadership-skills" target="_blank">Leadership Skills Course</a>'
      ],
      'Financial Management': [
        '<a href="https://www.mygreatlearning.com/academy/learn-for-free/courses/introduction-to-financial-management1" target="_blank">Introduction to Financial Management</a>',
        '<a href="https://www.edx.org/learn/financial-management" target="_blank">Foundation of Financial Management</a>',
        '<a href="https://www.udemy.com/course/master-a-financial-management-habit-and-worry-no-more/?utm_source=aff-campaign&utm_medium=udemyads&LSNPUBID=0F1O0otUXQc&ranMID=47901&ranEAID=0F1O0otUXQc&ranSiteID=0F1O0otUXQc-5g1Fon5kOmrTsGg2j4s4qA" target="_blank">Financial Management Habit Course</a>'
      ],
      'Adaptability': [
        '<a href="" target="_blank">Adabptability and Resilience Skills</a>',
        '<a href="https://esoftskills.com/courses/adaptability-training/" target="_blank">Skills of Adaptability</a>',
        '<a href="https://www.skillsoft.com/channel/adapting-to-change-06720340-e71a-11e6-9835-f723b46a2688" target="_blank">Adapting to Change</a>'
      ],
      'Organisation': [
        '<a href="" target="_blank">Get Organized: A Masterclass</a>',
        '<a href="https://www.skillshare.com/en/browse/organization" target="_blank">Organisation Course</a>',
        '<a href="https://www.mandatorytraining.co.uk/products/organisational-skills-online-training-course-cpduk-accredited?variant=4591670624290" target="_blank">Organisational Skills Training</a>'
      ],
      'Logical Thinking': [
        '<a href="https://www.futurelearn.com/courses/logical-and-critical-thinking" target="_blank">Logical and Critical Thinking Course</a>',
        '<a href="https://conted.ox.ac.uk/courses/critical-reasoning-a-romp-through-the-foothills-of-logic-online" target="_blank">Critical Reasoning</a>',
        '<a href="https://www.oxfordhomestudy.com/courses/online-management-courses/critical-thinking-free-online-course" target="_blank">Critical Thinking Short Course</a>'
      ]
    };

    return courseMappings[skill] || [];
  }

  onSubmit() {
    const selectedSkills = Object.keys(this.selectedSkills).filter(skill => this.selectedSkills[skill]);
    this.updateTrainingCourses();
    if (selectedSkills.length === 0) {
      this.errorMessage = 'Please select at least one skill.';
    } else {
      this.message = 'Skills submitted successfully!';
      this.errorMessage = '';
    }
  }
}
