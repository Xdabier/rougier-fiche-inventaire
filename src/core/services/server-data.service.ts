import {ResultSet, SQLError} from 'react-native-sqlite-storage';
import SqlLiteService from './sql-lite.service';
import {ServerInterface} from '../interfaces/server.interface';

const SQLiteService: SqlLiteService = new SqlLiteService();

export const getServerData = async (
    close = false
): Promise<ServerInterface[]> => {
    try {
        const RES: ResultSet = await SQLiteService.executeQuery(
            `SELECT * FROM server;`
        );
        if (close && !SQLiteService.finished) {
            SQLiteService.db.close().catch((reason: SQLError) => {
                console.error('err server = ', reason);
            });
        }
        return RES.rows.raw() as ServerInterface[];
    } catch (e) {
        return Promise.reject(e);
    }
};

export const upsertServerData = async (
    element: ServerInterface
): Promise<ResultSet> => {
    try {
        const ELEMENT: ServerInterface = element;
        if (!ELEMENT.port) {
            ELEMENT.port = null;
        }

        const KEYS = Object.keys(ELEMENT);
        const SERVER: ServerInterface[] = await getServerData();
        if (SERVER && SERVER.length) {
            return await SQLiteService.executeQuery(
                `UPDATE server SET ${KEYS.map(
                    (key: string) => `${key} = ?`
                ).join(', ')} where id = 0`,
                KEYS.map((x: string) => (ELEMENT as any)[x])
            );
        }
        KEYS.push('id');
        ELEMENT.id = 0;
        return await SQLiteService.executeQuery(
            `INSERT INTO server (${KEYS.join(', ')}) VALUES (${KEYS.map(
                () => '?'
            ).join(', ')})`,
            KEYS.map((x: string) => (ELEMENT as any)[x])
        );
    } catch (e) {
        return Promise.reject(e);
    }
};
