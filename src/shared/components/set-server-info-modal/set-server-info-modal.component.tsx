import React, {useContext, useEffect, useState} from 'react';
import {Modal, SafeAreaView, ScrollView, ToastAndroid} from 'react-native';
import {SQLError} from 'react-native-sqlite-storage';
import CommonStyles from '../../../styles';
import ModalHeader from '../modal-header/modal-header.component';
import {translate} from '../../../utils/i18n.utils';
import ModalFooter from '../modal-footer/modal-footer.component';
import FormInput from '../form-input/form-input.component';
import {requestCloseModal} from '../../../utils/modal.utils';
import {MainStateContextInterface} from '../../../core/interfaces/main-state.interface';
import MainStateContext from '../../../core/contexts/main-state.context';
import {ServerInterface} from '../../../core/interfaces/server.interface';
import {upsertServerData} from '../../../core/services/server-data.service';

const {fullWidth, appPage} = CommonStyles;

const URL_REGEX =
    '(http:\\/\\/www\\.|https:\\/\\/www\\.|http:\\/\\/|https:\\/\\/)?[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}(:[0-9]{1,5})?(\\/.*)?|^((http:\\/\\/www\\.|https:\\/\\/www\\.|http:\\/\\/|https:\\/\\/)?([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])';

const SetServerInfo: React.FunctionComponent<{
    modalVisible: boolean;
    onClose: (refresh?: boolean) => void;
}> = ({
    modalVisible,
    onClose
}: {
    modalVisible: boolean;
    onClose: (refresh?: boolean) => void;
}) => {
    const [url, setUrl] = useState<string>('');
    const [urlValid, setUrlValid] = useState<boolean | boolean[]>(true);
    const [port, setPort] = useState<string | undefined | null>();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [db, setDb] = useState<string>('');

    const {serverData} = useContext<MainStateContextInterface>(
        MainStateContext
    );

    const validForm = () => !!(urlValid && url && username && password && db);

    useEffect(() => {
        if (serverData) {
            setUrl(serverData.url);
            setPort(serverData.port);
            setUsername(serverData.username);
            setPassword(serverData.password);
            setDb(serverData.db);
        }
    }, [serverData]);

    const confirmInsertion = () => {
        if (validForm()) {
            const EL: ServerInterface = {
                db,
                url,
                password,
                username
            };

            if (port) {
                EL.port = port;
            } else {
                delete EL.port;
            }

            if (!url.includes('http://') || !url.includes('https://')) {
                setUrl((prevState: string) => `http://${prevState}`);
            }

            upsertServerData(EL)
                .then((res) => {
                    if (res && res.rows) {
                        onClose(true);
                        ToastAndroid.show(
                            translate('modals.server.succMsg'),
                            ToastAndroid.SHORT
                        );
                    }
                })
                .catch((reason: SQLError) => {
                    if (!reason.code) {
                        ToastAndroid.show(
                            translate('common.dupErr'),
                            ToastAndroid.LONG
                        );
                    }
                });
        } else {
            ToastAndroid.show(translate('common.validErr'), ToastAndroid.LONG);
        }
    };

    return (
        <Modal
            style={[fullWidth]}
            onRequestClose={() => {
                requestCloseModal(onClose);
            }}
            animationType="slide"
            visible={modalVisible}>
            <ModalHeader
                title={translate('common.serverInfo')}
                onClose={() => {
                    requestCloseModal(onClose);
                }}
            />
            <SafeAreaView style={[appPage]}>
                <ScrollView>
                    <FormInput
                        maxLength={100}
                        title={translate('modals.server.fields.url.label')}
                        placeholder={translate('modals.server.fields.url.ph')}
                        onChangeText={setUrl}
                        value={url}
                        pattern={[URL_REGEX]}
                        errText={translate('modals.server.fields.url.err')}
                        onValidation={setUrlValid}
                        required
                    />
                    <FormInput
                        maxLength={8}
                        title={translate('modals.server.fields.port.label')}
                        placeholder={translate('modals.server.fields.port.ph')}
                        onChangeText={setPort}
                        value={port}
                        keyboardType="numeric"
                    />
                    <FormInput
                        maxLength={30}
                        title={translate('modals.server.fields.db.label')}
                        placeholder={translate('modals.server.fields.db.ph')}
                        onChangeText={setDb}
                        value={db}
                        required
                    />
                    <FormInput
                        maxLength={100}
                        title={translate('modals.server.fields.username.label')}
                        placeholder={translate(
                            'modals.server.fields.username.ph'
                        )}
                        onChangeText={setUsername}
                        value={username}
                        required
                    />
                    <FormInput
                        maxLength={50}
                        title={translate('modals.server.fields.password.label')}
                        placeholder={translate(
                            'modals.server.fields.password.ph'
                        )}
                        onChangeText={setPassword}
                        value={password}
                        required
                    />
                </ScrollView>
            </SafeAreaView>
            <ModalFooter
                disabled={!validForm()}
                onPress={confirmInsertion}
                title={translate('modals.server.confirm')}
            />
        </Modal>
    );
};

export default SetServerInfo;
