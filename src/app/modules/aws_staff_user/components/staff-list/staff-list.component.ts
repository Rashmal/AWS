import { Component, OnInit } from '@angular/core';
import { ContactType } from 'src/app/modules/common/core/contactType';
import { SelectItem } from 'primeng/api';
import { Router } from '@angular/router';
import { Filter } from 'src/app/modules/common/core/filters';
import { OverallCookieInterface } from 'src/app/modules/common/core/overallCookieInterface';
import { OverallCookieModel } from 'src/app/modules/common/core/overallCookieModel';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DeleteConfirmationComponent } from 'src/app/modules/common/components/delete-confirmation/delete-confirmation.component';
import { ClientCustomer, DisplayClientDetails } from 'src/app/modules/aws_client/core/client';
import { ClientModel } from 'src/app/modules/aws_client/models/clientModel';
import { ClientService } from 'src/app/modules/aws_client/services/client.service';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrl: './staff-list.component.scss',
  providers: [DialogService],
})

export class StaffListComponent implements OnInit {
  contactTypes: ContactType[] = [
      { Id: 1, Name: 'Email', Code: 'EM' },
      { Id: 2, Name: 'Phone', Code: 'PH' },
  ];

  //Store Person status
  personTypes: SelectItem[] = [
      { label: 'All', value: 'ALL' },
      { label: 'Supplier', value: 'SP' },
      { label: 'Client', value: 'C' },
      { label: 'Subcontractor', value: 'SB' },
  ];
  //Store clients
  clientList: DisplayClientDetails[] = [];
  //Store filter settings
  filter: Filter = {

      CurrentPage: 1,
      EndDate: new Date(),
      Id: '',
      ModuleId: 0,
      ParentId: 0,
      PriorityId: 0,
      RecordsPerPage: 20,
      SearchQuery: '',
      SortColumn: '',
      SortDirection: 'DESC',
      StaffId: '',
      StartDate: new Date(),
      StatusId: 0,
      Param1: 'ALL'

  };

  //Store client model
  clientModel !: ClientModel;
  // Store the cookie interface
  overallCookieInterface: OverallCookieInterface;
  // Store the company Id
  companyId: number = 0;
  // Store dynamic dialog ref
  ref: DynamicDialogRef | undefined;

  constructor(private route: Router, private clientService: ClientService, public dialogService: DialogService) {
      this.clientModel = new ClientModel(this.clientService);
      this.overallCookieInterface = new OverallCookieModel();
  }

  ngOnInit(): void {
      //get client list
      this.getDisplayClientList();
  }

  //on change module list paginator
  onPageChange(event: any) {
      this.filter.CurrentPage = event.page + 1;
      this.getDisplayClientList();
  }

  //Click on client
  onClickClientModifications(type: string, clientId: number) {
      this.route.navigate(
          ['/layout/staff/staff_main/staff_mod'],
          {
              state: {
                  StaffId: clientId,
                  EditingMode: type,
              },
          }
      );
  }

  //Get display client list from db
  getDisplayClientList() {
      //Call service to get data
      this.clientModel.GetDisplayClientDetails(this.filter, 0).then(
          (data: DisplayClientDetails[]) => {
              if (data) {
                  this.clientList = data;
              }
          }
      );
  }

  //On change filter
  onChangeFilter(type: string) {
      this.getDisplayClientList();
  }

  //Get display client list from db
  onRemoveCLientCustomer(client: DisplayClientDetails) {
      // Open popup to confirm action
      this.ref = this.dialogService.open(DeleteConfirmationComponent, {
          header: 'Delete confirmation'
      });
      // Perform an action on close the popup
      this.ref.onClose.subscribe((confirmation: boolean) => {
          if (confirmation) {
              // Client object
              let clientCustomer: ClientCustomer = {
                  Id: client.Id,
                  BusinessName: '',
                  BusinessNumber: '',
                  BusinessNumberType: {
                      Id: 0,
                      Code: '',
                      Name: ''
                  },
                  FirstName: '',
                  MiddleInitial: ''
              };
              //Call service to get data
              this.clientModel.SetClientCustomer(clientCustomer, this.overallCookieInterface.GetUserId(), "RMV", this.companyId).then(
                  (data: DisplayClientDetails[]) => {
                      if (data) {
                          this.getDisplayClientList();
                      }
                  }
              );
          }
      });
  }
}