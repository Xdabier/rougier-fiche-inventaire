import Odoo from 'odoo-xmlrpc';
import {ServerInterface} from '../interfaces/server.interface';
import {OdooSyncBodyInterface} from '../interfaces/odoo-sync-body.interface';
import {ODOO_METHOD, ODOO_MODEL} from '../constants/odoo-params.constants';

interface OdooXmlrpcConfigInterface {
    url: string;
    port?: string;
    db: string;
    username: string;
    password: string;
}

const odooConnect = async (serverInfo: ServerInterface): Promise<any> => {
    const CONFIG: OdooXmlrpcConfigInterface = {
        url: serverInfo.url,
        db: serverInfo.db,
        username: serverInfo.username,
        password: serverInfo.password
    };

    if (serverInfo.port) {
        CONFIG.port = serverInfo.port;
    }

    const ODOO = new Odoo(CONFIG);

    return new Promise((resolve, reject) => {
        ODOO.connect((err: any, uid: number) => {
            if (err) {
                reject(err);
            }
            if (uid) {
                resolve(ODOO);
            }
        });
    });
};

const odooExecuteKw = async (
    odoo: any,
    model: string,
    method: string,
    body: OdooSyncBodyInterface
): Promise<number> =>
    new Promise((resolve, reject) => {
        odoo.execute_kw(model, method, [[body]], (err: any, value: number) => {
            if (err) {
                reject(err);
            }

            if (value) {
                resolve(value);
            }
        });
    });

const sendToOdoo = async (
    serverInfo: ServerInterface,
    syncBody: OdooSyncBodyInterface
): Promise<number> => {
    try {
        const ODOO = await odooConnect(serverInfo);
        return await odooExecuteKw(ODOO, ODOO_MODEL, ODOO_METHOD, syncBody);
    } catch (e) {
        return Promise.reject(e);
    }
};

export default sendToOdoo;
