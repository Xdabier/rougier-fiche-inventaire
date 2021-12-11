import * as React from 'react';
import LogoImage from '../shared/components/logo-image/logo-image.component';
import {MAIN_ELEVATION, STACK_HEADER_HEIGHT} from '../styles';

const stackHeaderOptions: any = {
    headerTitle: () => <LogoImage />,
    headerTitleAlign: 'center',
    headerStyle: {
        height: STACK_HEADER_HEIGHT,
        elevation: MAIN_ELEVATION
    }
};

const miscUtils = {
    stackHeaderOptions
};

export default miscUtils;
