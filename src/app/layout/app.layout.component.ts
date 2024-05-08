import { Component, OnDestroy, Renderer2, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { LayoutService } from "./service/app.layout.service";
import { AppSidebarComponent } from "./app.sidebar.component";
import { AppTopBarComponent } from './app.topbar.component';
import { NewSideBarComponent } from './new-side-bar/new-side-bar.component';
import { NewTopBarComponent } from './new-top-bar/new-top-bar.component';
import { CommonService } from '../modules/common/services/common.service';
import { CommonModel } from '../modules/common/models/commonModel';
import { OverallCookieInterface } from '../modules/common/core/overallCookieInterface';
import { OverallCookieModel } from '../modules/common/core/overallCookieModel';

@Component({
    selector: 'app-layout',
    templateUrl: './app.layout.component.html'
})
export class AppLayoutComponent implements OnDestroy {

    mouseEnter: boolean = false;

    // Store total notification count
    ttlNotCount: number = 0;

    overlayMenuOpenSubscription: Subscription;

    menuOutsideClickListener: any;

    profileMenuOutsideClickListener: any;

    @ViewChild(NewSideBarComponent) appSidebar!: NewSideBarComponent;

    @ViewChild(NewTopBarComponent) appTopbar!: NewTopBarComponent;

    // Store common modal
    commonModal: CommonModel;

    // Store display menu top
    displayMenuTop: boolean = false;
    // Store the cookie interface
    overallCookieInterface: OverallCookieInterface;

    constructor(public layoutService: LayoutService, public renderer: Renderer2, public router: Router, private commonService: CommonService) {
        debugger
        // Check if the module redirect is there
        if (localStorage.getItem("MODULE$REDIRECT")) {
            // Getting the redirect url
            let redirectUrl = localStorage.getItem("MODULE$REDIRECT");
            // Remove the local storage
            localStorage.removeItem("MODULE$REDIRECT");
            // Redirect the url
            this.router.navigate([redirectUrl]);
        }

        this.commonModal = new CommonModel(this.commonService);
        this.overallCookieInterface = new OverallCookieModel();

        this.overlayMenuOpenSubscription = this.layoutService.overlayOpen$.subscribe(() => {
            if (!this.menuOutsideClickListener) {
                this.menuOutsideClickListener = this.renderer.listen('document', 'click', event => {
                    const isOutsideClicked = !(this.appSidebar.el.nativeElement.isSameNode(event.target) || this.appSidebar.el.nativeElement.contains(event.target)
                        || this.appTopbar.menuButton.nativeElement.isSameNode(event.target) || this.appTopbar.menuButton.nativeElement.contains(event.target));

                    if (isOutsideClicked) {
                        this.hideMenu();
                    }
                });
            }

            if (!this.profileMenuOutsideClickListener) {
                this.profileMenuOutsideClickListener = this.renderer.listen('document', 'click', event => {
                    const isOutsideClicked = !(this.appTopbar.menu.nativeElement.isSameNode(event.target) || this.appTopbar.menu.nativeElement.contains(event.target)
                        || this.appTopbar.topbarMenuButton.nativeElement.isSameNode(event.target) || this.appTopbar.topbarMenuButton.nativeElement.contains(event.target));

                    if (isOutsideClicked) {
                        this.hideProfileMenu();
                    }
                });
            }

            if (this.layoutService.state.staticMenuMobileActive) {
                this.blockBodyScroll();
            }
        });

        this.router.events.pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => {
                this.hideMenu();
                this.hideProfileMenu();
            });
    }

    hideMenu() {
        this.layoutService.state.overlayMenuActive = false;
        this.layoutService.state.staticMenuMobileActive = false;
        this.layoutService.state.menuHoverActive = false;
        if (this.menuOutsideClickListener) {
            this.menuOutsideClickListener();
            this.menuOutsideClickListener = null;
        }
        this.unblockBodyScroll();
    }

    hideProfileMenu() {
        this.layoutService.state.profileSidebarVisible = false;
        if (this.profileMenuOutsideClickListener) {
            this.profileMenuOutsideClickListener();
            this.profileMenuOutsideClickListener = null;
        }
    }

    blockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.add('blocked-scroll');
        }
        else {
            document.body.className += ' blocked-scroll';
        }
    }

    unblockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.remove('blocked-scroll');
        }
        else {
            document.body.className = document.body.className.replace(new RegExp('(^|\\b)' +
                'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }

    get containerClass() {
        return {
            'layout-theme-light': this.layoutService.config().colorScheme === 'light',
            'layout-theme-dark': this.layoutService.config().colorScheme === 'dark',
            'layout-overlay': this.layoutService.config().menuMode === 'overlay',
            'layout-static': this.layoutService.config().menuMode === 'static',
            'layout-static-inactive': this.layoutService.state.staticMenuDesktopInactive && this.layoutService.config().menuMode === 'static',
            'layout-overlay-active': this.layoutService.state.overlayMenuActive,
            'layout-mobile-active': this.layoutService.state.staticMenuMobileActive,
            'p-input-filled': this.layoutService.config().inputStyle === 'filled',
            'p-ripple-disabled': !this.layoutService.config().ripple
        }
    }

    ngOnDestroy() {
        if (this.overlayMenuOpenSubscription) {
            this.overlayMenuOpenSubscription.unsubscribe();
        }

        if (this.menuOutsideClickListener) {
            this.menuOutsideClickListener();
        }
    }

    mouseEnterOnSidebar() {
        this.mouseEnter = true;
        this.getGlobalNotesNotCount();
    }

    mouseLeaveOnSidebar() {
        this.mouseEnter = false;
    }

    // Get global notes notification count
    getGlobalNotesNotCount() {
        this.commonModal.GetNotificationCount('TOTAL', this.overallCookieInterface.GetUserId()).then(
            (data: number) => {
                // Set notification count
                this.ttlNotCount = data;
            }
        );
    }

    // Toggle menu navigation
    toggleMenus(event) {
        this.displayMenuTop = !this.displayMenuTop;
    }
}
