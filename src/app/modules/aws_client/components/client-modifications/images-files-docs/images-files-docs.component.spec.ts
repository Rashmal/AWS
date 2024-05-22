import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesFilesDocsComponent } from './images-files-docs.component';

describe('ImagesFilesDocsComponent', () => {
  let component: ImagesFilesDocsComponent;
  let fixture: ComponentFixture<ImagesFilesDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImagesFilesDocsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImagesFilesDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
