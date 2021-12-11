import * as React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {FlatList, SafeAreaView, Text, ToastAndroid, View} from 'react-native';
import {useContext, useMemo, useState} from 'react';
import {publish as eventPub} from 'pubsub-js';
import {ParcPrepScreenProps} from '../../../core/types/parc-prep-screen-props.type';
import CommonStyles from '../../../styles';
import ParcPrepCard from '../../../shared/components/parc-prep-card/parc-prep-card.component';
import MatButton from '../../../shared/components/mat-button.component';
import AddLogDetails from '../../../shared/components/add-log-modal/add-log-modal.component';
import {translate} from '../../../utils/i18n.utils';
import {MainStateContextInterface} from '../../../core/interfaces/main-state.interface';
import MainStateContext from '../../../core/contexts/main-state.context';
import {ParcPrepAllDetailsInterface} from '../../../core/interfaces/parc-prep-all-details.interface';
import AddParcFileDetails from '../../../shared/components/add-parc-file-modal/add-parc-file-modal.component';
import EventTopicEnum from '../../../core/enum/event-topic.enum';
import syncForm from '../../../core/services/sync-logs.service';
import {requestServerEdit} from '../../../utils/modal.utils';
import {getLogs} from '../../../core/services/logs.service';
import {LogDetailsInterface} from '../../../core/interfaces/log.interface';

const {
    appPage,
    centerVertically,
    justifyAlignCenter,
    scrollView,
    vSpacer12,
    fabButtonView,
    fabButton,
    backgroundMain,
    pT2,
    pB60,
    noContent
} = CommonStyles;

const PrepParcListPage: React.FunctionComponent<ParcPrepScreenProps> = ({
    navigation
}: any) => {
    const [addLogModalShow, setAddLogModalShow] = useState<boolean>(false);
    const [addParcFileModalShow, setAddParcFileModalShow] = useState<boolean>(
        false
    );
    const [oldParc, setOldParc] = useState<ParcPrepAllDetailsInterface | null>(
        null
    );
    const [selectedParcId, setSelectedParcId] = useState<string>();

    const {
        gasolines,
        parcPrepFiles,
        cubers,
        setLogs,
        setFilteringId,
        serverData
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
        navigation.navigate('logsStack')
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

    const renderItem = ({item}: {item: ParcPrepAllDetailsInterface}) => (
        <>
            <ParcPrepCard
                parcPrepFile={item}
                goToLogs={navToLogsList}
                editParc={() => {
                    setOldParc(item);
                    setAddParcFileModalShow(true);
                }}
                onAddLog={() => {
                    setSelectedParcId(item.id);
                    setAddLogModalShow(true);
                }}
            />
            <View style={[vSpacer12]} />
        </>
    );

    return (
        <>
            <SafeAreaView style={[appPage]}>
                {parcPrepFiles.length ? (
                    <FlatList
                        contentContainerStyle={[
                            centerVertically,
                            justifyAlignCenter,
                            scrollView,
                            pT2,
                            pB60
                        ]}
                        data={parcPrepFiles}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => `${index}`}
                    />
                ) : (
                    <View>
                        <Text style={[noContent]}>
                            {translate('parcPrep.noContent')}
                        </Text>
                    </View>
                )}

                <AddLogDetails
                    parcPrepFileId={selectedParcId}
                    gasolineList={gasolines}
                    modalVisible={addLogModalShow}
                    onClose={(refresh: boolean | undefined) => {
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

            <View style={[fabButtonView]}>
                <MatButton
                    isFab
                    isElevated
                    onPress={onSyncAllClicked}
                    disabled={!parcPrepFiles.length || !notSyncedFiles.length}>
                    <View
                        style={[
                            centerVertically,
                            justifyAlignCenter,
                            fabButton,
                            backgroundMain
                        ]}>
                        <Icon name="sync" size={40} color="#fff" />
                    </View>
                </MatButton>
            </View>
        </>
    );
};

export default PrepParcListPage;
