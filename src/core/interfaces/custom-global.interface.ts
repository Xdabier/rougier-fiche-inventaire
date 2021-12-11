import {SQLiteDatabase} from 'react-native-sqlite-storage';

type CurrentGlobal = NodeJS.Global & typeof globalThis;
export interface CustomGlobalInterface extends CurrentGlobal {
    SQLiteDB: SQLiteDatabase;
}
