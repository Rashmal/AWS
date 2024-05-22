import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientModificationsComponent } from './client-modifications.component';

describe('ClientModificationsComponent', () => {
  let component: ClientModificationsComponent;
  let fixture: ComponentFixture<ClientModificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientModificationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientModificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
