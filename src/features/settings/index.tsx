import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SettingsPage from './pages/settings-page.component';
import {SettingsStackParamsTypes} from '../../core/types/settings-stack-params.types';
import miscUtils from '../../utils/misc.utils';

const SETTINGS_STACK = createStackNavigator<SettingsStackParamsTypes>();

const SettingsStackScreens = () => (
    <SETTINGS_STACK.Navigator screenOptions={{...miscUtils.stackHeaderOptions}}>
        <SETTINGS_STACK.Screen
            name="settingsListScreen"
            component={SettingsPage}
        />
    </SETTINGS_STACK.Navigator>
);

export default SettingsStackScreens;
