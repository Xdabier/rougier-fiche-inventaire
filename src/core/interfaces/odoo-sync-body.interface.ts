interface OdooParcPrepBodyInterface {
    aac: string;
    type: string;
    creation_date: string;
    name: string;
    emplacement: string;
}

export interface OdooLogsBodyInterface {
    barcode: string;
    num_troncon: string;
}

export interface OdooSyncBodyInterface extends OdooParcPrepBodyInterface {
    sync: boolean;
    sync_date: string;
    appId: string;
    billes: OdooLogsBodyInterface[];
}
