import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigResourceTypeComponent } from './config-resource-type.component';

describe('ConfigResourceTypeComponent', () => {
  let component: ConfigResourceTypeComponent;
  let fixture: ComponentFixture<ConfigResourceTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigResourceTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfigResourceTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
