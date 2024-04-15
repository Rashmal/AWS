import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSystemEnhancementComponent } from './manage-system-enhancement.component';

describe('ManageSystemEnhancementComponent', () => {
  let component: ManageSystemEnhancementComponent;
  let fixture: ComponentFixture<ManageSystemEnhancementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageSystemEnhancementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageSystemEnhancementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
