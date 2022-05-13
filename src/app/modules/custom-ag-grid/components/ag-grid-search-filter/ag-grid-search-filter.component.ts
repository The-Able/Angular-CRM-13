import {Component, Input} from '@angular/core';
import {AgGridBaseComponent} from '../ag-grid-base/ag-grid-base.component';
import {IServerDropdownOption} from '../../../../models/server-dropdown';

export interface IAgGridSearchFilterResult {
    newValue: string;
    qstype?: string;
    qtypeText: string;
}

export interface OnSearchFilter {
    onSearchFilterChanged: (params: IAgGridSearchFilterResult) => void;
}

@Component({
    selector: 'app-ag-grid-search-filter',
    templateUrl: './ag-grid-search-filter.component.html',
    styleUrls: ['./ag-grid-search-filter.component.scss']
})
export class AgGridSearchFilterComponent {

    private qstype: string;
    private newValue: string;

    @Input() agGridBase: AgGridBaseComponent;
    @Input() qstypeOptions: IServerDropdownOption[];

    onSearchFilter() {
        console.log(this.qstypeOptions)
        console.log('ssssss',{newValue: this.newValue, qstype: this.qstype})
        const filter = this.qstypeOptions.find(x => x.value === this.qstype);
        let text = '';
        if (filter) {
            text = filter.name;
        }
        this.agGridBase.onSearchFilterChanged({newValue: this.newValue, qstype: this.qstype, qtypeText: text});
    }

    reset() {
        this.qstype = null;
        this.newValue = null;
        this.onSearchFilter();
    }
}
