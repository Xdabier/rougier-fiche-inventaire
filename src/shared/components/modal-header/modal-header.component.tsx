import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CommonStyles, {
    MAIN_RED,
    PADDING_HORIZONTAL,
    poppinsRegular,
    STACK_HEADER_HEIGHT
} from '../../../styles';
import LogoImage from '../logo-image/logo-image.component';
import MatButton from '../mat-button.component';

const {
    fullViewWidth,
    iconButton,
    centerVertically,
    centerHorizontally,
    rougierShadow,
    spaceBetween,
    alignCenter,
    hSpacer17,
    justifyAlignCenter,
    justifyAlignTLeftHorizontal,
    justifyAlignRightHorizontal
} = CommonStyles;
const STYLES = StyleSheet.create({
    header: {
        height: STACK_HEADER_HEIGHT,
        backgroundColor: '#fff',
        paddingHorizontal: PADDING_HORIZONTAL
    },
    spacer: {
        width: 17
    },
    title: {
        fontSize: 17,
        fontFamily: poppinsRegular,
        lineHeight: 26,
        color: MAIN_RED
    }
});

const ModalHeader: React.FunctionComponent<{
    title: string;
    onClose: () => void;
    scanCode?: boolean;
    onBarCodeScanner?: () => void;
}> = ({
    title,
    onClose,
    scanCode,
    onBarCodeScanner
}: {
    title: string;
    onClose: () => void;
    scanCode?: boolean;
    onBarCodeScanner?: () => void;
}) => (
    <View
        style={[
            rougierShadow,
            centerHorizontally,
            spaceBetween,
            fullViewWidth,
            alignCenter,
            STYLES.header
        ]}>
        <View
            style={[
                centerHorizontally,
                justifyAlignTLeftHorizontal,
                alignCenter
            ]}>
            <LogoImage half />
            <View style={[STYLES.spacer]} />
            <Text style={[STYLES.title]}>{title}</Text>
        </View>
        <View style={[centerHorizontally, justifyAlignRightHorizontal]}>
            {scanCode && onBarCodeScanner ? (
                <MatButton onPress={onBarCodeScanner} isIcon>
                    <View
                        style={[
                            iconButton,
                            centerVertically,
                            justifyAlignCenter
                        ]}>
                        <Icon
                            name="qr-code-scanner"
                            size={24}
                            color={MAIN_RED}
                        />
                    </View>
                </MatButton>
            ) : (
                <View />
            )}
            <View style={[hSpacer17]} />
            <MatButton onPress={onClose} isIcon>
                <View
                    style={[iconButton, centerVertically, justifyAlignCenter]}>
                    <Icon name="close" size={24} color={MAIN_RED} />
                </View>
            </MatButton>
        </View>
    </View>
);

ModalHeader.defaultProps = {
    onBarCodeScanner: () => true,
    scanCode: false
};

export default ModalHeader;
