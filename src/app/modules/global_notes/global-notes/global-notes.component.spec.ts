import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalNotesComponent } from './global-notes.component';

describe('GlobalNotesComponent', () => {
  let component: GlobalNotesComponent;
  let fixture: ComponentFixture<GlobalNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlobalNotesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GlobalNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
