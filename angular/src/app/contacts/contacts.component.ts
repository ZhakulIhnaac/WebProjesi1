import { Component, Injector, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { ContactsDto, CorporateServiceProxy, DefinitionServiceProxy, CountriesDto, SearchParamAnd } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '../../shared/app-component-base';
import { CreateEditContactDialogComponent } from './create-edit-contact/create-edit-contact-dialog.component';
import { ContactDetailDialogComponent } from './detail-contact/detail-contact.component';
import { ESearchParamOperator } from '../../shared/AppEnums';

@Component({
    templateUrl: './contacts.component.html',
    animations: [appModuleAnimation()],
    styles: [
        `
          mat-form-field {
            padding: 10px;
          }
        `
    ]
})
export class ContactsComponent extends AppComponentBase implements OnInit {
    contactList: ContactsDto[] = [];
    countryList: CountriesDto[] = [];
    countryListFiltered: CountriesDto[] = [];
    searchKeyContactName: string = "";
    searchKeyContactCountry: number;
    countrySelectBoxFilter: string;

    constructor(
        injector: Injector,
        private _corporateService: CorporateServiceProxy,
        private _definitionService: DefinitionServiceProxy,
        private _dialog: MatDialog
    ) {
        super(injector);
    }

    ngOnInit() {
        this.getContactsForTable()
        this.getCountries()
    }

    refresh() {
        this.ngOnInit();
    }

    searchContacts() {
        this.page = 1;
        this.maxResult = 10;
        this.getContactsForTable();
    }

    resetSearch() {
        this.page = 1;
        this.maxResult = 10;
        this.searchKeyContactName = undefined;
        this.searchKeyContactCountry = undefined;
        this.getContactsForTable();
    }

    filterCountry() {
        this.countryListFiltered = this.countryList.filter(x => x.countryName.toLowerCase().includes(this.countrySelectBoxFilter.toLowerCase()));
    }

    getContactsForTable() {
        this.addSearchParamAnd("nationalityId", ESearchParamOperator.Equal, this.searchKeyContactCountry);
        this.addSearchParamOr(
            [
                new SearchParamAnd({ column: "name", operatorType: ESearchParamOperator.Include, value: this.searchKeyContactName }),
                new SearchParamAnd({ column: "surname", operatorType: ESearchParamOperator.Include, value: this.searchKeyContactName })
            ]);
        this._corporateService.getContactForTable(this.maxResult, this.page, this.searchParamList).subscribe(result => {
            this.contactList = result.itemList;
            this.totalItems = result.totalItemCount;
            this.searchParamList.searchParamAndList.length = 0;
            this.searchParamList.searchParamOrList.length = 0;
            this.pageList = [...Array(Math.ceil(this.totalItems / this.maxResult)).keys()].map(i => i + 1);
        })
    }

    getCountries() {
        this._definitionService.getCountryForSelectBox().subscribe(result => {
            this.countryList = result;
            this.countryListFiltered = result;
        });
    }

    createEditDialog(contactId?: number): void {
        let createEditDialog;

        createEditDialog = this._dialog.open(CreateEditContactDialogComponent, {
            data: { contactId },
            width: "150vh",
            maxHeight: "90vh"
        });

        createEditDialog.afterClosed().subscribe(result => {
            if (result) {
                this.ngOnInit();
            }
        });
    }

    createDetailDialog(contactId?: number): void {
        let detailDialog;

        detailDialog = this._dialog.open(ContactDetailDialogComponent, {
            data: { contactId },
            width: "150vh",
            maxHeight: "90vh"
        });

        detailDialog.afterClosed().subscribe();
    }

    delete(contact: ContactsDto): void {
        abp.message.confirm(
            this.l('ContactDeleteWarningMessage', contact.name, contact.surname), undefined,
            (result: boolean) => {
                if (result) {
                    this._corporateService.deleteContact(contact.id).subscribe(() => {
                        abp.notify.success(this.l('SuccessfullyDeleted'));
                        this.ngOnInit();
                    });
                }
            }
        );
    }

}
