import { Component, OnInit } from '@angular/core';
import { DisplayClientDetails } from '../../core/client';
import { ContactType } from 'src/app/modules/common/core/contactType';
import { SelectItem } from 'primeng/api';
import { Router } from '@angular/router';
import { ClientModel } from '../../models/clientModel';
import { ClientService } from '../../services/client.service';
import { Filter } from 'src/app/modules/common/core/filters';


@Component({
    selector: 'app-client-list',
    templateUrl: './client-list.component.html',
    styleUrl: './client-list.component.scss',
})
export class ClientListComponent implements OnInit {
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

    constructor(private route: Router, private clientService: ClientService) {
        this.clientModel = new ClientModel(this.clientService);
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
            ['/layout/client/client_main/client_mod'],
            {
                state: {
                    ClientId: clientId,
                    EditingMode: type,
                },
            }
        );
    }

    //Get display client list from db
    getDisplayClientList(){
        //Call service to get data
        this.clientModel.GetDisplayClientDetails(this.filter, 0).then(
            (data: DisplayClientDetails[]) => {
                if(data){
                    this.clientList = data;
                }
            }
        );
    }

    //On change filter
    onChangeFilter(type: string){
        this.getDisplayClientList();
    }
}
