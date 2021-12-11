import React, {RefObject, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, TextInput, View} from 'react-native';
import ActionSheetComponent from 'react-native-actions-sheet';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CommonStyles, {
    BORDER_RADIUS,
    MAIN_GREY,
    widthPercentageToDP
} from '../../../styles';
import {translate} from '../../../utils/i18n.utils';
import MatButton from '../mat-button.component';

const {
    fullWidth,
    centerHorizontally,
    spaceBetween,
    alignCenter,
    centerVertically,
    justifyAlignCenter,
    vSpacer100,
    mB10,
    iconButton
} = CommonStyles;

const STYLES = StyleSheet.create({
    searchBar: {
        padding: 0,
        maxWidth: widthPercentageToDP(90),
        width: widthPercentageToDP(90),
        borderWidth: 1,
        borderColor: '#707070',
        borderRadius: BORDER_RADIUS
    },
    searchBarInput: {
        fontSize: 16
    },
    iconButton: {
        marginRight: 5
    }
});

const ActionSheetContent: React.FunctionComponent<{
    actionSheetRef: RefObject<ActionSheetComponent>;
    valuesList: any[];
    keyboardHeight?: number;
    renderElement: (val: {item: any}, index: number) => any;
}> = ({
    actionSheetRef,
    valuesList,
    keyboardHeight,
    renderElement
}: {
    actionSheetRef: RefObject<ActionSheetComponent>;
    valuesList: any[];
    keyboardHeight?: number;
    renderElement: (val: {item: any}, index: number) => any;
}) => {
    const [elementsList, setElementsList] = useState([] as any[]);
    const [searchKey, setSearchKey] = useState('');

    const initElementsList = () => {
        if (valuesList.length && valuesList.length > 99) {
            setElementsList(valuesList.slice(0, 30));
        } else {
            setElementsList(valuesList);
        }
    };

    const clearInput = () => {
        setSearchKey('');
        initElementsList();
    };

    const onKeywordChange = (_value: string) => {
        setSearchKey(_value);
        if (_value && _value.length) {
            const newList = valuesList.filter((x: any) =>
                x.name
                    ? x.name.toLowerCase().includes(_value.toLowerCase())
                    : x.toLowerCase().includes(_value.toLowerCase())
            );
            setElementsList(newList);
            return;
        }
        initElementsList();
    };

    useEffect(initElementsList, [valuesList]);

    return (
        <View>
            <ScrollView
                nestedScrollEnabled
                onScrollEndDrag={() =>
                    actionSheetRef.current?.handleChildScrollEnd()
                }
                onScrollAnimationEnd={() =>
                    actionSheetRef.current?.handleChildScrollEnd()
                }
                onMomentumScrollEnd={() =>
                    actionSheetRef.current?.handleChildScrollEnd()
                }
                contentContainerStyle={[
                    centerVertically,
                    justifyAlignCenter,
                    fullWidth
                ]}>
                <View
                    style={[
                        STYLES.searchBar,
                        mB10,
                        centerHorizontally,
                        spaceBetween,
                        alignCenter
                    ]}>
                    <TextInput
                        value={searchKey}
                        onChangeText={onKeywordChange}
                        style={[STYLES.searchBarInput]}
                        placeholder={translate('actionSheet.searchBar.ph')}
                    />
                    <MatButton onPress={clearInput} isIcon>
                        <View
                            style={[
                                STYLES.iconButton,
                                iconButton,
                                centerVertically,
                                justifyAlignCenter
                            ]}>
                            <Icon name="close" size={24} color={MAIN_GREY} />
                        </View>
                    </MatButton>
                </View>
                {elementsList.map((value, index) =>
                    renderElement({item: value}, index)
                )}
                <View style={[vSpacer100]} />
                <View style={{height: keyboardHeight}} />
            </ScrollView>
        </View>
    );
};

ActionSheetContent.defaultProps = {
    keyboardHeight: 0
};

export default ActionSheetContent;
