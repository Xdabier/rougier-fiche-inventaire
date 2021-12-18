import React, {
    createRef,
    RefObject,
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
import {SQLError} from 'react-native-sqlite-storage';
import CommonStyles, {
    FILTER_ROW_HEIGHT,
    MAIN_LIGHT_GREY,
    poppinsRegular
} from '../../../styles';
import ModalHeader from '../modal-header/modal-header.component';
import {translate} from '../../../utils/i18n.utils';
import ModalFooter from '../modal-footer/modal-footer.component';
import FormInput from '../form-input/form-input.component';
import DateInput from '../date-input/date-input.component';
import FormCheckbox from '../form-checkbox/form-checkbox.component';
import ActionSheetContent from '../action-sheet-content/action-sheet-content.component';
import MatButton from '../mat-button.component';
import SelectInput from '../select-input/select-input.component';
import {ParcPrepInterface} from '../../../core/interfaces/parc-prep.interface';
import {
    insertParcPrepFile,
    updateParcPrep
} from '../../../core/services/parc-prep.service';
import {ParcPrepAllDetailsInterface} from '../../../core/interfaces/parc-prep-all-details.interface';
import {requestCloseModal} from '../../../utils/modal.utils';
import {MainStateContextInterface} from '../../../core/interfaces/main-state.interface';
import MainStateContext from '../../../core/contexts/main-state.context';
import ScanInput from '../scan-input/scan-input.component';
import CameraModal from '../camera-modal/camera-modal.component';

const TYPES = ['Attribution code a barre', 'Inventaire'];

const {
    fullWidth,
    appPage,
    vSpacer25,
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

const AddParcFileDetails: React.FunctionComponent<{
    modalVisible: boolean;
    oldFile?: ParcPrepAllDetailsInterface | null;
    onClose: (refresh?: boolean) => void;
}> = ({
    modalVisible,
    onClose,
    oldFile
}: {
    modalVisible: boolean;
    onClose: (refresh?: boolean) => void;
    oldFile?: ParcPrepAllDetailsInterface | null;
}) => {
    const [cameraModalShow, setCameraModalShow] = useState<boolean>(false);
    const [id, setId] = useState<string>('');
    const [idValid, setIdValid] = useState<boolean | boolean[]>(true);
    const [aac, setAac] = useState<string>('');
    const [type, setType] = useState<string>('');
    const [aacValid, setAacValid] = useState<boolean | boolean[]>(true);
    const [date, setDate] = useState<Date>(new Date());
    const [defaultParc, setDefaultParc] = useState<boolean>(true);
    const [site, setSite] = useState<string>('');

    const [selectedList, setSelectedList] = useState<'type' | 'none'>('none');

    const {keyboardHeight} = useContext<MainStateContextInterface>(
        MainStateContext
    );

    const validForm = () =>
        !!(idValid && aacValid && aac && aac.length && type);

    const onSelectMenu = (list: 'type' | 'none'): void => {
        setSelectedList(list);
        if (list === 'none') {
            actionSheetRef.current?.setModalVisible(false);
        } else {
            actionSheetRef.current?.setModalVisible();
        }
    };

    const clearFields = () => {
        setId('');
        setAac('');
        setDate(new Date());
        setType('');
        setSite('');
    };

    useEffect(() => {
        if (oldFile) {
            setId(oldFile.id);
            setAac(oldFile.aac);
            setAacValid(true);
            setIdValid(true);
            setType(oldFile ? `${oldFile.type}` : '');
            setDate(new Date(oldFile.creationDate));
            setDefaultParc(!!oldFile.isDefault);
        }
    }, [oldFile]);

    const checkIfOnlyDefaultChanged = () =>
        date.toISOString() === oldFile?.creationDate &&
        type === oldFile.type &&
        aac === oldFile.aac;

    const confirmInsertion = () => {
        if (validForm() && type) {
            const EL: ParcPrepInterface = {
                id,
                creationDate: date.toISOString(),
                aac,
                type,
                site,
                defaultParcFile: defaultParc ? 1 : 0
            };

            if (oldFile) {
                EL.id = `${oldFile.id}`;
                updateParcPrep(EL, !checkIfOnlyDefaultChanged())
                    .then((res) => {
                        if (res && res.rows) {
                            clearFields();
                            onClose(true);
                            ToastAndroid.show(
                                translate('modals.parcPrep.succMsgEdit'),
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
                insertParcPrepFile(EL)
                    .then((res) => {
                        if (res && res.rows) {
                            clearFields();
                            onClose(true);
                            ToastAndroid.show(
                                translate('modals.parcPrep.succMsg'),
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
            }
        } else {
            ToastAndroid.show(translate('common.validErr'), ToastAndroid.LONG);
        }
    };

    const renderFilterBtn = ({item}: {item: string}, _i: number) => (
        <MatButton
            onPress={() => {
                if (selectedList === 'type') {
                    setType(item);
                }

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
                    clearFields();
                    onClose();
                });
            }}
            animationType="slide"
            visible={modalVisible}>
            <ModalHeader
                title={translate(
                    oldFile
                        ? 'common.editParcPrepFile'
                        : 'common.addParcPrepFile'
                )}
                onClose={() => {
                    requestCloseModal(() => {
                        clearFields();
                        onClose();
                    });
                }}
            />
            <SafeAreaView style={[appPage]}>
                <ScrollView>
                    <FormInput
                        maxLength={25}
                        title={translate('modals.parcPrep.fields.id.label')}
                        placeholder={translate('modals.parcPrep.fields.id.ph')}
                        onChangeText={setId}
                        value={id}
                        pattern={['^(.){3,}$']}
                        errText={translate('modals.parcPrep.fields.id.err')}
                        onValidation={setIdValid}
                        disabled={!!oldFile && !!oldFile?.id}
                        required
                    />
                    <FormInput
                        maxLength={8}
                        title={translate('modals.parcPrep.fields.aac.label')}
                        placeholder={translate('modals.parcPrep.fields.aac.ph')}
                        onChangeText={setAac}
                        value={aac}
                        pattern={[
                            '(99|[0-9]?[0-9])-(99|[0-9]?[0-9])-(99|[0-9]?[0-9])'
                        ]}
                        errText={translate('modals.parcPrep.fields.aac.err')}
                        onValidation={setAacValid}
                        required
                    />
                    <DateInput
                        title={translate('modals.parcPrep.fields.date.label')}
                        value={date}
                        onDateChange={(newDate: Date) => {
                            setDate(newDate);
                        }}
                    />
                    <SelectInput
                        title={translate('modals.parcPrep.fields.type.label')}
                        placeholder={translate(
                            'modals.parcPrep.fields.type.ph'
                        )}
                        showSelectMenu={() => {
                            onSelectMenu('type');
                        }}
                        value={type}
                        required
                    />
                    {type === 'Inventaire' && (
                        <ScanInput
                            title={translate('modals.logs.fields.site.label')}
                            placeholder={translate(
                                'modals.logs.fields.site.ph'
                            )}
                            onChangeText={(text) => {
                                setSite(text);
                            }}
                            keyboardType="default"
                            value={site}
                            showCodeScanner={() => setCameraModalShow(true)}
                            required
                        />
                    )}
                    <View style={[vSpacer25]} />
                    <FormCheckbox
                        value={defaultParc}
                        onValueChange={setDefaultParc}
                        title={translate(
                            'modals.parcPrep.fields.parcAsDefault.label'
                        )}
                    />
                </ScrollView>
            </SafeAreaView>
            <ModalFooter
                disabled={!validForm()}
                onPress={confirmInsertion}
                title={translate('modals.parcPrep.confirm')}
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
                    valuesList={TYPES}
                    renderElement={renderFilterBtn}
                />
            </ActionSheetComponent>

            <CameraModal
                modalVisible={cameraModalShow}
                onClose={(code?: string) => {
                    if (code && code.length) {
                        setSite(code);
                    }

                    setCameraModalShow(false);
                }}
                modalName={translate('common.scanBarCode')}
            />
        </Modal>
    );
};

AddParcFileDetails.defaultProps = {
    oldFile: null
};

export default AddParcFileDetails;
