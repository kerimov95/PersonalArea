export class paymentQiwi {
    providerid: number;
    lic: string;
    paymentDetails: paymentDetails[];
}

export class paymentDetails {
    servicesid: number;
    sum: number;
}

export class QiwiResponse {
    url: string;
    payment: QiwiResponsePayment;
}

export class QiwiResponsePayment {
    id: number;
    sum: number;
    provider: number;
    date: string;
    lic: string;
    status: boolean;
}