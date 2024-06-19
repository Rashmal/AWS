import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-action-confirmation',
    templateUrl: './action-confirmation.component.html',
    styleUrl: './action-confirmation.component.scss',
})
export class ActionConfirmationComponent {

    // Store the popup message
    popupMessage: string = "";

    // Constructor
    constructor(public ref: DynamicDialogRef, private config: DynamicDialogConfig) {
        if (JSON.stringify(this.config.data)) {
            this.popupMessage = <string>this.config.data;
        }
    }

    // On click on confirmation button
    confirmDeleteItem(status: boolean) {
        this.ref.close(status);
    }
}
