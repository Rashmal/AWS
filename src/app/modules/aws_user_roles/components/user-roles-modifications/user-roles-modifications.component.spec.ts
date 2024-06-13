import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRolesModificationsComponent } from './user-roles-modifications.component';

describe('UserRolesModificationsComponent', () => {
  let component: UserRolesModificationsComponent;
  let fixture: ComponentFixture<UserRolesModificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRolesModificationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserRolesModificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
