import React, {
    createRef,
    RefObject,
    useCallback,
    useContext,
    useEffect,
    useState
} from 'react';
import {
    Modal,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    ToastAndroid,
    View
} from 'react-native';
import ActionSheetComponent from 'react-native-actions-sheet';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ResultSet, SQLError} from 'react-native-sqlite-storage';
import CommonStyles, {
    FILTER_ROW_HEIGHT,
    MAIN_LIGHT_GREY,
    poppinsRegular
} from '../../../styles';
import ModalHeader from '../modal-header/modal-header.component';
import {translate} from '../../../utils/i18n.utils';
import ModalFooter from '../modal-footer/modal-footer.component';
import FormInput from '../form-input/form-input.component';
import ActionSheetContent from '../action-sheet-content/action-sheet-content.component';
import {GasolineInterface} from '../../../core/interfaces/gasoline.interface';
import MatButton from '../mat-button.component';
import {
    LogDetailsInterface,
    LogInterface
} from '../../../core/interfaces/log.interface';
import {MainStateContextInterface} from '../../../core/interfaces/main-state.interface';
import MainStateContext from '../../../core/contexts/main-state.context';
import {insertLog, updateLog} from '../../../core/services/logs.service';
import CameraModal from '../camera-modal/camera-modal.component';
import {requestCloseModal} from '../../../utils/modal.utils';
import ScanInput from '../scan-input/scan-input.component';

const {
    fullWidth,
    appPage,
    vSpacer100,
    scrollView,
    centerHorizontally,
    justifyAlignTLeftHorizontal,
    alignCenter
} = CommonStyles;

const TEXT_LINE_HEIGHT = 27;
const STYLES = StyleSheet.create({
    searchResult: {
        height: FILTER_ROW_HEIGHT,
        borderBottomWidth: 1,
        borderBottomColor: MAIN_LIGHT_GREY
    },
    searchResultText: {
        marginLeft: 18,
        fontFamily: poppinsRegular,
        fontSize: 16,
        lineHeight: TEXT_LINE_HEIGHT
    }
});

const actionSheetRef: RefObject<ActionSheetComponent> = createRef();

