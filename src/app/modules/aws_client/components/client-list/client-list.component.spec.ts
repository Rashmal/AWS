import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClentListComponent } from './clent-list.component';

describe('ClentListComponent', () => {
  let component: ClentListComponent;
  let fixture: ComponentFixture<ClentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClentListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
