import {DatabaseParams, openDatabase} from 'react-native-sqlite-storage';

const PARAMS: DatabaseParams = {
    name: 'forest',
    location: 'default',
    createFromLocation: '~forest.db'
};

export default openDatabase(
    PARAMS,
    () => {},
    (err) => {
        console.error('DB ERR =>', err);
    }
);