const AddLogDetails: React.FunctionComponent<{
    modalVisible: boolean;
    parcPrepFileId?: string | null;
    scannedBarCode?: string | null;
    oldLog?: LogDetailsInterface | null;
    gasolineList: GasolineInterface[];
    onClose: (refresh?: boolean) => void;
}> = ({
    modalVisible,
    onClose,
    oldLog,
    scannedBarCode,
    parcPrepFileId,
    gasolineList
}: {
    modalVisible: boolean;
    parcPrepFileId?: string | null;
    scannedBarCode?: string | null;
    oldLog?: LogDetailsInterface | null;
    onClose: (refresh?: boolean) => void;
    gasolineList: GasolineInterface[];
}) => {
    const [cameraModalShow, setCameraModalShow] = useState<boolean>(false);
    const [barCode, setBarCode] = useState<string>(scannedBarCode || '');
    const [, setId] = useState<string>('');
    const [sectionNumber, setSectionNumber] = useState<string>('');

    const {defaultParc, keyboardHeight} = useContext<MainStateContextInterface>(
        MainStateContext
    );

    const resetFields = useCallback(
        (data?: LogDetailsInterface) => {
            setBarCode(data ? data.barcode : '');
            setId(data ? `${data.id}` : '');
            setSectionNumber(data ? `${data.sectionNumber}` : '');

            if (scannedBarCode && !data) {
                setBarCode(scannedBarCode);
            }
        },
        [scannedBarCode]
    );

    useEffect(() => {
        if (oldLog) {
            resetFields(oldLog);
        } else {
            resetFields();
        }
    }, [modalVisible, oldLog, resetFields]);

    const validForm = () =>
        barCode &&
        barCode.length >= 3 &&
        sectionNumber &&
        sectionNumber.length >= 1;

    const confirmInsertion = () => {
        if (validForm() && defaultParc && Object.keys(defaultParc).length) {
            const EL: LogInterface = {
                barCode,
                creationDate: new Date().toISOString(),
                parcPrepId:
                    parcPrepFileId && parcPrepFileId.length
                        ? parcPrepFileId
                        : defaultParc.parcId,
                sectionNumber
            };

            if (oldLog) {
                EL.parcPrepId = oldLog.parcPrepId;
                updateLog(oldLog.id, EL)
                    .then((res: ResultSet) => {
                        if (res && res.rows) {
                            resetFields();
                            onClose(true);
                            ToastAndroid.show(
                                translate('modals.logs.succMsgEdit'),
                                ToastAndroid.SHORT
                            );
                        }
                    })
                    .catch((reason: SQLError) => {
                        console.error('er = ', reason);
                        if (!reason.code) {
                            ToastAndroid.show(
                                translate('common.dupErr'),
                                ToastAndroid.LONG
                            );
                        }
                    });
            } else {
                insertLog(EL)
                    .then((res: ResultSet) => {
                        console.log('res = ', res);
                        if (res && res.rows) {
                            resetFields();
                            onClose(true);
                            ToastAndroid.show(
                                translate('modals.logs.succMsg'),
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
        } else {
            ToastAndroid.show(
                'Ne default parc, or one of the fields is wrong.',
                ToastAndroid.LONG
            );
        }
    };

    const renderFilterBtn = ({item}: {item: string}, _i: number) => (
        <MatButton
            onPress={() => {
                setSectionNumber(item);
                actionSheetRef.current?.setModalVisible(false);
            }}
            key={_i}>
            <View
                style={[
                    scrollView,
                    centerHorizontally,
                    justifyAlignTLeftHorizontal,
                    alignCenter,
                    STYLES.searchResult
                ]}>
                <Icon
                    name="photo-size-select-actual"
                    size={TEXT_LINE_HEIGHT}
                    color={MAIN_LIGHT_GREY}
                />
                <Text style={[STYLES.searchResultText]}>{item}</Text>
            </View>
        </MatButton>
    );

    return (
        <Modal
            style={[fullWidth]}
            onRequestClose={() => {
                requestCloseModal(() => {
                    resetFields();
                    onClose();
                });
            }}
            animationType="slide"
            visible={modalVisible}>
            <ModalHeader
                title={translate(oldLog ? 'common.editLog' : 'common.addLog')}
                onClose={() => {
                    requestCloseModal(() => {
                        resetFields();
                        onClose();
                    });
                }}
            />
            <SafeAreaView style={[appPage]}>
                <ScrollView>
                    <ScanInput
                        title={translate('modals.logs.fields.barCode.label')}
                        placeholder={translate('modals.logs.fields.barCode.ph')}
                        onChangeText={setBarCode}
                        keyboardType="number-pad"
                        value={barCode}
                        showCodeScanner={() => setCameraModalShow(true)}
                        required
                    />
                    <FormInput
                        title={translate(
                            'modals.logs.fields.sectionNumber.label'
                        )}
                        placeholder={translate(
                            'modals.logs.fields.sectionNumber.ph'
                        )}
                        onChangeText={setSectionNumber}
                        value={sectionNumber}
                        required
                    />
                    <View style={[vSpacer100]} />
                </ScrollView>
            </SafeAreaView>
            <ModalFooter
                disabled={!validForm()}
                onPress={confirmInsertion}
                title={translate('modals.logs.confirm')}
            />

            <ActionSheetComponent
                initialOffsetFromBottom={0.6}
                ref={actionSheetRef}
                statusBarTranslucent
                bounceOnOpen
                bounciness={4}
                gestureEnabled
                defaultOverlayOpacity={0.3}>
                <ActionSheetContent
                    keyboardHeight={keyboardHeight}
                    actionSheetRef={actionSheetRef}
                    valuesList={gasolineList || []}
                    renderElement={renderFilterBtn}
                />
            </ActionSheetComponent>

            <CameraModal
                modalVisible={cameraModalShow}
                onClose={(code?: string) => {
                    if (code && code.length) {
                        setBarCode(code);
                    }

                    setCameraModalShow(false);
                }}
                modalName={translate('common.scanBarCode')}
            />
        </Modal>
    );
};

AddLogDetails.defaultProps = {
    parcPrepFileId: null,
    oldLog: null,
    scannedBarCode: null
};

export default AddLogDetails;
