import { Pipe, PipeTransform } from '@angular/core';
import { EFirmRole } from '../../AppEnums';

@Pipe({name: 'firmRole'})
export class FirmRolePipe implements PipeTransform {
    get getFirmRoleEnum() { return EFirmRole; }
    eFirmRole = Object.keys(this.getFirmRoleEnum);

  transform(value: number): string {
      return this.eFirmRole[value-1];
  }
}
