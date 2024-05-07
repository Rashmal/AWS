import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Module } from 'src/app/modules/common/core/module';
import { OverallCookieInterface } from 'src/app/modules/common/core/overallCookieInterface';
import { OverallCookieModel } from 'src/app/modules/common/core/overallCookieModel';
import { CommonModel } from 'src/app/modules/common/models/commonModel';
import { CommonService } from 'src/app/modules/common/services/common.service';

@Component({
    selector: 'app-module-selector',
    templateUrl: './module-selector.component.html',
    styleUrl: './module-selector.component.scss',
})
export class ModuleSelectorComponent implements OnInit {
    numbers: number[] = [];
    // Store the user role code
    userRoleCode: string = '';
    // Store the cookie interface
    overallCookieInterface: OverallCookieInterface;
    // Store common module
    commonModel: CommonModel;
    //Store module list
    moduleList: Module[] = [];
    constructor(private commonService: CommonService, private router: Router) {
        this.overallCookieInterface = new OverallCookieModel();
        // Setting the user role
        this.userRoleCode = this.overallCookieInterface
            .GetUserRole()
            .toUpperCase();
        this.commonModel = new CommonModel(this.commonService);
    }

    ngOnInit(): void {
        this.getModuleAccessList();
    }

    // Getting all the access list based on the user role for view
    getModuleAccessList() {
        this.commonModel
            .GetViewAccessListBasedUserRole(this.userRoleCode)
            .then((data: Module[]) => {
                this.moduleList = data;
            });
    }

    clickOnModule(module: Module) {
        //check it is accessible
        if (!module.IsDisable) {
            localStorage.setItem("MODULE$REDIRECT", module.RedirectUrl);
            // Navigate to the layout
            this.router.navigate(['/layout']);
        }
    }
}
