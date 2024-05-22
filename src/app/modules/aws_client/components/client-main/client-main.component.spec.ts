import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClentMainComponent } from './client-main.component';

describe('ClentMainComponent', () => {
  let component: ClentMainComponent;
  let fixture: ComponentFixture<ClentMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClentMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClentMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
