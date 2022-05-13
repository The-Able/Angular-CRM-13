import {NgModule} from '@angular/core';
import {IgxExpansionPanelModule, IgxListModule} from 'igniteui-angular';
import {FilterModule} from '../../modules/filter/filter.module';
import {MenuGridComponent} from './components/menu-grid/menu-grid.component';
import {FilterGridModule} from '../filter-grid/filter-grid.module';
import {UserEditComponent} from './components/user-edit/user-edit.component'
import {AngularMaterialModule} from './../../modules/angular-material/angular-material.module'

// import { PasswordComponent } from '../../views/admin/components/password/password.component'


@NgModule({
    declarations: [
        MenuGridComponent,
        UserEditComponent


    ],
    imports: [
        IgxListModule,
        IgxExpansionPanelModule,
        FilterModule,
        FilterGridModule,
        AngularMaterialModule
    ],
    exports: [
        MenuGridComponent,
        UserEditComponent

    ],

})
export class AdminGridModule {
}
