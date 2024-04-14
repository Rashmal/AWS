import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSystemEnhancementsComponent } from './view-system-enhancements.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SystemEnhancementsRoutingModule } from '../../systemEnhancementsRouting.module';

describe('ViewSystemEnhancementsComponent', () => {
  let component: ViewSystemEnhancementsComponent;
  let fixture: ComponentFixture<ViewSystemEnhancementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        SystemEnhancementsRoutingModule
      ],
      declarations: [
        ViewSystemEnhancementsComponent
      ]
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
