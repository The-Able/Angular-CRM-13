import { ContactsService } from './../../../../services/contacts/contacts.service';
import { Component, OnInit , Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { IServerDropdownOption } from '../../../../models/server-dropdown';
import { EmailService } from '../../../../services/email.service';
import { CouchbaseLookupService } from '../../../../services/couchbase-lookup.service';
import { DropdownGuids } from '../../../../models/dropdown-guids.enum';
import { ToasterService } from 'angular2-toaster';
import { IEmail } from '../../../../models/email';
import { takeWhile } from 'rxjs/operators';


@Component({
    selector: 'app-email-edit',
    templateUrl: './email-edit.component.html',
    styleUrls: ['./email-edit.component.scss']
})
export class EmailEditComponent implements OnInit {

  public items: string[] = [];
  DropDownData: IServerDropdownOption[]
  submitted = false;
  showMessages: any = {};
  errors: string[] = [];
  messages: string[] = [];
  parentId: string

  emailTypeOptions$: Observable<Array<IServerDropdownOption>>;
  emailSourceOptions$: Observable<Array<IServerDropdownOption>>;
  public form: FormGroup;
  guids = DropdownGuids;
  email: IEmail
  bounce: boolean
  saveBttn: string
  alive = true;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<EmailEditComponent>,
    private emailService: EmailService,
    private cbLookupService: CouchbaseLookupService,
    private contactsService: ContactsService,
    private toasterService: ToasterService,
    fb: FormBuilder
    ) {
    this.form = fb.group({
        id: [''],
        parentId: [''],
        type: ['', Validators.required],
        address: ['', Validators.required],
        name: [''],
        otherLabel: [''],
        dflt: [''],
        dnmm: [''],
        bounce: [''],
        source: [''],
    });
    this.emailTypeOptions$ = this.emailService.emailTypeOptions();
    this.emailSourceOptions$ = this.cbLookupService.getOptions(this.guids.EMAIL_PHONE_SOURCE);

  }

ngOnInit(): void {
    this.parentId = this.data.ParentId;
    if (this.data.mode === 'edit') {
        console.log('This will be an Edit')
        this.saveBttn = 'Update'
        this.fetchContactInfo(this.data.ParentId, this.data.DocId)
        this.setFormValues()
    }

    if (this.data.mode === 'new') {
        this.parentId = this.data.ParentId;
        this.form.controls['parentId'].setValue(this.parentId)
        console.log('This will be a New Address')
        this.saveBttn = 'Create'
    }


}
  public onSubmit() {
    this.dialogRef.close();
  }

  getTempData() {
    return of(this.DropDownData);
  }



  fetchContactInfo( parentId: string, emailId: string) {
    this.contactsService.getEmailDetail(parentId, emailId).subscribe(
        res =>  {
        this.form.controls['parentId'].setValue(parentId)
        this.form.controls['id'].setValue(res.id)
        this.form.controls['address'].setValue(res.address),
        this.form.controls['name'].setValue(res.name)
        this.form.controls['type'].setValue(res.type)
        this.form.controls['otherLabel'].setValue(res.otherLabel)
        this.form.controls['source'].setValue(res.source)
        this.form.controls['bounce'].setValue(res.bounce)
        this.form.controls['dnmm'].setValue(res.dnmm)
        this.form.controls['dflt'].setValue(res.dflt)


        }


    )

  }

  setFormValues() {
    // this.form.controls['address'].setValue('Test Value')

  }



  create(formData: IEmail) {
    this.errors = this.messages = [];
    this.submitted = true;

    let operation$: Observable<any>;
    operation$ = this.saveBttn === 'Update' ?
        this.emailService.update({emailId: formData.id , formData}) :
        this.emailService.create(formData);

    operation$
        .pipe(
            takeWhile(_ => this.alive),
        )
        .subscribe((res: any) => {
                if (res.Success === true) {
                    this.toasterService.pop('success', 'Success!', res.Message);
                    this.submitted = true;
                    // update formData id with id returned by api if current operation is create
                    if (this.saveBttn === 'Create') {
                    formData.id = res.Data && res.Data.id || formData.id;
                    }
                    this.saveBttn = 'Update';
                    this.form.markAsPristine()
                } else {
                    this.submitted = false;
                    this.showMessages.error = true;
                    this.toasterService.pop('error', res.Message);
                    this.errors = [res.Message];
                }
            },
            (error) => {
                console.log(error)
                this.submitted = false;
                this.toasterService.pop('error', 'Something went wrong!', 'Please try again.');
            },
        );
}
// tslint:disable-next-line: use-life-cycle-interface
ngOnDestroy() {
    this.alive = false;
}

closeDialog() {
    this.dialogRef.close({mode: this.saveBttn , reload: this.submitted, data: this.form.value});
  }

}
