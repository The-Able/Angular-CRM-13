import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';

import {BehaviorSubject} from 'rxjs';
import {IServerDropdownOption} from '../../../../models/server-dropdown';
import {updateSelectionMultiOptionsFilter} from '../../../../helpers/update-selection-multi-option-filter';
import {updateSelectionSingleOptionFilter} from '../../../../helpers/update-selection-single-option-filter';

export interface IActiveFilter {
    value: IServerDropdownOption[];
    group: string;
}

export type FilterType = 'single' | 'multi';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy, OnChanges {
  

    alive = true;
    updateSelectionSingleOptionFilter = updateSelectionSingleOptionFilter;
    updateSelectionMultiOptionFilter = updateSelectionMultiOptionsFilter;
    @Input() group: string;
    @Input() reset: boolean;
    @Input() type: FilterType = 'single';
    @Input() gridGuid: string;
    @Input() resetFiltersFunc: (filters: IServerDropdownOption[]) => IServerDropdownOption[];
    /**
     * Filters
     */
    private _filters: IServerDropdownOption[] = [];
    
    changeFilter: BehaviorSubject<IActiveFilter>;
    @Input() set filters(filters: IServerDropdownOption[]) {
        this._filters = filters && filters.length ? [...filters] : [];
    }
    isReload: number = 0;

    get filters() {
        return this._filters;
    }

    ngOnInit() {
    var pageType;
    if (window.performance.getEntriesByType("navigation")){
        pageType=window.performance.getEntriesByType("navigation")[0];
        if (pageType.type=='navigate' || pageType.type=='reload' || pageType.type=='back_forward'){this.isReload=1}
     }
        const initialFilter = this.getSelected(this.filters, this.type);

        this.changeFilter = new BehaviorSubject<IActiveFilter>({
            group: this.group,
            value: initialFilter,
        });
    }

    resetFilter(){
        if(this.changeFilter.value.group.toLowerCase() == "tracts"){
            this.changeFilter.value.value.forEach((val) => {
                this.filterChanged(val,undefined,true)
            })
        }
        else{
            this.filterChanged(this.filters[0],undefined,true)
        }
    }
    trackBy(index, item) {
        return item.value;
    }

    ngOnDestroy(): void {
        this.alive = false;
        this.changeFilter.unsubscribe();
    }

    get isSingle() {
        return this.type && this.type === 'single';
    }

    get isMulti() {
        return this.type && this.type === 'multi';
    }

    ngOnChanges(): void {
        if(this.reset){
            this.resetFilter()
        }
    }

    filterChanged(filter: IServerDropdownOption, event : any, isReset: boolean=false) {
        let isSelected : boolean
        if(event && event.checkbox) {
            isSelected = event.checkbox.checked
            } else if ((event && event && event.radio) || (event && event.target && event.target.checked)) 
            {
                isSelected = event.radio ? event.radio.checked : event.target.checked;
            }

            if(event == true){
                isSelected = filter.selected;
            }
            if (isSelected || (isReset && this.changeFilter.value.group.toLowerCase() !== "tracts")) {
                this.select(filter);
            }
             else {
                this.deSelect(filter);
            
             }
            // =============================Update localstorage=================================
            let gridFilters = JSON.parse(localStorage.getItem('gridFilters'));
            if (!gridFilters || !gridFilters.length) {
                gridFilters = [];
            }
            let storedFilters: any = gridFilters.find(x => x.gridGuid === this.gridGuid);

           

            if (storedFilters && storedFilters.activeFilters) {
                let group = storedFilters.activeFilters.find(x => x.group.toLowerCase() === this.changeFilter.value.group.toLowerCase());
                if (group) {

                    console.log('Is reload : ' + this.isReload)

                    if(filter.type.toLowerCase() === 'multi'){
                        console.log('Group Multi : ' + JSON.stringify(group.value))
                        var data = group.value.filter(obj => obj.value !== filter.value);
                        let i = 0;
                        group.value = [];
                        while (i < data.length){
                                
                            group.value.push(data[i])
                            i++
                          }

                        if(filter.selected !== false)
                        {
                            
                 
                            console.log('Should add filter : ' + filter.selected )
                            console.log(filter)
                                group.value.push(filter);
                        }
                    } else {
                        console.log('Group Single : ' + JSON.stringify(group))
                        group.value = [];
                        group.value.push(filter);

                    }



                } else {
                    group = {value: [], group: ''};
                    group.value = [];
                    group.group = this.changeFilter.value.group
                    group.value.push(filter);
                    storedFilters.activeFilters.push(group);
                }
            } else {
                const ActiveFilter: IActiveFilter[] = [];
                const value: IServerDropdownOption[] = [];
                value.push(filter);
                ActiveFilter.push({value: value, group: this.changeFilter.value.group});
                storedFilters = {activeFilters: ActiveFilter};
                storedFilters.gridGuid = this.gridGuid;
                gridFilters.push(storedFilters)
            }
 
            localStorage.setItem('gridFilters', JSON.stringify(gridFilters));
            // =============================Update localstorage=================================
    }

    select(filter: IServerDropdownOption) {
        // set selection on filter
        filter.selected = true;
        this.filters = this.updateFilterSelection({
            filters: this.filters,
            changedFilter: filter,
            type: this.type,
        });
        this.changeFilter.next({
            group: this.group,
            value: this.getSelected(this.filters, this.type),
        });
    }

    deSelect(filter: IServerDropdownOption) {
        // set selection on filter
        filter.selected = false;
        this.filters = this.updateFilterSelection({
            filters: this.filters,
            changedFilter: filter,
            type: this.type,
        });

        this.changeFilter.next({
            group: this.group,
            value: this.getSelected(this.filters, this.type),
        });
    }

    private updateFilterSelection(params: {
        filters: IServerDropdownOption[],
        changedFilter: IServerDropdownOption,
        type: FilterType,
    }) {
        switch (params.type) {
            case 'multi':
                return this.updateSelectionMultiOptionFilter(params.filters, params.changedFilter);
            // break;

            case 'single':
                // if no filter is selected and resetFiltersFunc was passed in, call it.
                if (this.resetFiltersFunc && !params.changedFilter.selected) {
                    return this.resetFiltersFunc(this.filters);
                }
                return this.updateSelectionSingleOptionFilter(params.filters, params.changedFilter);
            // break;

            default:
                console.warn('Trying to update filter of unknown type');
                break;
        }
    }

    private getSelected(filters: IServerDropdownOption[], type: FilterType) {
        switch (type) {
            case 'multi':
                return filters.filter(f => f.selected);

            case 'single':
                const selected = filters.find(f => f.selected);
                // to avoid returning something like this [undefined]
                return selected ? [selected] : [];

            default:
                console.error('Trying to get selected of unknown filter type: ', {type});
                return [];
        }
    }
}