import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSystemEnhancementsComponent } from './view-system-enhancements.component';

describe('ViewSystemEnhancementsComponent', () => {
  let component: ViewSystemEnhancementsComponent;
  let fixture: ComponentFixture<ViewSystemEnhancementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSystemEnhancementsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewSystemEnhancementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
