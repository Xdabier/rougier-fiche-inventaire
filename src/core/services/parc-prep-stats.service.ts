import {ResultSet, SQLError} from 'react-native-sqlite-storage';
import SqlLiteService from './sql-lite.service';
import {ParcPrepStatsInterface} from '../interfaces/parc-prep-stats.interface';

const SQLiteService: SqlLiteService = new SqlLiteService();

export const getParcPrepStatsById = async (
    id: string,
    close = false
): Promise<ParcPrepStatsInterface[]> => {
    try {
        const RES: ResultSet = await SQLiteService.executeQuery(
            `SELECT * FROM parcPrepStats WHERE parcPrepId = ?;`,
            [id]
        );
        if (close && !SQLiteService.finished) {
            SQLiteService.db.close().catch((reason: SQLError) => {
                console.error('err parcPrepStats = ', reason);
            });
        }
        return RES.rows.raw() as ParcPrepStatsInterface[];
    } catch (e) {
        return Promise.reject(e);
    }
};

export const insertParcPrepStats = async (
    element: ParcPrepStatsInterface
): Promise<ResultSet> => {
    try {
        const KEYS = Object.keys(element);
        if (element.isDefault) {
            await SQLiteService.executeQuery(
                `UPDATE parcPrepStats SET isDefault = 0 WHERE isDefault = 1;`
            );
        }
        return await SQLiteService.executeQuery(
            `INSERT INTO parcPrepStats (${KEYS.join(', ')}) VALUES (${KEYS.map(
                () => '?'
            ).join(', ')})`,
            KEYS.map((x: string) => (element as any)[x])
        );
    } catch (e) {
        return Promise.reject(e);
    }
};

export const updateParcPrepStats = async (
    element: ParcPrepStatsInterface
): Promise<ResultSet> => {
    try {
        const {parcPrepId, ...others} = element;
        const KEYS = Object.keys(others);
        if (others.isDefault) {
            await SQLiteService.executeQuery(
                `UPDATE parcPrepStats SET isDefault = 0 WHERE isDefault = 1;`
            );
        }

        return await SQLiteService.executeQuery(
            `UPDATE parcPrepStats SET ${KEYS.map(
                (value: string) => `${value} = ?`
            ).join(', ')} WHERE parcPrepId = ?;`,
            [...KEYS.map((x: string) => (others as any)[x]), parcPrepId]
        );
    } catch (e) {
        return Promise.reject(e);
    }
};
