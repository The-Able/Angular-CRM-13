import {Injectable} from '@angular/core';
import {GridColumnsListGuids} from '../models/grid-columns-list-guids';
import {IAgGridSearchFilterResult} from '../modules/custom-ag-grid/components/ag-grid-search-filter/ag-grid-search-filter.component';

@Injectable({
    providedIn: 'root'
})

export class GridFiltersService {

    gridGuid = GridColumnsListGuids.FARM_GRID;
    constructor() {
    }

    setFilter(gridFilters) {
        localStorage.setItem('gridFilters', JSON.stringify(gridFilters));
    }
    updateFilter(filterResult: IAgGridSearchFilterResult) {
        // ===================Update Localstorage====================================
        let gridFilters = JSON.parse(localStorage.getItem('gridFilters'));

        if (!gridFilters || !gridFilters.length) {

            gridFilters = [];
        }


        let activeFilters: any = gridFilters.find(x => x.gridGuid === this.gridGuid);
        console.log(activeFilters);

        if (!activeFilters) {
            activeFilters = {};
            activeFilters.qsearch = filterResult.newValue;
            activeFilters.qstype = filterResult.qstype;
            activeFilters.qtypeText = filterResult.qtypeText;
            activeFilters.gridGuid = this.gridGuid;
            gridFilters.push(activeFilters);
        } else {
            // We have an update
            activeFilters.qsearch = filterResult.newValue;
            activeFilters.qstype = filterResult.qstype;
            activeFilters.qtypeText = filterResult.qtypeText;
        }
        localStorage.setItem('gridFilters', JSON.stringify(gridFilters));
    }

    getPreviousFilter(): IAgGridSearchFilterResult {
        const gridFilters = JSON.parse(localStorage.getItem('gridFilters'));
        if (gridFilters) {
            const activeFilters: any = gridFilters.find(x => x.gridGuid === this.gridGuid)
            if (activeFilters) {
                return activeFilters
            }
        }
    }
}