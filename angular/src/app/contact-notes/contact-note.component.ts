import { Component, Injector, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { ContactNotesDto, ContactsDto, CorporateServiceProxy, UserDto, UserServiceProxy } from '@shared/service-proxies/service-proxies';
import moment from 'moment';
import { AppComponentBase } from '../../shared/app-component-base';
import { EMeetingType, ESearchParamOperator } from '../../shared/AppEnums';
import { CreateEditContactNoteDialogComponent } from './create-edit-contact-note/create-edit-contact-note-dialog.component';
import { ContactNoteDetailDialogComponent } from './detail-contact-note/detail-contact-note.component';

@Component({
    templateUrl: './contact-note.component.html',
    animations: [appModuleAnimation()],
    styles: [
        `
          mat-form-field {
            padding: 10px;
          }
        `
    ]
})
export class ContactNotesComponent extends AppComponentBase implements OnInit {
    contactNoteList: ContactNotesDto[] = [];
    userList: UserDto[] = [];
    contactList: ContactsDto[] = [];
    contactListFiltered: ContactsDto[] = [];
    searchKeyNoteTitle: string = "";
    searchKeyNoteContact: number;
    searchKeyNoteUser: number;
    contactSelectBoxFilter: string;
    searchKeyNoteMeetingDate: moment.Moment;
    searchKeyNoteMeetingType: number;
    get getMeetingTypeEnum() { return EMeetingType; }
    eMeetingType = Object.keys(this.getMeetingTypeEnum);

    constructor(
        injector: Injector,
        private _corporateService: CorporateServiceProxy,
        private _userService: UserServiceProxy,
        private _dialog: MatDialog
    ) {
        super(injector);
    }

    ngOnInit() {
        this.getContactNotesForTable();
        this.getUsersList();
        this.getContactsList();
    }

    refresh() {
        this.ngOnInit();
    }

    searchContactNotes() {
        this.page = 1;
        this.maxResult = 10;
        this.getContactNotesForTable();
    }

    resetSearch() {
        this.page = 1;
        this.maxResult = 10;
        this.searchKeyNoteTitle = undefined;
        this.searchKeyNoteContact = undefined;
        this.searchKeyNoteUser = undefined;
        this.searchKeyNoteMeetingDate = undefined;
        this.searchKeyNoteMeetingType = undefined;
        this.getContactNotesForTable();
    }

    filterContact() {
        this.contactListFiltered = this.contactList.filter(x => x.name.toLowerCase().includes(this.contactSelectBoxFilter.toLowerCase()) || x.surname.toLowerCase().includes(this.contactSelectBoxFilter.toLowerCase()));
    }

    getContactNotesForTable() {
        this.addSearchParamAnd("title", ESearchParamOperator.Include, this.searchKeyNoteTitle);
        this.addSearchParamAnd("contactId", ESearchParamOperator.Equal, this.searchKeyNoteContact);
        this.addSearchParamAnd("userId", ESearchParamOperator.Equal, this.searchKeyNoteUser);
        this.addSearchParamAnd("meetingDate", ESearchParamOperator.Equal, this.searchKeyNoteMeetingDate);
        this.addSearchParamAnd("meetingType", ESearchParamOperator.Equal, this.searchKeyNoteMeetingType);
        this._corporateService.getContactNotesForTable(this.maxResult, this.page, this.searchParamList).subscribe(result => {
            this.contactNoteList = result.itemList;
            this.totalItems = result.totalItemCount;
            this.searchParamList.searchParamAndList.length = 0;
            this.searchParamList.searchParamOrList.length = 0;
            this.pageList = [...Array(Math.ceil(this.totalItems / this.maxResult)).keys()].map(i => i + 1);
        })
    }

    getUsersList() {
        this._userService.getAll("",true,0,100000).subscribe(result => {
            this.userList = result.items;
        })
    }

    getContactsList() {
        this._corporateService.getContactForSelectBox().subscribe(result => {
            this.contactList = result;
            this.contactListFiltered = result;
        })
    }

    createEditDialog(contactNoteId?: number): void {
        let createEditDialog;

        createEditDialog = this._dialog.open(CreateEditContactNoteDialogComponent, {
            width: "120vh",
            maxHeight: "90vh",
            data: { contactNoteId }
        });

        createEditDialog.afterClosed().subscribe(result => {
            if (result) {
                this.ngOnInit();
            }
        });
    }

    detailDialog(contactNoteId?: number): void {
        let detailDialog;

        detailDialog = this._dialog.open(ContactNoteDetailDialogComponent, {
            width: "120vh",
            maxHeight: "90vh",
            data: { contactNoteId },
        });

        detailDialog.afterClosed().subscribe();
    }

    delete(contactNoteId: string): void {
        abp.message.confirm(
            this.l('ContactNoteDeleteWarningMessage'), undefined,
            (result: boolean) => {
                if (result) {
                    this._corporateService.deleteContactNotes(contactNoteId).subscribe(() => {
                        abp.notify.success(this.l('SuccessfullyDeleted'));
                        this.ngOnInit();
                    });
                }
            }
        );
    }

}
