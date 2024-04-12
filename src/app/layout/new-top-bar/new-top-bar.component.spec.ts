import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTopBarComponent } from './new-top-bar.component';

describe('NewTopBarComponent', () => {
  let component: NewTopBarComponent;
  let fixture: ComponentFixture<NewTopBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewTopBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewTopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
