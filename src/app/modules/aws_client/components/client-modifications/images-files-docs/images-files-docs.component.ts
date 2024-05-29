import { Component } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfigResourceTypeComponent } from './config-resource-type/config-resource-type.component';
import { Filter } from '../../../core/filter';

@Component({
    selector: 'app-images-files-docs',
    templateUrl: './images-files-docs.component.html',
    styleUrl: './images-files-docs.component.scss',
    providers: [DialogService],
})
export class ImagesFilesDocsComponent {
    files: File[] = [];
    cities: any[] = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' },
    ];
    products: any[] = [
        {
            code: 'P001',
            name: 'Product 1',
            category: 'Category 1',
            TotalRecords: 10,
        },
        {
            code: 'P002',
            name: 'Product 2',
            category: 'Category 2',
            TotalRecords: 10,
        },
        {
            code: 'P003',
            name: 'Product 3',
            category: 'Category 3',
            TotalRecords: 10,
        },
    ];

    //Store filter settings
    filter: Filter = {
        Type: { label: 'All', value: 'ALL' },
        Search: '',
        ItemsPerPage: 10,
        CurrentPage: 1,
    };
    // Store dynamic dialog ref
    ref: DynamicDialogRef | undefined;

    // Property to hold the image source URL
    imageSrc: string | ArrayBuffer | null = 'https://media.istockphoto.com/id/628087738/photo/portrait-of-siberian-husky.jpg?b=1&s=170667a&w=0&k=20&c=KuMYvonNURC5RMD6iwJH3FhoLuBgIRZpgbhyKc9ioSM=';

   
    scale: number = 1;
    transform: string = 'scale(1)';
  
    // Position of the image
    position = { x: 0, y: 0 };
    // To keep track of dragging state
    isDragging = false;
    // To store the last position during dragging
    lastPosition = { x: 0, y: 0 };
    //store image preview
    imagePreview = false;

    constructor(public dialogService: DialogService) {}

    //On click add from global retirements
    onClickConfigResource() {
        // Open popup to select user roles
        this.ref = this.dialogService.open(ConfigResourceTypeComponent, {
            header: 'Config Resource Type',
            //Send user roles to popup
            data: [],
        });
        // Perform an action on close the popup
        this.ref.onClose.subscribe((userRoles: any[]) => {
            if (userRoles) {
                //Set selected user roles
            }
        });
    }

    // Handle files dropped into the upload container
    onFileDropped($event: FileList) {
        this.handleFiles($event);
    }

    // Handle files selected via the file input element
    onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files) {
            this.handleFiles(input.files);
        }
    }

    // Process the file list and add to the files array
    handleFiles(fileList: FileList) {
        for (let i = 0; i < fileList.length; i++) {
            this.files.push(fileList[i]);
        }
    }

    //Cancel file selection
    cancelSelection(event: any) {
        this.files = [];
    }

    //Upload selected files
    uploadSelected(event: any) {}

    //Remove files before upload
    removeUploadedFile(index: number) {
        this.files.splice(index, 1);
    }

    //on change module list paginator
    onPageChange(event: any) {}

    onMouseWheel(event: WheelEvent) {
        event.preventDefault();
        if (event.deltaY < 0) {
          this.scale *= 1.1;
        } else {
          this.scale /= 1.1;
        }
        this.transform = `scale(${this.scale})`;
      }
    
      onMouseDown(event: MouseEvent) {
        this.isDragging = true;
        this.lastPosition = { x: event.clientX, y: event.clientY };
      }
    
      onMouseUp(event: MouseEvent) {
        this.isDragging = false;
      }
    
      onMouseMove(event: MouseEvent) {
        if (this.isDragging) {
          const deltaX = event.clientX - this.lastPosition.x;
          const deltaY = event.clientY - this.lastPosition.y;
          this.position.x += deltaX;
          this.position.y += deltaY;
          this.lastPosition = { x: event.clientX, y: event.clientY };
        }
      }

    //Hide image pre view
    imagePreviewer(event: boolean){
        this.imagePreview = event;
    }
}
