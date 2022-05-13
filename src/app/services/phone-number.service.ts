import {Injectable} from '@angular/core';
import {ApiService} from './api/api.service';
import {map} from 'rxjs/operators';
import {IGridDataFetcherParams} from '../modules/custom-ag-grid/ag-grid-base';
import {IApiResponseBody} from '../models/api-response-body';
import {DropdownGuids} from '../models/dropdown-guids.enum';
import {Observable} from 'rxjs';
import {IServerDropdownOption} from '../models/server-dropdown';
import {IPhoneNumber} from '../models/phone-number';
import {CouchbaseLookupService} from './couchbase-lookup.service';

@Injectable({
    providedIn: 'root'
})
export class PhoneNumberService {

    guids = DropdownGuids;

    static adapt(phone): IPhoneNumber {
        return {
            id: phone.id,
            parentId: phone.parent_id,
            type: phone.type,
            number: phone.number,
            description: phone.description,
            sms: phone.sms,
            dflt: phone.dflt,
        };
    }

    constructor(private api: ApiService, private cbLookupService: CouchbaseLookupService) {
    }

    create(phone: Partial<IPhoneNumber>) {
        return this.api.post({endpoint: `/phone/${phone.parentId}`, body: phone, useAuthUrl: true})
            .pipe(
                map(res => res as IApiResponseBody),
                map((res: IApiResponseBody) => {
                    res.Data = PhoneNumberService.adapt(res.Data);
                    return res;
                })
            );
    }

    getAll(parentId: string, params?: IGridDataFetcherParams) {
        return this.api.get({
            endpoint: `/phone/${parentId}`,
            params: {
                rowCount: params.perPage,
                offset: params.offset,
                ...(params.qsearch ? {qsearch: params.qsearch} : {}),
                ...(params.type && {type: params.type}),
            },
            useAuthUrl: true,
        }).pipe(
            map(res => res as IApiResponseBody),
        );
    }

    getAllAdapted(contactId: string, params?: IGridDataFetcherParams) {
        return this.getAll(contactId, params).pipe(
            map((res: IApiResponseBody) => {
                res.Data = res.Data && res.Data.map(note => {
                    return PhoneNumberService.adapt(note);
                });
                // console.log(res.Data);
                return res;
            }),
        );
    }

    fetch(DocId) {
        return this.api.get({endpoint: `/phone/${DocId}`, useAuthUrl: true}).pipe(
            map(res => res as IApiResponseBody),
            map((res: IApiResponseBody) => PhoneNumberService.adapt(res.Data[0])),
        );
    }

    update(param: { phoneId: string; formData: IPhoneNumber }) {
        const formData = {...param.formData, id: param.phoneId};
        return this.api.patch({
            endpoint: `/phone/${param.formData.parentId}`,
            body: formData,
            useAuthUrl: true
        });
    }

    delete(id: string, parentId: string) {
        return this.api.delete({endpoint: `/phone/${parentId}/${id}`, useAuthUrl: true});
    }

    phoneTypeOptions(guid: string = this.guids.PHONE_LABELS): Observable<IServerDropdownOption[]> {
        return this.cbLookupService.getOptions(guid);
    }
}
