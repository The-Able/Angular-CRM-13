import {Component} from '@angular/core';
import {GridColumnsListGuids} from '../../../../models/grid-columns-list-guids';
import {FarmService} from '../../../../services/farm/farm.service';
import {DropdownGuids} from '../../../../models/dropdown-guids.enum';
import {Router} from '@angular/router';


@Component({
    selector: 'app-filter-grid-test-2',
    templateUrl: './filter-grid-test-2.component.html',
    styleUrls: ['./filter-grid-test-2.component.scss']
})
export class FilterGridTest2Component {

    public config = {
        grid: GridColumnsListGuids.FARM_GRID,
        column: GridColumnsListGuids.FARM_GRID,
        filter: GridColumnsListGuids.FARM_GRID,
        quickSearchTypeOption: DropdownGuids.QSTYPE_OPTIONS_FARM_LIST,
    };

    get dataFetcherMethod() {
        return (param) => this.farmsService.farmsListGrid(param);
    }

    get dataExportMethod() {
        return (param) => this.farmsService.fetchExportData(param);
    }

    constructor(private farmsService: FarmService, private router: Router) {

    }

    onViewActionClick(event) {
        this.router.navigateByUrl(`/Farm/FarmMaster/${event.docId}`, {
            state: {
                activeFilters: event.activeFilters,
                offset: event.grid.previousRequestParams.request.startRow,
            },
        });
    }

}
