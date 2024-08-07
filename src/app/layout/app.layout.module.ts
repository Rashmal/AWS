import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { BadgeModule } from 'primeng/badge';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RippleModule } from 'primeng/ripple';
import { AppMenuComponent } from './app.menu.component';
import { AppMenuitemComponent } from './app.menuitem.component';
import { RouterModule } from '@angular/router';
import { AppTopBarComponent } from './app.topbar.component';
import { AppFooterComponent } from './app.footer.component';
import { AppConfigModule } from './config/config.module';
import { AppSidebarComponent } from "./app.sidebar.component";
import { AppLayoutComponent } from "./app.layout.component";
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { NewSideBarItemComponent } from './new-side-bar-item/new-side-bar-item.component';
import { NewSideBarComponent } from './new-side-bar/new-side-bar.component';
import { NewTopBarComponent } from './new-top-bar/new-top-bar.component';
import { TooltipModule } from 'primeng/tooltip';
import { RouterTestingModule } from "@angular/router/testing";
import { TabMenuModule } from 'primeng/tabmenu';
import { ModuleSelectorComponent } from './common/module-selector/module-selector.component';
import { ReportBugComponent } from './common/report-bug/report-bug.component';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { MultiSelectModule } from 'primeng/multiselect';
import { EditorModule } from 'primeng/editor';

@NgModule({
    declarations: [
        AppMenuitemComponent,
        AppTopBarComponent,
        AppFooterComponent,
        AppMenuComponent,
        AppSidebarComponent,
        AppLayoutComponent,
        NewSideBarComponent,
        NewSideBarItemComponent,
        NewTopBarComponent,
        ModuleSelectorComponent,
        ReportBugComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        InputTextModule,
        SidebarModule,
        BadgeModule,
        RadioButtonModule,
        InputSwitchModule,
        RippleModule,
        RouterModule,
        AppConfigModule,
        OverlayPanelModule ,
        TooltipModule,
        TabMenuModule,
        DropdownModule,
        CalendarModule,
        TableModule,
        PaginatorModule,
        MultiSelectModule,
        EditorModule,
       
    ],
    exports: [AppLayoutComponent]
})
export class AppLayoutModule { }
