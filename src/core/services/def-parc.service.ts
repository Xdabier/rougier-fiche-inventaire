import {ResultSet, SQLError} from 'react-native-sqlite-storage';
import SqlLiteService from './sql-lite.service';
import {DefParcInterface} from '../interfaces/def-parc.interface';

const SQLiteService: SqlLiteService = new SqlLiteService();

export const getDefaultParcId = async (
    close = false
): Promise<DefParcInterface[]> => {
    try {
        const RES: ResultSet = await SQLiteService.executeQuery(
            `SELECT * FROM defaultParcId;`
        );
        if (close && !SQLiteService.finished) {
            SQLiteService.db.close().catch((reason: SQLError) => {
                console.error('err defaultParcId = ', reason);
            });
        }
        return RES.rows.raw() as DefParcInterface[];
    } catch (e) {
        return Promise.reject(e);
    }
};

export const upsertDefaultParcId = async (
    element: DefParcInterface
): Promise<ResultSet> => {
    try {
        const DEF: DefParcInterface[] = await getDefaultParcId();
        if (DEF && DEF.length) {
            return await SQLiteService.executeQuery(
                `UPDATE defaultParcId SET parcId = ? where id = 0`,
                [element.parcId]
            );
        }
        const KEYS = Object.keys(element);
        return await SQLiteService.executeQuery(
            `INSERT INTO defaultParcId (${KEYS.join(', ')}) VALUES (${KEYS.map(
                () => '?'
            ).join(', ')})`,
            KEYS.map((x: string) => (element as any)[x])
        );
    } catch (e) {
        return Promise.reject(e);
    }
};
