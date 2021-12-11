import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import CommonStyles, {
    poppinsRegular,
    widthPercentageToDP
} from '../../../styles';

const {
    fullViewWidthInside,
    centerHorizontally,
    justifyAlignTLeftHorizontal,
    alignCenter
} = CommonStyles;
const LINE_HEIGHT = 25;
const STYLES = StyleSheet.create({
    fieldContainer: {
        marginBottom: 16
    },
    disabledInput: {
        opacity: 0.5
    },
    textStyle: {
        fontFamily: poppinsRegular,
        lineHeight: LINE_HEIGHT,
        textAlign: 'left',
        color: '#000'
    },
    label: {
        marginLeft: 10,
        maxWidth: widthPercentageToDP(60.922330097087375),
        width: widthPercentageToDP(60.922330097087375),
        fontSize: 14
    }
});

const FormCheckbox: React.FunctionComponent<{
    title: string;
    value?: boolean;
    onValueChange: (text: boolean) => void;
}> = ({
    title,
    value,
    onValueChange
}: {
    title: string;
    value?: boolean;
    onValueChange: (val: boolean) => void;
}) => (
    <View
        style={[
            fullViewWidthInside,
            centerHorizontally,
            justifyAlignTLeftHorizontal,
            alignCenter,
            STYLES.fieldContainer
        ]}>
        <CheckBox
            value={value !== undefined ? value : false}
            onValueChange={onValueChange}
        />
        <Text style={[STYLES.label, STYLES.textStyle]}>{title}</Text>
    </View>
);

FormCheckbox.defaultProps = {
    value: false
};

export default FormCheckbox;
