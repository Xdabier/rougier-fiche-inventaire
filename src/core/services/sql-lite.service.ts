import {ResultSet, SQLError, SQLiteDatabase} from 'react-native-sqlite-storage';
import DB from './sql-lite-config.service';

class SqlLiteService {
    private readonly _db!: SQLiteDatabase;

    private _finished!: boolean;

    constructor() {
        this._db = DB;
    }

    get db(): SQLiteDatabase {
        return this._db;
    }

    get finished(): boolean {
        return this._finished;
    }

    public executeQuery(
        sqlStatement: string,
        params: any[] = []
    ): Promise<ResultSet> {
        return new Promise<ResultSet>((resolve, reject) => {
            this._finished = false;
            this._db.transaction(
                (tx) => {
                    tx.executeSql(
                        sqlStatement,
                        params,
                        (trans1, results: ResultSet) => {
                            resolve(results);
                        },
                        (error) => {
                            reject(error);
                        }
                    );
                },
                (error: SQLError) => {
                    console.error(error);
                },
                () => {
                    this._finished = true;
                }
            );
        });
    }
}

export default SqlLiteService;
