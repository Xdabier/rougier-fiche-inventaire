import * as React from 'react';
import {
    Alert,
    AlertButton,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useEffect, useState} from 'react';
import ReactNativeRestart from 'react-native-restart';
import {publish as eventPub, subscribe as eventSub} from 'pubsub-js';
import {getUniqueId} from 'react-native-device-info';
import {SettingsScreenProps} from '../../../core/types/settings-screen-props.type';
import CommonStyles, {
    BORDER_RADIUS,
    MAIN_LIGHT_GREY,
    poppinsMedium,
    poppinsRegular
} from '../../../styles';
import {I18n, translate} from '../../../utils/i18n.utils';
import MatButton from '../../../shared/components/mat-button.component';
import syncStorage from '../../../core/services/sync-storage.service';
import CURRENT_LANGUAGE from '../../../core/constants/storage-keys.constant';
import AddAuxModal from '../../../shared/components/add-aux-modal/add-aux-modal.component';
import EventTopicEnum from '../../../core/enum/event-topic.enum';
import SetServerInfo from '../../../shared/components/set-server-info-modal/set-server-info-modal.component';

const {
    appPage,
    hSpacer17,
    vSpacer100,
    centerHorizontally,
    justifyAlignTLeftHorizontal,
    fullViewWidthInside,
    alignCenter
} = CommonStyles;

const STYLES = StyleSheet.create({
    button: {
        borderRadius: BORDER_RADIUS,
        paddingVertical: 8,
        paddingHorizontal: 4
    },
    buttonText: {
        fontSize: 18,
        fontFamily: poppinsMedium,
        lineHeight: 30
    },
    userTitle: {
        fontSize: 16,
        fontFamily: poppinsRegular,
        color: MAIN_LIGHT_GREY
    }
});

const SettingsPage: React.FunctionComponent<SettingsScreenProps> = () => {
    const [modalToShow, setModalToShow] = useState<string>('');
    const [showServerModal, setShowServerModal] = useState<boolean>(false);

    const showModal = (modalName: 'cuber' | 'site' | 'gasoline') => {
        setModalToShow(translate(`modals.${modalName}.name`));
    };
    const ALERT_BTNS: AlertButton[] = [
        {
            text: translate('common.yes'),
            style: 'default',
            onPress: () => {
                const LNG = I18n.currentLocale();
                if (LNG === 'fr') {
                    syncStorage.set(CURRENT_LANGUAGE, 'en');
                    ReactNativeRestart.Restart();
                } else {
                    syncStorage.set(CURRENT_LANGUAGE, 'fr');
                    ReactNativeRestart.Restart();
                }
            }
        },
        {
            text: translate('common.no'),
            style: 'cancel'
        }
    ];

    useEffect(() => {
        eventSub(EventTopicEnum.showServerModal, () => {
            setShowServerModal(true);
        });

        eventSub(EventTopicEnum.hideServerModal, () => {
            setShowServerModal(false);
        });
    }, []);

    const setLanguage = () => {
        Alert.alert(
            translate('changeLanguageAlert.title'),
            translate('changeLanguageAlert.message'),
            ALERT_BTNS,
            {cancelable: true}
        );
    };

    return (
        <>
            <SafeAreaView style={[appPage]}>
                <ScrollView>
                    <View
                        style={[
                            STYLES.button,
                            centerHorizontally,
                            justifyAlignTLeftHorizontal,
                            fullViewWidthInside,
                            alignCenter
                        ]}>
                        <Icon name="smartphone" color="#000" size={30} />
                        <View style={[hSpacer17]} />
                        <Text style={[STYLES.buttonText]}>
                            {`${translate(
                                'common.deviceId'
                            )}: ${getUniqueId()}`}
                        </Text>
                    </View>
                    <MatButton onPress={() => setShowServerModal(true)}>
                        <View
                            style={[
                                STYLES.button,
                                centerHorizontally,
                                justifyAlignTLeftHorizontal,
                                fullViewWidthInside,
                                alignCenter
                            ]}>
                            <Icon
                                name="perm-data-setting"
                                color="#000"
                                size={30}
                            />
                            <View style={[hSpacer17]} />
                            <Text style={[STYLES.buttonText]}>
                                {translate('settings.setServer')}
                            </Text>
                        </View>
                    </MatButton>
                    <MatButton onPress={() => showModal('gasoline')}>
                        <View
                            style={[
                                STYLES.button,
                                centerHorizontally,
                                justifyAlignTLeftHorizontal,
                                fullViewWidthInside,
                                alignCenter
                            ]}>
                            <Icon name="ev-station" color="#000" size={30} />
                            <View style={[hSpacer17]} />
                            <Text style={[STYLES.buttonText]}>
                                {translate('settings.addGasoline')}
                            </Text>
                        </View>
                    </MatButton>
                    <MatButton onPress={() => showModal('cuber')}>
                        <View
                            style={[
                                STYLES.button,
                                centerHorizontally,
                                justifyAlignTLeftHorizontal,
                                fullViewWidthInside,
                                alignCenter
                            ]}>
                            <Icon name="engineering" color="#000" size={30} />
                            <View style={[hSpacer17]} />
                            <Text style={[STYLES.buttonText]}>
                                {translate('settings.addCuber')}
                            </Text>
                        </View>
                    </MatButton>
                    <MatButton onPress={() => showModal('site')}>
                        <View
                            style={[
                                STYLES.button,
                                centerHorizontally,
                                justifyAlignTLeftHorizontal,
                                fullViewWidthInside,
                                alignCenter
                            ]}>
                            <Icon
                                name="photo-size-select-actual"
                                color="#000"
                                size={30}
                            />
                            <View style={[hSpacer17]} />
                            <Text style={[STYLES.buttonText]}>
                                {translate('settings.addSite')}
                            </Text>
                        </View>
                    </MatButton>
                    <View style={[vSpacer100]} />
                    <MatButton onPress={setLanguage}>
                        <View
                            style={[
                                STYLES.button,
                                centerHorizontally,
                                justifyAlignTLeftHorizontal,
                                fullViewWidthInside,
                                alignCenter
                            ]}>
                            <Icon name="language" color="#000" size={30} />
                            <View style={[hSpacer17]} />
                            <Text style={[STYLES.buttonText]}>
                                {translate(`common.${I18n.currentLocale()}`)}
                            </Text>
                        </View>
                    </MatButton>
                    <View style={[vSpacer100]} />
                </ScrollView>
            </SafeAreaView>

            <SetServerInfo
                modalVisible={showServerModal}
                onClose={(refresh) => {
                    setShowServerModal(false);

                    if (refresh) {
                        eventPub(EventTopicEnum.updateServer);
                    }
                }}
            />

            <AddAuxModal
                modalVisible={!!modalToShow.length}
                onClose={(refresh) => {
                    setModalToShow('');

                    if (refresh) {
                        eventPub(EventTopicEnum.updateAux);
                    }
                }}
                modalName={modalToShow}
            />
        </>
    );
};

export default SettingsPage;
