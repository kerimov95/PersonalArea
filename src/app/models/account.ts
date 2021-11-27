import { DecimalPipe } from '@angular/common';

export class account {
    account_id: number;
    id: number;
    lic: string;
    providerid: number;
    provider: provider;
    address: string;
}

export class provider {
    id: number;
    name: string;
    address: string;
    icon: string;
    key: string;
}

export class accountDetail {
    public id: number;
    public payment: boolean;
    public lic: string;
    public name: string;
    public phonenumber: string;
    public room: number;
    public fullspace: number;
    public town: string;
    public street: string;
    public house: string;
    public corp: string;
    public apparts: string;
    public substation: string;
    public feeder: string;
    public transformer: string;
    public dogovors: service[]
}

export class service {
    public id: number;
    public balance: number;
    public status: number;
    public name: string;
}

export class accruals {
    month: number;
    year: number;
    sum: number;
}

export class meter {
    public id: number;
    public number: number;
    public type: string;
}

export class ph {
    id?: number;
    ph: number;
    docdate: string;
    meter_id?: number;
}

export class report {
    name: string;
    address: string;
    lic: string;
    providerid: number;
}

export class payment {
    summa: number;
    docdate: string;
    pay_name: string;
}