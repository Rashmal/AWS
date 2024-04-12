import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBugFixesComponent } from './view-bug-fixes.component';

describe('ViewBugFixesComponent', () => {
  let component: ViewBugFixesComponent;
  let fixture: ComponentFixture<ViewBugFixesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewBugFixesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewBugFixesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
