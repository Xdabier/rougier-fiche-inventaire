import React, {useState} from 'react';
import {Modal, SafeAreaView, ScrollView, ToastAndroid} from 'react-native';
import {ResultSet, SQLError} from 'react-native-sqlite-storage';
import CommonStyles from '../../../styles';
import ModalHeader from '../modal-header/modal-header.component';
import {translate} from '../../../utils/i18n.utils';
import ModalFooter from '../modal-footer/modal-footer.component';
import FormInput from '../form-input/form-input.component';
import {AuxiliaryInterface} from '../../../core/interfaces/auxiliary.interface';
import {insertAux} from '../../../core/services/aux-data.service';
import NameToTableEnum from '../../../core/enum/name-to-table.enum';

const {fullWidth, appPage} = CommonStyles;

const AddAuxModal: React.FunctionComponent<{
    modalVisible: boolean;
    onClose: (refresh?: boolean) => void;
    modalName: string;
}> = ({
    modalVisible,
    onClose,
    modalName
}: {
    modalVisible: boolean;
    onClose: (refresh?: boolean) => void;
    modalName: string;
}) => {
    const [name, setName] = useState<string>('');
    const [code, setCode] = useState<string>('');

    const validForm = () =>
        name && name.length >= 1 && code && code.length >= 1;

    const confirmInsertion = () => {
        const EL: AuxiliaryInterface = {
            name: name.toUpperCase(),
            code: code.toUpperCase()
        };
        if (validForm()) {
            // @ts-ignore
            insertAux(EL, NameToTableEnum[modalName])
                .then((res: ResultSet) => {
                    console.log('res = ', res);
                    if (res && res.rows) {
                        setCode('');
                        setName('');
                        onClose(true);
                        ToastAndroid.show(
                            translate('modals.aux.succMsg', {val: modalName}),
                            ToastAndroid.SHORT
                        );
                    }
                })
                .catch((reason: SQLError) => {
                    console.log('er = ', reason);
                    if (!reason.code) {
                        ToastAndroid.show(
                            translate('common.dupErr'),
                            ToastAndroid.LONG
                        );
                    }
                });
        }
    };

    return (
        <Modal style={[fullWidth]} animationType="slide" visible={modalVisible}>
            <ModalHeader
                title={translate('modals.aux.title', {val: modalName})}
                onClose={() => {
                    setCode('');
                    setName('');
                    onClose();
                }}
            />
            <SafeAreaView style={[appPage]}>
                <ScrollView>
                    <FormInput
                        title={translate('modals.aux.fields.name.label', {
                            val: modalName
                        })}
                        placeholder={translate('modals.aux.fields.name.ph', {
                            val: modalName
                        })}
                        onChangeText={setName}
                        value={name}
                    />
                    <FormInput
                        title={translate('modals.aux.fields.code.label', {
                            val: modalName
                        })}
                        placeholder={translate('modals.aux.fields.code.ph', {
                            val: modalName
                        })}
                        onChangeText={setCode}
                        value={code}
                    />
                </ScrollView>
            </SafeAreaView>
            <ModalFooter
                disabled={!validForm()}
                onPress={() => {
                    confirmInsertion();
                }}
                title={translate('modals.aux.confirm', {
                    val: modalName
                })}
            />
        </Modal>
    );
};

export default AddAuxModal;
