import React, {useState} from 'react';
import {
    KeyboardTypeOptions,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';
import CommonStyles, {
    MAIN_LIGHT_GREY,
    MAIN_RED,
    poppinsRegular,
    widthPercentageToDP
} from '../../../styles';

const {
    fullViewWidthInside,
    centerHorizontally,
    centerVertically,
    justifyAlignTopVertical,
    justifyAlignLeftVertical,
    spaceBetween
} = CommonStyles;
const LINE_HEIGHT = 25;
const STYLES = StyleSheet.create({
    errorContainer: {
        marginBottom: 16
    },
    errorSpacer: {
        maxWidth: widthPercentageToDP(27.669902912621357),
        width: widthPercentageToDP(27.669902912621357)
    },
    errorText: {
        color: MAIN_RED,
        fontSize: 13,
        fontFamily: poppinsRegular,
        maxWidth: widthPercentageToDP(90),
        width: widthPercentageToDP(90)
    },
    fieldContainer: {
        // marginBottom: 16
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
        maxWidth: widthPercentageToDP(80),
        width: widthPercentageToDP(80),
        fontSize: 14,
        opacity: 0.6,
        fontWeight: 'bold'
    },
    textInput: {
        padding: 0,
        maxWidth: widthPercentageToDP(95),
        width: widthPercentageToDP(95),
        borderBottomWidth: 1,
        borderBottomColor: '#707070',
        fontSize: 14
    }
});

const FormInput: React.FunctionComponent<{
    title: string;
    placeholder: string;
    errText?: string;
    defaultValue?: string;
    maxLength?: number;
    disabled?: boolean;
    required?: boolean;
    pattern?: string[];
    keyboardType?: KeyboardTypeOptions;
    value?: string | undefined | null;
    onChangeText?: (text: string) => void;
    onValidation?: (valids: boolean | boolean[]) => void;
}> = ({
    title,
    placeholder,
    defaultValue,
    value,
    errText,
    onChangeText,
    disabled,
    required,
    pattern,
    maxLength,
    keyboardType,
    onValidation
}: {
    title: string;
    placeholder: string;
    defaultValue?: string;
    errText?: string;
    maxLength?: number;
    disabled?: boolean;
    required?: boolean;
    pattern?: string[];
    keyboardType?: KeyboardTypeOptions;
    value?: string | undefined | null;
    onChangeText?: (text: string) => void;
    onValidation?: (valids: boolean | boolean[]) => void;
}) => {
    const [err, setErr] = useState<boolean | boolean[]>(false);
    const handleValidation = (text: string) => {
        if (!pattern || !pattern.length) return true;

        if (pattern.length === 1) {
            const condition = new RegExp(pattern[0], 'g');
            return condition.test(text);
        }
        const conditions = pattern.map((rule) => new RegExp(rule, 'g'));
        return conditions.map((condition) => condition.test(text));
    };

    const onChange = (_value: string) => {
        const isValid = handleValidation(_value);
        setErr(!isValid);
        if (onValidation) {
            onValidation(isValid);
        }
        if (onChangeText) {
            onChangeText(_value);
        }
    };

    return (
        <>
            <View
                style={[
                    fullViewWidthInside,
                    centerVertically,
                    justifyAlignTopVertical,
                    justifyAlignLeftVertical,
                    STYLES.fieldContainer
                ]}>
                <Text style={[STYLES.label, STYLES.textStyle]}>
                    {required ? `${title} *` : title}
                </Text>
                <TextInput
                    autoCapitalize="none"
                    maxLength={maxLength}
                    keyboardType={keyboardType || 'default'}
                    onChangeText={(text: string) => onChange(`${text}`)}
                    value={value || ''}
                    editable={disabled !== undefined ? !disabled : true}
                    defaultValue={defaultValue || ''}
                    style={[
                        STYLES.textInput,
                        STYLES.textStyle,
                        disabled ? STYLES.disabledInput : {}
                    ]}
                    placeholderTextColor={MAIN_LIGHT_GREY}
                    placeholder={placeholder}
                />
            </View>
            {err ? (
                <View
                    style={[
                        STYLES.errorContainer,
                        centerHorizontally,
                        spaceBetween
                    ]}>
                    <Text style={[STYLES.errorText]}>{errText}</Text>
                </View>
            ) : (
                <View style={[STYLES.errorContainer]} />
            )}
        </>
    );
};

FormInput.defaultProps = {
    defaultValue: '',
    value: '',
    errText: '',
    keyboardType: 'default',
    disabled: false,
    required: false,
    maxLength: 60,
    pattern: [],
    onValidation: () => {},
    onChangeText: () => {}
};

export default FormInput;
