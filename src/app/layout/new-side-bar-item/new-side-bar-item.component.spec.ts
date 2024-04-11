import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSideBarItemComponent } from './new-side-bar-item.component';

describe('NewSideBarItemComponent', () => {
  let component: NewSideBarItemComponent;
  let fixture: ComponentFixture<NewSideBarItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewSideBarItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewSideBarItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
