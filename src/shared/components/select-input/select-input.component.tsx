import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import CommonStyles, {
    MAIN_LIGHT_GREY,
    poppinsRegular,
    widthPercentageToDP
} from '../../../styles';
import MatButton from '../mat-button.component';

const {
    fullViewWidthInside,
    centerHorizontally,
    spaceBetween,
    alignCenter,
    centerVertically,
    justifyAlignCenter,
    justifyAlignTopVertical,
    justifyAlignLeftVertical
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
        textAlign: 'left'
    },
    ph: {
        color: MAIN_LIGHT_GREY
    },
    val: {
        color: '#000'
    },
    label: {
        maxWidth: widthPercentageToDP(31),
        width: widthPercentageToDP(31),
        fontSize: 14,
        opacity: 0.6,
        fontWeight: 'bold'
    },
    textInput: {
        height: LINE_HEIGHT + 8,
        maxWidth: widthPercentageToDP(92),
        width: widthPercentageToDP(92),
        borderBottomWidth: 1,
        borderBottomColor: '#707070',
        paddingRight: 5,
        fontSize: 16
    },
    iconButton: {
        width: LINE_HEIGHT - 4,
        height: LINE_HEIGHT - 4,
        borderRadius: (LINE_HEIGHT - 4) / 2
    }
});

const SelectInput: React.FunctionComponent<{
    title: string;
    value?: string;
    required?: boolean;
    placeholder?: string;
    showSelectMenu?: () => void;
}> = ({
    title,
    value,
    required,
    placeholder,
    showSelectMenu
}: {
    title: string;
    value?: string;
    required?: boolean;
    placeholder?: string;
    showSelectMenu?: () => void;
}) => (
    <>
        <View
            style={[
                fullViewWidthInside,
                centerVertically,
                justifyAlignTopVertical,
                justifyAlignLeftVertical,
                STYLES.fieldContainer
            ]}>
            <Text style={[STYLES.label, STYLES.textStyle, STYLES.val]}>
                {required ? `${title} *` : title}
            </Text>
            <TouchableWithoutFeedback onPress={showSelectMenu}>
                <View
                    style={[
                        STYLES.textInput,
                        centerHorizontally,
                        spaceBetween,
                        alignCenter
                    ]}>
                    <View>
                        <Text
                            style={[
                                STYLES.textStyle,
                                value && value.length ? STYLES.val : STYLES.ph
                            ]}>
                            {value && value.length ? value : placeholder}
                        </Text>
                    </View>

                    <MatButton isIcon disabled disabledOpacity={1}>
                        <View
                            style={[
                                STYLES.iconButton,
                                centerVertically,
                                justifyAlignCenter
                            ]}>
                            <Icon
                                name="expand-more"
                                size={LINE_HEIGHT - 4}
                                color="#000"
                            />
                        </View>
                    </MatButton>
                </View>
            </TouchableWithoutFeedback>
        </View>
    </>
);

SelectInput.defaultProps = {
    showSelectMenu: () => {},
    value: '',
    placeholder: '',
    required: false
};

export default SelectInput;
