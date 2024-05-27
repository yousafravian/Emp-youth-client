import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewmentoringComponent } from './viewmentoring.component';

describe('ViewmentoringComponent', () => {
  let component: ViewmentoringComponent;
  let fixture: ComponentFixture<ViewmentoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewmentoringComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewmentoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
