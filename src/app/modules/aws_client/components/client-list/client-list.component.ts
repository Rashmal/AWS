import { Component, OnInit } from '@angular/core';
import { DisplayClientDetails } from '../../core/client';
import { ContactType } from 'src/app/modules/common/core/contactType';
import { SelectItem } from 'primeng/api';
import { Filter } from '../../core/filter';
import { Router } from '@angular/router';


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
        { label: 'Supplier', value: 'SUP' },
        { label: 'Client', value: 'CLI' },
        { label: 'Subcontractor', value: 'SUB' },
    ];
    //Store clients
    clientList: DisplayClientDetails[] = [
        {
            Id: 1,
            CreatedBy: 'Alice Johnson',
            CreatedDate: new Date('2023-01-15T09:30:00'),
            FullName: 'John Doe',
            Contacts: [
                {
                    Id: 101,
                    Name: "John's Email",
                    ContactValue: 'john.doe@example.com',
                    Contact: 'Email',
                    ContactType: this.contactTypes[0],
                },
                {
                    Id: 102,
                    Name: "John's Phone",
                    ContactValue: '+1234567890',
                    Contact: 'Phone',
                    ContactType: this.contactTypes[1],
                },
            ],
            PaymentTerm: 'Net 30',
            BillingAddress: '1234 Elm Street, Springfield, IL, 62704',
            FinancialNotes: 'Preferred payment method is bank transfer.',
            ExpenseAccount: 'EXP-4567',
            TotalRecords: 15,
        },
        {
            Id: 2,
            CreatedBy: 'Bob Smith',
            CreatedDate: new Date('2023-02-20T14:45:00'),
            FullName: 'Jane Smith',
            Contacts: [
                {
                    Id: 103,
                    Name: "Jane's Email",
                    ContactValue: 'jane.smith@example.com',
                    Contact: 'Email',
                    ContactType: this.contactTypes[0],
                },
                {
                    Id: 104,
                    Name: "Jane's Office Phone",
                    ContactValue: '+1987654321',
                    Contact: 'Phone',
                    ContactType: this.contactTypes[1],
                },
            ],
            PaymentTerm: 'Net 45',
            BillingAddress: '5678 Oak Avenue, Metropolis, NY, 10001',
            FinancialNotes: 'Send invoices by email.',
            ExpenseAccount: 'EXP-8910',
        },
        {
            Id: 3,
            CreatedBy: 'Clara Oswald',
            CreatedDate: new Date('2023-03-10T11:20:00'),
            FullName: 'Peter Parker',
            Contacts: [
                {
                    Id: 105,
                    Name: "Peter's Mobile",
                    ContactValue: '+1098765432',
                    Contact: 'Phone',
                    ContactType: this.contactTypes[1],
                },
                {
                    Id: 106,
                    Name: "Peter's Work Email",
                    ContactValue: 'peter.parker@dailybugle.com',
                    Contact: 'Email',
                    ContactType: this.contactTypes[0],
                },
            ],
            PaymentTerm: 'Net 60',
            BillingAddress: '7890 Maple Lane, Gotham, NJ, 07001',
            FinancialNotes: 'Requires a purchase order number on invoices.',
            ExpenseAccount: 'EXP-1234',
        },
        {
            Id: 4,
            CreatedBy: 'David Tennant',
            CreatedDate: new Date('2023-04-01T10:00:00'),
            FullName: 'Bruce Wayne',
            Contacts: [
                {
                    Id: 107,
                    Name: "Bruce's Email",
                    ContactValue: 'bruce.wayne@wayneenterprises.com',
                    Contact: 'Email',
                    ContactType: this.contactTypes[0],
                },
                {
                    Id: 108,
                    Name: "Bruce's Mobile",
                    ContactValue: '+1122334455',
                    Contact: 'Phone',
                    ContactType: this.contactTypes[1],
                },
            ],
            PaymentTerm: 'Net 30',
            BillingAddress: '1007 Mountain Drive, Gotham, NJ, 07001',
            FinancialNotes: 'Send invoices to the finance department.',
            ExpenseAccount: 'EXP-7890',
        },
        {
            Id: 5,
            CreatedBy: 'Emma Watson',
            CreatedDate: new Date('2023-05-18T13:30:00'),
            FullName: 'Clark Kent',
            Contacts: [
                {
                    Id: 109,
                    Name: "Clark's Email",
                    ContactValue: 'clark.kent@dailyplanet.com',
                    Contact: 'Email',
                    ContactType: this.contactTypes[0],
                },
                {
                    Id: 110,
                    Name: "Clark's Work Phone",
                    ContactValue: '+1223344556',
                    Contact: 'Phone',
                    ContactType: this.contactTypes[1],
                },
            ],
            PaymentTerm: 'Net 45',
            BillingAddress: '344 Clinton Street, Metropolis, NY, 10001',
            FinancialNotes: 'Contact finance for payment inquiries.',
            ExpenseAccount: 'EXP-3456',
        },
        {
            Id: 6,
            CreatedBy: 'Sophia Brown',
            CreatedDate: new Date('2023-06-25T16:00:00'),
            FullName: 'Diana Prince',
            Contacts: [
                {
                    Id: 111,
                    Name: "Diana's Email",
                    ContactValue: 'diana.prince@themiscira.gov',
                    Contact: 'Email',
                    ContactType: this.contactTypes[0],
                },
                {
                    Id: 112,
                    Name: "Diana's Mobile",
                    ContactValue: '+1234567891',
                    Contact: 'Phone',
                    ContactType: this.contactTypes[1],
                },
            ],
            PaymentTerm: 'Net 60',
            BillingAddress: 'Themyscira Island, Greece',
            FinancialNotes: 'No special payment notes.',
            ExpenseAccount: 'EXP-5678',
        },
        {
            Id: 7,
            CreatedBy: 'Liam Johnson',
            CreatedDate: new Date('2023-07-10T09:45:00'),
            FullName: 'Tony Stark',
            Contacts: [
                {
                    Id: 113,
                    Name: "Tony's Email",
                    ContactValue: 'tony.stark@starkindustries.com',
                    Contact: 'Email',
                    ContactType: this.contactTypes[0],
                },
                {
                    Id: 114,
                    Name: "Tony's Phone",
                    ContactValue: '+1321654987',
                    Contact: 'Phone',
                    ContactType: this.contactTypes[1],
                },
            ],
            PaymentTerm: 'Net 30',
            BillingAddress: '10880 Malibu Point, Malibu, CA, 90265',
            FinancialNotes: 'Prefers electronic invoices.',
            ExpenseAccount: 'EXP-6789',
        },
        {
            Id: 8,
            CreatedBy: 'Olivia Wilson',
            CreatedDate: new Date('2023-08-05T14:30:00'),
            FullName: 'Natasha Romanoff',
            Contacts: [
                {
                    Id: 115,
                    Name: "Natasha's Email",
                    ContactValue: 'natasha.romanoff@shield.gov',
                    Contact: 'Email',
                    ContactType: this.contactTypes[0],
                },
                {
                    Id: 116,
                    Name: "Natasha's Mobile",
                    ContactValue: '+1123456789',
                    Contact: 'Phone',
                    ContactType: this.contactTypes[1],
                },
            ],
            PaymentTerm: 'Net 45',
            BillingAddress: 'S.H.I.E.L.D. Headquarters, New York, NY, 10001',
            FinancialNotes:
                'Send payment confirmations to accounts@shield.gov.',
            ExpenseAccount: 'EXP-7891',
        },
        {
            Id: 9,
            CreatedBy: 'James Smith',
            CreatedDate: new Date('2023-09-15T11:15:00'),
            FullName: 'Steve Rogers',
            Contacts: [
                {
                    Id: 117,
                    Name: "Steve's Email",
                    ContactValue: 'steve.rogers@avengers.com',
                    Contact: 'Email',
                    ContactType: this.contactTypes[0],
                },
                {
                    Id: 118,
                    Name: "Steve's Phone",
                    ContactValue: '+1987456123',
                    Contact: 'Phone',
                    ContactType: this.contactTypes[1],
                },
            ],
            PaymentTerm: 'Net 60',
            BillingAddress: '890 5th Avenue, New York, NY, 10021',
            FinancialNotes: 'Requires receipt of payment.',
            ExpenseAccount: 'EXP-8910',
        },
        {
            Id: 10,
            CreatedBy: 'Mia Davis',
            CreatedDate: new Date('2023-10-20T15:00:00'),
            FullName: 'Bruce Banner',
            Contacts: [
                {
                    Id: 119,
                    Name: "Bruce's Email",
                    ContactValue: 'bruce.banner@avengers.com',
                    Contact: 'Email',
                    ContactType: this.contactTypes[0],
                },
                {
                    Id: 120,
                    Name: "Bruce's Mobile",
                    ContactValue: '+1876543210',
                    Contact: 'Phone',
                    ContactType: this.contactTypes[1],
                },
            ],
            PaymentTerm: 'Net 30',
            BillingAddress: '8400 Wilshire Blvd, Los Angeles, CA, 90211',
            FinancialNotes: 'Contact before making large payments.',
            ExpenseAccount: 'EXP-2345',
        },
    ];
    //Store filter settings
    filter: Filter = {
        Type: { label: 'All', value: 'ALL' },
        Search: '',
        ItemsPerPage: 10,
        CurrentPage: 1,
    };

    constructor(private route: Router) {}

    ngOnInit(): void {
     
    }

    //on change module list paginator
    onPageChange(event: any) {}

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
}
