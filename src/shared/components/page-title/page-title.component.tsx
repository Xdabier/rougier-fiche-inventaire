import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CommonStyles, {
    PAGE_TITLE_LINE_HEIGHT,
    poppinsMedium
} from '../../../styles';

const {fullWidth, mainColor} = CommonStyles;
const STYLES = StyleSheet.create({
    title: {
        fontFamily: poppinsMedium,
        fontSize: 23,
        lineHeight: PAGE_TITLE_LINE_HEIGHT,
        textAlign: 'left'
    }
});

const PageTitle: React.FunctionComponent<{
    title: string;
}> = ({title}: {title: string}) => (
    <View style={[fullWidth]}>
        <Text style={[mainColor, STYLES.title]}>{title}</Text>
    </View>
);

export default PageTitle;
