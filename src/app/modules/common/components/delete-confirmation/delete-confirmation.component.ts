import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ViewSystemEnhancement } from 'src/app/modules/global_notes/global-notes/system_enhancements/core/systemEnhancementModels/viewSystemEnhancement';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrl: './delete-confirmation.component.scss',
  
})
export class DeleteConfirmationComponent {

  // Store enhancement
  enhancement !: ViewSystemEnhancement;

  // Constructor
  constructor(public ref: DynamicDialogRef, private config: DynamicDialogConfig) {
    if(JSON.stringify(this.config.data)){
      this.enhancement = <ViewSystemEnhancement>this.config.data;
      console.log(this.enhancement)
    }
   }

  // On click on confirmation button
  confirmDeleteItem(status: boolean){
    this.ref.close(status);
  }
}
