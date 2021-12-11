import * as React from 'react';
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    ToastAndroid,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useContext, useMemo, useState} from 'react';
import {publish as eventPub} from 'pubsub-js';
import {HomeScreenProps} from '../../../core/types/home-screen-props.type';
import CommonStyles, {
    BORDER_RADIUS,
    MAIN_GREEN,
    MAIN_RED,
    PADDING_HORIZONTAL,
    poppinsMedium
} from '../../../styles';
import {translate} from '../../../utils/i18n.utils';
import PageTitle from '../../../shared/components/page-title/page-title.component';
import ParcPrepCard from '../../../shared/components/parc-prep-card/parc-prep-card.component';
import MatButton from '../../../shared/components/mat-button.component';
import AddLogDetails from '../../../shared/components/add-log-modal/add-log-modal.component';
import AddParcFileDetails from '../../../shared/components/add-parc-file-modal/add-parc-file-modal.component';
import EventTopicEnum from '../../../core/enum/event-topic.enum';
import {MainStateContextInterface} from '../../../core/interfaces/main-state.interface';
import MainStateContext from '../../../core/contexts/main-state.context';
import {ParcPrepAllDetailsInterface} from '../../../core/interfaces/parc-prep-all-details.interface';
import CameraModal from '../../../shared/components/camera-modal/camera-modal.component';
import syncForm from '../../../core/services/sync-logs.service';
import {requestServerEdit} from '../../../utils/modal.utils';
import {getLogs} from '../../../core/services/logs.service';
import {LogDetailsInterface} from '../../../core/interfaces/log.interface';

const {
    appPage,
    vSpacer60,
    vSpacer12,
    centerHorizontally,
    centerVertically,
    spaceEvenly,
    fullWidth,
    justifyAlignCenter,
    textAlignCenter,
    scrollView
} = CommonStyles;

const ICON_SIZE = 30;
const STYLES = StyleSheet.create({
    button: {
        width: Dimensions.get('screen').width - PADDING_HORIZONTAL * 2,
        paddingVertical: 16,
        paddingHorizontal: 40,
        borderRadius: BORDER_RADIUS
    },
    buttonSecond: {
        backgroundColor: MAIN_RED
    },
    buttonMain: {
        backgroundColor: MAIN_GREEN
    },
    buttonText: {
        lineHeight: 30,
        fontFamily: poppinsMedium,
        fontSize: 18,
        color: '#fff'
    },
    textView: {
        width: 240
    }
});

