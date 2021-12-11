import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LogsListPage from './pages/logs-list-page.component';
import {LogsStackParamsTypes} from '../../core/types/logs-stack-params.types';
import miscUtils from '../../utils/misc.utils';

const LOGS_STACK = createStackNavigator<LogsStackParamsTypes>();

const LogsStackScreens = () => (
    <LOGS_STACK.Navigator screenOptions={{...miscUtils.stackHeaderOptions}}>
        <LOGS_STACK.Screen name="logsList" component={LogsListPage} />
    </LOGS_STACK.Navigator>
);

export default LogsStackScreens;
