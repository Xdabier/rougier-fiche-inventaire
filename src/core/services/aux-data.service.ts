import {ResultSet, SQLError} from 'react-native-sqlite-storage';
import SqlLiteService from './sql-lite.service';
import NameToTableEnum from '../enum/name-to-table.enum';
import {AuxiliaryInterface} from '../interfaces/auxiliary.interface';

const SQLiteService: SqlLiteService = new SqlLiteService();

export const getAux = async (
    table: NameToTableEnum,
    close = false
): Promise<AuxiliaryInterface[]> => {
    try {
        const RES: ResultSet = await SQLiteService.executeQuery(
            `SELECT * FROM ${table};`
        );
        if (close && !SQLiteService.finished) {
            SQLiteService.db.close().catch((reason: SQLError) => {
                console.error('err aux = ', reason);
            });
        }
        return RES.rows.raw() as AuxiliaryInterface[];
    } catch (e) {
        return Promise.reject(e);
    }
};

export const insertAux = async (
    element: AuxiliaryInterface,
    table: NameToTableEnum
): Promise<ResultSet> => {
    try {
        return await SQLiteService.executeQuery(
            `INSERT INTO ${table} (name, code) VALUES (?, ?);`,
            [element.name, element.code]
        );
    } catch (e) {
        return Promise.reject(e);
    }
};
