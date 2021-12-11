import React, {useEffect, useState} from 'react';
import {
    Modal,
    PermissionsAndroid,
    SafeAreaView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import ScanBarCode from 'react-native-scan-barcode';
import CommonStyles, {
    BORDER_RADIUS,
    heightPercentageToDP,
    MAIN_GREY,
    MAIN_RED,
    poppinsMedium,
    widthPercentageToDP
} from '../../../styles';
import ModalHeader from '../modal-header/modal-header.component';
import {translate} from '../../../utils/i18n.utils';
import ModalFooter from '../modal-footer/modal-footer.component';
import {requestCloseModal} from '../../../utils/modal.utils';

const {
    fullWidth,
    centerVertically,
    justifyAlignLeftVertical,
    justifyAlignCenter,
    justifyCenter
} = CommonStyles;
const STYLES = StyleSheet.create({
    cameraContainer: {
        height: heightPercentageToDP(62),
        width: widthPercentageToDP(100),
        borderRadius: BORDER_RADIUS
    },
    showCode: {
        height: heightPercentageToDP(12),
        width: widthPercentageToDP(100),
        padding: 10
    },
    codeStyle: {
        fontFamily: poppinsMedium,
        fontSize: 22,
        color: MAIN_GREY
    }
});
const CameraModal: React.FunctionComponent<{
    modalVisible: boolean;
    onClose: (code?: string) => void;
    modalName: string;
}> = ({
    modalVisible,
    onClose,
    modalName
}: {
    modalVisible: boolean;
    onClose: (code?: string) => void;
    modalName: string;
}) => {
    const [code, setCode] = useState<string>('');
    const [permission, setPermission] = useState<boolean>(false);

    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Cool Photo App Camera Permission',
                    message:
                        'Cool Photo App needs access to your camera ' +
                        'so you can take awesome pictures.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK'
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                setPermission(true);
                console.log('You can use the camera');
            } else {
                console.log('Camera permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };

    useEffect(() => {
        if (!permission) {
            requestCameraPermission().catch();
        }
    }, [permission]);

    const onBarCodeScanned = (ev: {data: string; type: string}) => {
        if (ev) {
            setCode(ev.data);
        }
    };

    return (
        <Modal
            style={[fullWidth]}
            onRequestClose={() => {
                requestCloseModal(() => {
                    setCode('');
                    onClose();
                }, translate('closeModalAlert.message_code'));
            }}
            animationType="slide"
            visible={modalVisible}>
            <ModalHeader
                title={modalName}
                onClose={() => {
                    requestCloseModal(
                        onClose,
                        translate('closeModalAlert.message_code')
                    );
                }}
            />
            <SafeAreaView
                style={[centerVertically, justifyAlignCenter, fullWidth]}>
                <View
                    style={[
                        STYLES.showCode,
                        centerVertically,
                        justifyAlignLeftVertical,
                        justifyCenter
                    ]}>
                    <Text style={[STYLES.codeStyle]}>Code: {code}</Text>
                </View>
                <View style={[STYLES.cameraContainer]}>
                    <ScanBarCode
                        cameraType="back"
                        torchMode="off"
                        onBarCodeRead={onBarCodeScanned}
                        viewFinderHeight={heightPercentageToDP(7)}
                        viewFinderWidth={widthPercentageToDP(35)}
                        viewFinderBorderWidth={2}
                        viewFinderBorderLength={15}
                        viewFinderBorderColor={MAIN_RED}
                        style={{
                            flex: 1
                        }}
                    />
                </View>
            </SafeAreaView>
            <ModalFooter
                disabled={!code || !code.length}
                onPress={() => onClose(code)}
                title={translate('common.validate')}
            />
        </Modal>
    );
};

export default CameraModal;
