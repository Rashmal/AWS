import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCommentsSystemEnhancementComponent } from './manage-comments-system-enhancement.component';

describe('ManageCommentsSystemEnhancementComponent', () => {
  let component: ManageCommentsSystemEnhancementComponent;
  let fixture: ComponentFixture<ManageCommentsSystemEnhancementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageCommentsSystemEnhancementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageCommentsSystemEnhancementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
