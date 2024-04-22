import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCommentsBugFixesComponent } from './manage-comments-bug-fixes.component';

describe('ManageCommentsBugFixesComponent', () => {
  let component: ManageCommentsBugFixesComponent;
  let fixture: ComponentFixture<ManageCommentsBugFixesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageCommentsBugFixesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageCommentsBugFixesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