const HomePage: React.FunctionComponent<HomeScreenProps> = ({
    navigation
}: any) => {
    const [barCode, setBarCode] = useState<string>('');
    const [addLogModalShow, setAddLogModalShow] = useState<boolean>(false);
    const [cameraModalShow, setCameraModalShow] = useState<boolean>(false);
    const [addParcFileModalShow, setAddParcFileModalShow] = useState<boolean>(
        false
    );
    const [oldParc, setOldParc] = useState<ParcPrepAllDetailsInterface | null>(
        null
    );
    const {
        homeParcPrepFile,
        gasolines,
        cubers,
        serverData,
        setFilteringId,
        setLogs,
        parcPrepFiles
    } = useContext<MainStateContextInterface>(MainStateContext);

    const notSyncedFiles = useMemo(
        () =>
            parcPrepFiles.filter(
                (file: ParcPrepAllDetailsInterface) =>
                    !file.allSynced && file.logsNumber
            ),
        [parcPrepFiles]
    );

    const refreshFilter = (parcId: string) => {
        getLogs(parcId).then((value: LogDetailsInterface[]) => {
            if (setLogs) {
                setLogs(value);
            }
        });
    };

    const navToLogsList = (id: string) => {
        if (setFilteringId) {
            setFilteringId(id);
        }
        refreshFilter(id);
        navigation.navigate('logsStack');
    };

    const onSyncAllClicked = async () => {
        if (!serverData) {
            requestServerEdit(() => {
                navigation.navigate('settingsStack');
                setTimeout(() => eventPub(EventTopicEnum.showServerModal), 666);
            });
        }
        if (serverData && notSyncedFiles && notSyncedFiles.length) {
            try {
                eventPub(EventTopicEnum.setSpinner, true);
                const SYNC_ALL = notSyncedFiles.map(
                    (file: ParcPrepAllDetailsInterface) =>
                        syncForm(file, serverData)
                );

                const RES = await Promise.all(SYNC_ALL);
                eventPub(EventTopicEnum.setSpinner, false);
                if (!RES.includes(0)) {
                    ToastAndroid.show(
                        translate('common.succAllSync'),
                        ToastAndroid.SHORT
                    );
                }
            } catch (e) {
                eventPub(EventTopicEnum.setSpinner, false);
                ToastAndroid.show(
                    translate('common.syncError'),
                    ToastAndroid.SHORT
                );
                throw Error(e);
            }
        }
    };

    return (
        <SafeAreaView style={[appPage]}>
            <ScrollView
                contentContainerStyle={[
                    centerVertically,
                    justifyAlignCenter,
                    scrollView
                ]}>
                {homeParcPrepFile ? (
                    <>
                        <PageTitle title={translate('homePage.title')} />

                        <ParcPrepCard
                            parcPrepFile={homeParcPrepFile}
                            goToLogs={navToLogsList}
                            editParc={() => {
                                setOldParc(homeParcPrepFile);
                                setAddParcFileModalShow(true);
                            }}
                            onAddLog={() => setAddLogModalShow(true)}
                        />
                    </>
                ) : (
                    <View />
                )}
                <View style={[vSpacer60]} />
                <MatButton
                    onPress={() => setCameraModalShow(true)}
                    disabled={!homeParcPrepFile}>
                    <View
                        style={[
                            fullWidth,
                            STYLES.button,
                            STYLES.buttonSecond,
                            centerHorizontally,
                            spaceEvenly
                        ]}>
                        <Icon
                            name="qr-code-scanner"
                            color="#fff"
                            size={ICON_SIZE}
                        />
                        <View
                            style={[
                                STYLES.textView,
                                textAlignCenter,
                                centerHorizontally,
                                justifyAlignCenter
                            ]}>
                            <Text style={[STYLES.buttonText, textAlignCenter]}>
                                {translate('common.scanBarCode')}
                            </Text>
                        </View>
                    </View>
                </MatButton>
                <View style={[vSpacer12]} />
                <MatButton onPress={() => setAddParcFileModalShow(true)}>
                    <View
                        style={[
                            fullWidth,
                            STYLES.button,
                            STYLES.buttonMain,
                            centerHorizontally,
                            spaceEvenly
                        ]}>
                        <Icon name="post-add" color="#fff" size={ICON_SIZE} />
                        <View
                            style={[
                                STYLES.textView,
                                textAlignCenter,
                                centerHorizontally,
                                justifyAlignCenter
                            ]}>
                            <Text style={[STYLES.buttonText, textAlignCenter]}>
                                {translate('common.addParcPrepFile')}
                            </Text>
                        </View>
                    </View>
                </MatButton>
                <View style={[vSpacer12]} />
                <MatButton
                    onPress={() => setAddLogModalShow(true)}
                    disabled={!homeParcPrepFile}>
                    <View
                        style={[
                            fullWidth,
                            STYLES.button,
                            STYLES.buttonMain,
                            centerHorizontally,
                            spaceEvenly
                        ]}>
                        <Icon name="add-circle" color="#fff" size={ICON_SIZE} />
                        <View
                            style={[
                                STYLES.textView,
                                textAlignCenter,
                                centerHorizontally,
                                justifyAlignCenter
                            ]}>
                            <Text style={[STYLES.buttonText, textAlignCenter]}>
                                {translate('common.addLog')}
                            </Text>
                        </View>
                    </View>
                </MatButton>
                <View style={[vSpacer12]} />
                <MatButton
                    onPress={onSyncAllClicked}
                    disabled={!notSyncedFiles.length}>
                    <View
                        style={[
                            fullWidth,
                            STYLES.button,
                            STYLES.buttonMain,
                            centerHorizontally,
                            spaceEvenly
                        ]}>
                        <Icon name="sync" color="#fff" size={ICON_SIZE} />
                        <View
                            style={[
                                STYLES.textView,
                                textAlignCenter,
                                centerHorizontally,
                                justifyAlignCenter
                            ]}>
                            <Text style={[STYLES.buttonText, textAlignCenter]}>
                                {translate('common.syncAll')}
                            </Text>
                        </View>
                    </View>
                </MatButton>
                <View style={[vSpacer60]} />
            </ScrollView>

            <CameraModal
                modalVisible={cameraModalShow}
                onClose={(code?: string) => {
                    setCameraModalShow(false);

                    if (code && code.length) {
                        setBarCode(code);
                        setAddLogModalShow(true);
                    }
                }}
                modalName={translate('common.scanBarCode')}
            />

            <AddLogDetails
                gasolineList={gasolines}
                scannedBarCode={barCode}
                modalVisible={addLogModalShow}
                onClose={(refresh) => {
                    setAddLogModalShow(false);

                    if (refresh) {
                        eventPub(EventTopicEnum.updateParcPrep);
                    }
                }}
            />

            <AddParcFileDetails
                oldFile={oldParc}
                cubers={cubers}
                modalVisible={addParcFileModalShow}
                onClose={(refresh: boolean | undefined) => {
                    setAddParcFileModalShow(false);
                    setOldParc(null);

                    if (refresh) {
                        eventPub(EventTopicEnum.updateParcPrep);
                    }
                }}
            />
        </SafeAreaView>
    );
};

export default HomePage;
