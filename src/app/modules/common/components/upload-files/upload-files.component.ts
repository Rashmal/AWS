import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-upload-files',
    templateUrl: './upload-files.component.html',
    styleUrl: './upload-files.component.scss',
})
export class UploadFilesComponent {
    files: File[] = [];

    // Constructor
    constructor(
        public ref: DynamicDialogRef,
        private config: DynamicDialogConfig
    ) { }

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

    // On click on confirmation button
    closePopup(status: boolean) {
        this.ref.close(null);
    }

    // On click upload
    uploadPopup(status: boolean) {
        this.ref.close(this.files);
    }
}
