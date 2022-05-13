import {NgModule} from '@angular/core';
import {CustomAgGridModule} from '../../modules/custom-ag-grid/custom-ag-grid.module';
import {AddEmailActionDirective} from './directives/add-email-action.directive';
import {ModalAddEmailComponent} from './components/modal-add-email/modal-add-email.component';
import {FormCreateEmailComponent} from './components/form-create-email/form-create-email.component';
import {ActionAddEmailComponent} from './components/action-add-email/action-add-email.component';
import {EmailsListComponent} from './components/emails-list/emails-list.component';
import {EmailEditComponent} from './components/email-edit/email-edit.component'

const ENTRY_COMPONENTS = [
    ModalAddEmailComponent,
    EmailEditComponent
];

const COMPONENTS = [
    FormCreateEmailComponent,
    ActionAddEmailComponent,
    EmailsListComponent,
    ...ENTRY_COMPONENTS,
];

const DIRECTIVES = [
    AddEmailActionDirective,
];

@NgModule({
    imports: [
        CustomAgGridModule,
    ],
    declarations: [...COMPONENTS, ...DIRECTIVES],
    exports: [...COMPONENTS, ...DIRECTIVES, CustomAgGridModule]
})

export class EmailWidgetsModule {
}
