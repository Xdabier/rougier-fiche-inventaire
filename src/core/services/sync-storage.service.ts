import AsyncStorage from '@react-native-community/async-storage';
import handleError from '../../utils/handle-error.utils';

class SyncStorage {
    data: Map<any, any> = new Map();

    loading: boolean = true;

    init(): Promise<Array<any>> {
        return AsyncStorage.getAllKeys().then((keys: string[]) =>
            AsyncStorage.multiGet(keys).then(
                (data: any): Array<any> => {
                    data.forEach(this.saveItem.bind(this));

                    return [...this.data];
                }
            )
        );
    }

    get(key: string): any {
        return this.data.get(key);
    }

    set(key: string, value: any): Promise<any> {
        if (!key) return handleError('set', 'a key');

        this.data.set(key, value);
        return AsyncStorage.setItem(key, JSON.stringify(value));
    }

    remove(key: string): Promise<any> {
        if (!key) return handleError('remove', 'a key');

        this.data.delete(key);
        return AsyncStorage.removeItem(key);
    }

    saveItem(item: string[]) {
        let value;

        try {
            value = JSON.parse(item[1]);
        } catch (e) {
            [, value] = item;
        }

        this.data.set(item[0], value);
        this.loading = false;
    }

    getAllKeys(): Array<any> {
        return Array.from(this.data.keys());
    }
}

const syncStorage = new SyncStorage();

export default syncStorage;
