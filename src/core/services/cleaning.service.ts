import {ResultSet, SQLError} from 'react-native-sqlite-storage';
import SqlLiteService from './sql-lite.service';

const SQLiteService: SqlLiteService = new SqlLiteService();

const deleteFile = async (
    fileId: string,
    close = false
): Promise<ResultSet> => {
    try {
        const RES: ResultSet = await SQLiteService.executeQuery(
            `DELETE FROM parc_prep WHERE id="${fileId}";`
        );
        if (close && !SQLiteService.finished) {
            SQLiteService.db.close().catch((reason: SQLError) => {
                console.error('err deleteFile = ', reason);
            });
        }
        return RES;
    } catch (e) {
        return Promise.reject(e);
    }
};

const deleteLog = async (fileId: string, close = false): Promise<ResultSet> => {
    try {
        const RES: ResultSet = await SQLiteService.executeQuery(
            `DELETE FROM log WHERE parcPrepId="${fileId}";`
        );
        if (close && !SQLiteService.finished) {
            SQLiteService.db.close().catch((reason: SQLError) => {
                console.error('err deleteLog = ', reason);
            });
        }
        return RES;
    } catch (e) {
        return Promise.reject(e);
    }
};

const getAllSyncedFiles = async (close = false): Promise<string[]> => {
    try {
        const RES: ResultSet = await SQLiteService.executeQuery(
            `SELECT pp.id FROM parc_prep AS pp INNER JOIN
            parcPrepStats AS ps ON ps.parcPrepId = pp.id
            WHERE pp.allSynced = 1 AND ps.isDefault = 0;`
        );
        if (close && !SQLiteService.finished) {
            SQLiteService.db.close().catch((reason: SQLError) => {
                console.error('err getAllSyncedFiles = ', reason);
            });
        }
        return RES.rows.raw().map((v: {id: string}) => `${v.id}`) as string[];
    } catch (e) {
        return Promise.reject(e);
    }
};

const cleanUpLogsAndFiles = async (
    filesIds: string[]
): Promise<ResultSet[]> => {
    try {
        const logsCleaning = filesIds.map((id: string) => deleteLog(id));
        const filesCleaning = filesIds.map((id: string) => deleteFile(id));

        const logCleaningRes: ResultSet[] = await Promise.all(logsCleaning);
        const filesCleaningRes: ResultSet[] = await Promise.all(filesCleaning);

        return [...filesCleaningRes, ...logCleaningRes];
    } catch (e) {
        return Promise.reject(e);
    }
};

const cleanUp = async (): Promise<ResultSet[]> => {
    try {
        const toBeCleanedIds: string[] = await getAllSyncedFiles();

        return await cleanUpLogsAndFiles(toBeCleanedIds);
    } catch (e) {
        console.error(e);
        return Promise.reject(e);
    }
};

export default cleanUp;
