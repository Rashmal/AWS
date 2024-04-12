import {
    ChangeDetectorRef,
    Component,
    HostBinding,
    Input,
    OnInit,
} from '@angular/core';

import {
    animate,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations';
import { Subscription, filter } from 'rxjs';
import { LayoutService } from '../service/app.layout.service';
import { Router, NavigationEnd } from '@angular/router';
import { MenuService } from '../app.menu.service';
import { Module } from 'src/app/modules/common/core/module';

@Component({
    selector: 'app-new-side-bar-item',
    templateUrl: './new-side-bar-item.component.html',
    styleUrl: './new-side-bar-item.component.scss',
    animations: [
        trigger('children', [
            state(
                'collapsed',
                style({
                    height: '0',
                })
            ),
            state(
                'expanded',
                style({
                    height: '*',
                })
            ),
            transition(
                'collapsed <=> expanded',
                animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')
            ),
        ]),
    ],
})
export class NewSideBarItemComponent implements OnInit {
    @Input() item: Module;

    @Input() index!: number;

    @Input() @HostBinding('class.layout-root-menuitem') root!: boolean;

    @Input() parentKey!: string;
    //On mouse enter on side bar
    @Input() mouseEnter: boolean = false;

    active = false;

    menuSourceSubscription: Subscription;

    menuResetSubscription: Subscription;

    key: string = '';

    constructor(
        public layoutService: LayoutService,
        private cd: ChangeDetectorRef,
        public router: Router,
        private menuService: MenuService
    ) {
        this.menuSourceSubscription = this.menuService.menuSource$.subscribe(
            (value) => {
                Promise.resolve(null).then(() => {
                    if (value.routeEvent) {
                        this.active =
                            value.key === this.key ||
                            value.key.startsWith(this.key + '-')
                                ? true
                                : false;
                    } else {
                        if (
                            value.key !== this.key &&
                            !value.key.startsWith(this.key + '-')
                        ) {
                            this.active = false;
                        }
                    }
                });
            }
        );

        this.menuResetSubscription = this.menuService.resetSource$.subscribe(
            () => {
                this.active = false;
            }
        );

        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe((params) => {
                if (this.item.RedirectUrl) {
                    this.updateActiveStateFromRoute();
                }
            });
    }

    ngOnInit() {
        this.key = this.parentKey
            ? this.parentKey + '-' + this.index
            : String(this.index);

        if (this.item.RedirectUrl) {
            this.updateActiveStateFromRoute();
        }
    }

    updateActiveStateFromRoute() {
        let activeRoute = this.router.isActive(this.item.RedirectUrl[0], {
            paths: 'exact',
            queryParams: 'ignored',
            matrixParams: 'ignored',
            fragment: 'ignored',
        });

        if (activeRoute) {
            this.menuService.onMenuStateChange({
                key: this.key,
                routeEvent: true,
            });
        }
    }

    itemClick(event: Event) {
        // avoid processing disabled items
        if (this.item.IsDisable) {
            event.preventDefault();
            return;
        }

        

        this.menuService.onMenuStateChange({ key: this.key });
    }

    get submenuAnimation() {
        return this.root ? 'expanded' : this.active ? 'expanded' : 'collapsed';
    }

    @HostBinding('class.active-menuitem')
    get activeClass() {
        return this.active && !this.root;
    }

    ngOnDestroy() {
        if (this.menuSourceSubscription) {
            this.menuSourceSubscription.unsubscribe();
        }

        if (this.menuResetSubscription) {
            this.menuResetSubscription.unsubscribe();
        }
    }
}
