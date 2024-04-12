import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalNotesComponent } from './global-notes.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabViewComponent } from '../../common/components/tab-view/tab-view.component';
import { GlobalNotesRoutingModule } from '../globalNotesRouting.module';

describe('GlobalNotesComponent', () => {
  let component: GlobalNotesComponent;
  let fixture: ComponentFixture<GlobalNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        GlobalNotesRoutingModule,
        TabViewComponent
      ],
      declarations: [
        GlobalNotesComponent
      ]
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
