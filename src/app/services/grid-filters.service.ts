import {Injectable, ViewChild} from '@angular/core';
import {GridColumnsListGuids} from '../models/grid-columns-list-guids';
// import { AgGridBaseComponent } from '../modules/custom-ag-grid/components/ag-grid-base/ag-grid-base.component';
import {IAgGridSearchFilterResult} from '../modules/custom-ag-grid/components/ag-grid-search-filter/ag-grid-search-filter.component';

@Injectable({
    providedIn: 'root'
})

export class GridFiltersService {



    constructor() {
    }

    setFilter(gridFilters) {
        console.log('Calling Set Filter')
        localStorage.setItem('gridFilters', JSON.stringify(gridFilters));
    }
    updateFilter(filterResult: IAgGridSearchFilterResult, gridGuid: string) {
        console.log('Calling Set Update Filter')
        // ===================Update Localstorage====================================
        let gridFilters = JSON.parse(localStorage.getItem('gridFilters'));

        if (!gridFilters || !gridFilters.length) {

            gridFilters = [];
        }


        let activeFilters: any = gridFilters.find(x => x.gridGuid === gridGuid);
        console.log(activeFilters);

        if (!activeFilters) {
            activeFilters = {};
            activeFilters.qsearch = filterResult.newValue;
            activeFilters.qstype = filterResult.qstype;
            activeFilters.qtypeText = filterResult.qtypeText;
            activeFilters.gridGuid = gridGuid;
            gridFilters.push(activeFilters);
        } else {
            // We have an update
            activeFilters.qsearch = filterResult.newValue;
            activeFilters.qstype = filterResult.qstype;
            activeFilters.qtypeText = filterResult.qtypeText;
        }
        localStorage.setItem('gridFilters', JSON.stringify(gridFilters));
    }

    getPreviousFilter(gridGuid : string): IAgGridSearchFilterResult {
        console.log('Calling Get Privious Filter')
        const gridFilters = JSON.parse(localStorage.getItem('gridFilters'));
        if (gridFilters) {
            const activeFilters: any = gridFilters.find(x => x.gridGuid === gridGuid)
            if (activeFilters) {
                return activeFilters
            }
        }
    }

    loadSavedQuickSearch(gridGuid : string) {
        // Load Grid Filters From Storage
        const gridFilters = JSON.parse(localStorage.getItem('gridFilters'));
        // Check if there is Grid Filters in Local Store 
        if (gridFilters) {
            console.log('Load Quick Search via Service')
            // Get Object in GridFilters where the gridGuid matches the provided gridGuid
            let activeFilters: any = gridFilters.find(x => x.gridGuid === gridGuid)
            // If we have an active Filter and Quick Serach Data we will return them
            if (activeFilters && activeFilters.qstype && activeFilters.qsearch && activeFilters.qtypeText) {
                // TODO: Find a way to call a function on agGridBase component directly without having to return Data

                // this.agGridBase.onSearchFilterChanged({
                //     newValue: activeFilters.qsearch,
                //     qstype: activeFilters.qstype,
                //     qtypeText: activeFilters.qtypeText
                // });

                let filterData = { newValue: activeFilters.qsearch, qstype: activeFilters.qstype, qtypeText: activeFilters.qtypeText }
                console.log(filterData)
                return filterData
            }
           
        }
    }
}
