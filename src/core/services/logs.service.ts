import {ResultSet, SQLError} from 'react-native-sqlite-storage';
import SqlLiteService from './sql-lite.service';
import {LogDetailsInterface, LogInterface} from '../interfaces/log.interface';
import {ParcPrepStatsInterface} from '../interfaces/parc-prep-stats.interface';
import {
    getParcPrepStatsById,
    updateParcPrepStats
} from './parc-prep-stats.service';
import {updateSyncParcPrepFile} from './parc-prep.service';

const SQLiteService: SqlLiteService = new SqlLiteService();

export const getLogs = async (
    parcId: string,
    close = false
): Promise<LogDetailsInterface[]> => {
    try {
        const RES: ResultSet = await SQLiteService.executeQuery(
            `SELECT l.parcPrepId, l.creationDate, l.barcode,
            l.sectionNumber, l.id FROM log AS l WHERE l.parcPrepId = ?;`,
            [parcId]
        );
        if (close && !SQLiteService.finished) {
            SQLiteService.db.close().catch((reason: SQLError) => {
                console.error('err log = ', reason);
            });
        }
        return RES.rows.raw() as LogDetailsInterface[];
    } catch (e) {
        return Promise.reject(e);
    }
};

export const getRawLogs = async (
    parcId: string,
    close = false
): Promise<LogInterface[]> => {
    try {
        const RES: ResultSet = await SQLiteService.executeQuery(
            `SELECT l.barcode, l.sectionNumber, l.id FROM log AS l
            WHERE l.parcPrepId = ?;`,
            [parcId]
        );
        if (close && !SQLiteService.finished) {
            SQLiteService.db.close().catch((reason: SQLError) => {
                console.error('err log = ', reason);
            });
        }
        return RES.rows.raw() as LogInterface[];
    } catch (e) {
        return Promise.reject(e);
    }
};

export const insertLog = async (element: LogInterface) => {
    try {
        const KEYS = Object.keys(element);
        await SQLiteService.executeQuery(
            `INSERT INTO log (${KEYS.join(', ')}) VALUES (${KEYS.map(
                () => '?'
            ).join(', ')})`,
            KEYS.map((x: string) => (element as any)[x])
        );
        const PARC_PREP_STATS: ParcPrepStatsInterface[] = await getParcPrepStatsById(
            element.parcPrepId
        );

        await updateSyncParcPrepFile(`${element.parcPrepId}`, 0);

        const STATS: ParcPrepStatsInterface = {
            ...PARC_PREP_STATS[0],
            logsNumber: PARC_PREP_STATS[0].logsNumber
                ? PARC_PREP_STATS[0].logsNumber + 1
                : 1,
            lastLogDate: element.creationDate,
            lastLogId: element.id
        };

        return updateParcPrepStats(STATS);
    } catch (e) {
        return Promise.reject(e);
    }
};

export const updateLog = async (oldId: string, element: LogInterface) => {
    try {
        const KEYS = Object.keys(element);
        const UP_L = await SQLiteService.executeQuery(
            `UPDATE log SET ${KEYS.map((value: string) => `${value} = ?`).join(
                ', '
            )} WHERE id = ?;`,
            [...KEYS.map((x: string) => (element as any)[x]), oldId]
        );
        await updateSyncParcPrepFile(`${element.parcPrepId}`, 0);

        return UP_L;
    } catch (e) {
        return Promise.reject(e);
    }
};
