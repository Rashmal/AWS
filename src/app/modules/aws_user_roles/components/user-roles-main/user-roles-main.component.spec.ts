import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRolesMainComponent } from './user-roles-main.component';

describe('UserRolesMainComponent', () => {
  let component: UserRolesMainComponent;
  let fixture: ComponentFixture<UserRolesMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRolesMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserRolesMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
