import {ToastAndroid} from 'react-native';
import {publish as eventPub} from 'pubsub-js';
import {ParcPrepAllDetailsInterface} from '../interfaces/parc-prep-all-details.interface';
import {translate} from '../../utils/i18n.utils';
import {convertSyncFile, generateSingleSyncFile} from './sync-tools.service';
import sendToOdoo from './odoo-connect.service';
import {ServerInterface} from '../interfaces/server.interface';
import {updateSyncParcPrepFile} from './parc-prep.service';
import EventTopicEnum from '../enum/event-topic.enum';

const syncSingleForm = async (
    parcForm: ParcPrepAllDetailsInterface,
    serverData: ServerInterface
): Promise<number> => {
    if (!parcForm.logsNumber) {
        ToastAndroid.show(translate('syncErrors.noLogs'), ToastAndroid.SHORT);
        return 0;
    }

    if (parcForm.allSynced) {
        ToastAndroid.show(
            translate('syncErrors.allSynced'),
            ToastAndroid.SHORT
        );
        return 0;
    }

    if (parcForm?.id) {
        try {
            const SYNC_DATA = await generateSingleSyncFile(parcForm?.id);
            console.log(convertSyncFile(SYNC_DATA));
            const RES = await sendToOdoo(
                serverData,
                convertSyncFile(SYNC_DATA)
            );
            if (RES) {
                const DB_RES = await updateSyncParcPrepFile(parcForm?.id, 1);

                console.log('test log = ', DB_RES);
                if (DB_RES) {
                    eventPub(EventTopicEnum.updateParcPrep);
                    return RES;
                }
            }
        } catch (e) {
            console.error(e);
            throw Error(e);
        }
    }

    return 0;
};

export default syncSingleForm;
