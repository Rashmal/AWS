import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBugFixesComponent } from './view-bug-fixes.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BugFixesRoutingModule } from '../bugFixesRouting.module';

describe('ViewBugFixesComponent', () => {
  let component: ViewBugFixesComponent;
  let fixture: ComponentFixture<ViewBugFixesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        BugFixesRoutingModule
      ],
      declarations: [
        ViewBugFixesComponent
      ]
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
