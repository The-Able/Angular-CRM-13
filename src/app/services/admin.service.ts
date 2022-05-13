import {Injectable} from '@angular/core';
import {ApiService} from './api/api.service';
import {map, tap} from 'rxjs/operators';
import {IGridDataFetcherParams} from '../modules/custom-ag-grid/ag-grid-base';
import {IApiResponseBody} from '../models/api-response-body';
import {IMenu, IPasswordProfile} from '../models/admin';
import { IUserList } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    static adapt(menu): IMenu {
        return {
            guid: menu.guid,
            name: menu.name,
            descrition: menu.descrition,
            parent: menu.parent,
            level: menu.level,
            position: menu.position,
            sorter: menu.sorter,
            path: menu.path
        };
    }

    constructor(private api: ApiService) {
    }

    updatePassword(formValues) {
        console.log(formValues)
        return this.api.patch({
            endpoint: '/admin/updatepassword',
            body: formValues, useAuthUrl: false
        })
            .pipe(
                map(res => res as IApiResponseBody),
            );
    }

    getAll(parentId: string, params?: IGridDataFetcherParams) {
        return this.api.get({
            endpoint: '/buckets',
            params: {
                // rowCount: params.perPage,
                // offset: params.offset,
                ...(params.qsearch ? {qsearch: params.qsearch} : {}),
                ...(params.type && {type: params.type}),
            },
            useAuthUrl: true,
        }).pipe(
            map(res => res as IApiResponseBody),
        );
    }

    getAllMenus(params?: IGridDataFetcherParams) {
        console.log(params)
        return this.api.get({
            endpoint: '/menu/menulist',
            params: {
                rowCount: params.perPage,
                offset: params.offset,
                // bucket_group: params.bucket_group.toString(),

                // ...(params.type && {type: params.type} ),
            },
            useAuthUrl: false,
        }).pipe(
            map(res => res as IApiResponseBody),
            tap(res => console.log(res)),
        );
    }

    getPasswordProfile(profile_id: string) {
        return this.api.get({
            endpoint: '/admin/passwordProfile/' + profile_id,
            params: {},
            useAuthUrl: false,
        }).pipe(
            map(res => res as IApiResponseBody),
            map(res => res.Data[0] as IPasswordProfile),
            tap(res => console.log(res)),
        );
    }


    getUserProfile() {
        return this.api.get({
            endpoint: '/admin/userProfile',
            params: {},
            useAuthUrl: false,
        }).pipe(
            map(res => res as IApiResponseBody),
            map(res => res.Data[0] as any),
            tap(res => console.log(res)),
        );
    }

    // User Email Section
    updateUserProfile(formValues) {
        console.log(formValues)
        return this.api.patch({
            endpoint: '/admin/userProfile',
            body: formValues, useAuthUrl: false
        })
            .pipe(
                map(res => res as IApiResponseBody),
                tap(res => console.log(res))
            );
    }

    getListOfAllUser() {
        return this.api.get({
            endpoint: '/admin/userlist',
            params: {},
            useAuthUrl: false,
        }).pipe(
            map(res => res as IApiResponseBody),
            map(res => res.Data as Array<IUserList>),
            tap(res => console.log(res)),
        );



    }

// User Email Section
    updateUserEmail(formValues) {
        console.log(formValues)
        return this.api.patch({
            endpoint: '/admin/updateUserEmail',
            body: formValues, useAuthUrl: false
        })
            .pipe(
                map(res => res as IApiResponseBody),
                tap(res => console.log(res))
            );
    }

    newUserEmail(formValues) {
        console.log(formValues)
        return this.api.post({
            endpoint: '/admin/newUserEmail',
            body: formValues, useAuthUrl: false
        })
            .pipe(
                map(res => res as IApiResponseBody),
                tap(res => console.log(res))
            );
    }

    deleteUserEmail(formValues) {
        console.log(formValues)
        return this.api.delete({endpoint: '/admin/deleteUserEmail/' + formValues.parentId + '/' + formValues.id, useAuthUrl: false})
            .pipe(
                map(res => res as IApiResponseBody),
                tap(res => console.log(res))
            );
    }

    setUserDefaultEmail(formValues) {
        console.log(formValues)
        return this.api.patch({
            endpoint: '/admin/setUserDefaultEmail',
            body: formValues, useAuthUrl: false
        })
            .pipe(
                map(res => res as IApiResponseBody),
                tap(res => console.log(res))
            );
    }

// User Phone Section
    updateUserPhone(formValues) {
        console.log(formValues)
        return this.api.patch({
            endpoint: '/admin/updateUserPhone',
            body: formValues, useAuthUrl: false
        })
            .pipe(
                map(res => res as IApiResponseBody),
                tap(res => console.log(res))
            );
    }

    newUserPhone(formValues) {
        console.log(formValues)
        return this.api.post({
            endpoint: '/admin/newUserPhone',
            body: formValues, useAuthUrl: false
        })
            .pipe(
                map(res => res as IApiResponseBody),
                tap(res => console.log(res))
            );
    }

    deleteUserPhone(formValues) {
        console.log(formValues)
        return this.api.delete({endpoint: '/admin/deleteUserPhone/' + formValues.parentId + '/' + formValues.id, useAuthUrl: false})
            .pipe(
                map(res => res as IApiResponseBody),
                tap(res => console.log(res))
            );
    }

    setUserDefaultPhone(formValues) {
        console.log(formValues)
        return this.api.patch({
            endpoint: '/admin/setUserDefaultPhone',
            body: formValues, useAuthUrl: false
        })
            .pipe(
                map(res => res as IApiResponseBody),
                tap(res => console.log(res))
            );
    }
}


