import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import CommonStyles, {
    BORDER_RADIUS,
    poppinsRegular,
    TAB_BAR_BUTTON_HEIGHT,
    TAB_BAR_HEIGHT,
    TAB_BAR_VERT_PADDING
} from '../../../styles';
import MatButton from '../mat-button.component';

const {
    fullViewWidth,
    centerVertically,
    centerHorizontally,
    rougierShadow,
    alignCenter,
    justifyAlignCenter,
    backgroundSecond
} = CommonStyles;

const FOOTER_HORIZ_PADDING = 30;
const STYLES = StyleSheet.create({
    footer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        height: TAB_BAR_HEIGHT,
        backgroundColor: '#fff',
        paddingHorizontal: FOOTER_HORIZ_PADDING,
        paddingVertical: TAB_BAR_VERT_PADDING
    },
    footerButton: {
        height: TAB_BAR_BUTTON_HEIGHT,
        borderRadius: BORDER_RADIUS,
        width: Dimensions.get('window').width - FOOTER_HORIZ_PADDING * 2
    },
    title: {
        fontSize: 19,
        fontFamily: poppinsRegular,
        lineHeight: 29,
        color: '#fff'
    }
});

const ModalFooter: React.FunctionComponent<{
    title: string;
    disabled?: boolean;
    onPress: () => void;
}> = ({
    title,
    onPress,
    disabled
}: {
    title: string;
    onPress: () => void;
    disabled?: boolean;
}) => (
    <View
        style={[
            rougierShadow,
            centerHorizontally,
            justifyAlignCenter,
            fullViewWidth,
            alignCenter,
            STYLES.footer
        ]}>
        <MatButton onPress={onPress} disabled={disabled}>
            <View
                style={[
                    STYLES.footerButton,
                    centerVertically,
                    justifyAlignCenter,
                    backgroundSecond
                ]}>
                <Text style={[STYLES.title]}>{title}</Text>
            </View>
        </MatButton>
    </View>
);

ModalFooter.defaultProps = {
    disabled: false
};

export default ModalFooter;
