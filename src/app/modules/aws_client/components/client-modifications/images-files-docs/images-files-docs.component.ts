import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfigResourceTypeComponent } from './config-resource-type/config-resource-type.component';

import { ClientService } from '../../../services/client.service';
import { ClientModel } from '../../../models/clientModel';
import { Location } from '@angular/common';
import { Filter } from 'src/app/modules/common/core/filters';
import { ImageFiles } from '../../../core/imageFiles';
import { ResourceType } from '../../../core/resourceType';
import { OverallCookieInterface } from 'src/app/modules/common/core/overallCookieInterface';
import { OverallCookieModel } from 'src/app/modules/common/core/overallCookieModel';

@Component({
    selector: 'app-images-files-docs',
    templateUrl: './images-files-docs.component.html',
    styleUrl: './images-files-docs.component.scss',
    providers: [DialogService],
})
export class ImagesFilesDocsComponent implements OnInit {
    files: File[] = [];

    //Store filter settings
    filter: Filter = {
        Param1: 'ALL',
        SearchQuery: '',
        RecordsPerPage: 10,
        CurrentPage: 1,
        StaffId: '',
        PriorityId: 0,
        ModuleId: 0,
        StartDate: new Date(),
        EndDate: new Date(),
        Id: '',
        ParentId: 0,
        SortColumn: '',
        SortDirection: '',
        StatusId: 0,
    };
    // Store dynamic dialog ref
    ref: DynamicDialogRef | undefined;

    // Property to hold the image source URL
    imageSrc: string | ArrayBuffer | null =
        'https://media.istockphoto.com/id/628087738/photo/portrait-of-siberian-husky.jpg?b=1&s=170667a&w=0&k=20&c=KuMYvonNURC5RMD6iwJH3FhoLuBgIRZpgbhyKc9ioSM=';
        rotateAngle = 0;

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

    // Store the client model
    clientModel: ClientModel;
    // Store the modification mode
    modificationMode = 'NEW';
    // Store the selected client Id
    selectedClientId = 0;
    // Store images and file list
    imageFilesList: ImageFiles[] = [];
    // Store resource file types
    resourceTypes: ResourceType[] = [];
    selectedResourceType: ResourceType = {
        Code: '',
        Id: 0,
        Name: '',
        TotalRecords: 10,
    };
    // store current date
    currentDate = new Date();
    // Store filter resource type
    filterResourceType: ResourceType;
    // Store the cookie interface
    overallCookieInterface: OverallCookieInterface;

    constructor(
        public dialogService: DialogService,
        private location: Location,
        private clientService: ClientService
    ) {
        // Initialize the model
        this.clientModel = new ClientModel(this.clientService);
        this.overallCookieInterface = new OverallCookieModel();
    }

    ngOnInit(): void {
        // Getting the passed params
        let paramObject = this.location.getState();
        //Set editing mode
        if (paramObject['EditingMode']) {
            this.modificationMode = paramObject['EditingMode'];
        }
        //Set editing client id
        if (paramObject['ClientId']) {
            this.selectedClientId = paramObject['ClientId'];
            // Get all resource type
            this.getAllResourceFileTypes();
            // Get resources list
            this.getAllFiles();
        }
    }

    //Get All Resource File Types
    getAllResourceFileTypes() {
        // Call services
        this.clientModel
            .GetAllResourceFiles(this.selectedClientId, 0)
            .then((data: ResourceType[]) => {
                if (data) {
                    this.resourceTypes = data;
                }
            });
    }

    // Get all files from db based on client
    getAllFiles() {
        // Call services
        this.clientModel
            .GetAllImageDocFiles(this.filter, this.selectedClientId, 0)
            .then((data: ImageFiles[]) => {
                if (data) {
                    this.imageFilesList = data;
                }
            });
    }

    //On click add from global retirements
    onClickConfigResource() {
        // Open popup to select user roles
        this.ref = this.dialogService.open(ConfigResourceTypeComponent, {
            header: 'Config Resource Type',
            //Send user roles to popup
            data: { clientId: this.selectedClientId },
        });
        // Perform an action on close the popup
        this.ref.onClose.subscribe((configs: any[]) => {
            this.getAllResourceFileTypes();
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
    uploadSelected(event: any) {
        //Setting the form data
        const frmDataObj = new FormData();
        // Loop through the files
        for (let i = 0; i < this.files.length; i++) {
            frmDataObj.append('fileUpload', this.files[i]);
        }
        // End of Loop through the files
        this.clientModel
            .UploadImageDocFile(
                frmDataObj,
                this.selectedResourceType.Id,
                this.selectedClientId,
                0,
                this.overallCookieInterface.GetUserId()
            )
            .then((data: string) => {
                this.getAllFiles();
                this.files = [];
            });
    }

    // Update image file item
    updateImageDocFile(item: ImageFiles) {
        this.clientModel
            .UpdateImageDocFile(item, this.selectedClientId, 0, this.overallCookieInterface.GetUserId())
            .then((data) => {
                this.getAllFiles();
            });
    }
    //Remove image file item
    removeImageDocFile(item: ImageFiles) {
        this.clientModel
            .RemoveImageDocFile(item.Id, this.selectedClientId, 0)
            .then((data) => {
                this.getAllFiles();
            });
    }
    //Rotate image
    rotateImage(item: ImageFiles, rotate: string) {
        this.rotateAngle = item.RotateXY;

        // Rotate image anti-clockwise
        if (rotate === 'ACLW') {
            this.rotateAngle = (this.rotateAngle - 90 + 360) % 360;
        }
        // Rotate image clockwise
        else {
            this.rotateAngle = (this.rotateAngle + 90) % 360;
        }

        item.RotateXY = this.rotateAngle;
       
        this.updateImageDocFile(item);
    }

    //On change image file item data
    onChangeImageFileProperty(item: ImageFiles) {
        this.updateImageDocFile(item);
    }

    //Remove files before upload
    removeUploadedFile(index: number) {
        this.files.splice(index, 1);
    }

    //on change module list paginator
    onPageChange(event: any) {
        this.filter.CurrentPage = event.page + 1;
        this.getAllFiles();
    }

    // Zoom in image
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

    //Show image preview
    imagePreviewer(event: ImageFiles) {
        this.imageSrc = event.ResourceFile;
        this.rotateAngle = event.RotateXY;
        this.imagePreview = true;
    }
    //Hide image preview
    hidePreviewer() {
        this.imageSrc = '';
        this.rotateAngle = 0;
        this.imagePreview = false;
        this.transform = 'scale(1)';
        this.scale = 1;
        this.position = { x: 0, y: 0 };
    }

    //On change filter
    changeFilter() {
        this.filter.StatusId = this.filterResourceType.Id;
        this.getAllFiles();
    }
}
