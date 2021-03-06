import {Component, ElementRef, OnDestroy} from '@angular/core';
import {IHeaderParams} from 'ag-grid-community';
import {IHeaderAngularComp} from 'ag-grid-angular';

interface MyParams extends IHeaderParams {
    menuIcon: string;
}

@Component({
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnDestroy, IHeaderAngularComp {
    public params: MyParams;
    public sorted: string;
    private elementRef: ElementRef;

    constructor(elementRef: ElementRef) {
        this.elementRef = elementRef;
    }

    refresh(params: IHeaderParams): boolean {
        return false;
    }

    agInit(params: MyParams): void {
        this.params = params;
        this.params.column.addEventListener('sortChanged', this.onSortChanged.bind(this));
        this.onSortChanged();
    }

    ngOnDestroy() {
        console.log(`Destroying HeaderComponent`);
    }

    onMenuClick() {
        this.params.showColumnMenu(this.querySelector('.customHeaderMenuButton'));
    }

    onSortRequested(order, event) {
        this.params.setSort(order, event.shiftKey);
    };

    onSortChanged() {
        if (this.params.column.isSortAscending()) {
            this.sorted = 'asc'
        } else if (this.params.column.isSortDescending()) {
            this.sorted = 'desc'
        } else {
            this.sorted = ''
        }
    };


    private querySelector(selector: string) {
        return <HTMLElement>this.elementRef.nativeElement.querySelector(
            '.customHeaderMenuButton', selector);
    }
}
