import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBugFixesComponent } from './manage-bug-fixes.component';

describe('ManageBugFixesComponent', () => {
  let component: ManageBugFixesComponent;
  let fixture: ComponentFixture<ManageBugFixesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageBugFixesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageBugFixesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
