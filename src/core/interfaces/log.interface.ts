export interface LogInterface {
    parcPrepId: string;
    creationDate?: string;
    barCode: string;
    id?: string;
    sectionNumber: string;
}

export interface LogDetailsInterface {
    parcPrepId: string;
    creationDate: string;
    barcode: string;
    id: string;
    sectionNumber?: string;
}
