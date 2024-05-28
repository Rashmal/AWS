import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalRequirementsComponent } from './global-requirements.component';

describe('GlobalRequirementsComponent', () => {
  let component: GlobalRequirementsComponent;
  let fixture: ComponentFixture<GlobalRequirementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalRequirementsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GlobalRequirementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
