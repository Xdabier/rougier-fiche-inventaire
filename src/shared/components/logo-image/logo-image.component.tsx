import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {I18n} from '../../../utils/i18n.utils';

const STYLES = StyleSheet.create({
    half: {
        width: 38,
        height: 37
    },
    full: {
        width: 107.5,
        height: 31
    }
});

const LogoImage: React.FunctionComponent<{
    half?: boolean;
}> = ({half}: {half?: boolean}) =>
    half ? (
        <Image
            style={[STYLES.half]}
            source={require('../../../assets/img/logo-half.jpg')}
        />
    ) : (
        <Image
            style={[STYLES.full]}
            source={
                I18n.currentLocale() === 'fr'
                    ? require('../../../assets/img/logo.jpg')
                    : require('../../../assets/img/logo-en.jpg')
            }
        />
    );

LogoImage.defaultProps = {
    half: false
};

export default LogoImage;
