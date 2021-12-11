import {ParcPrepInterface} from './parc-prep.interface';
import {LogInterface} from './log.interface';

export interface SyncDataInterface extends ParcPrepInterface {
    logs: LogInterface[];
}
