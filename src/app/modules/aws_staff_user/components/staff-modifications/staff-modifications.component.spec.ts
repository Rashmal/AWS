import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffModificationsComponent } from './staff-modifications.component';

describe('StaffModificationsComponent', () => {
  let component: StaffModificationsComponent;
  let fixture: ComponentFixture<StaffModificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffModificationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StaffModificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
