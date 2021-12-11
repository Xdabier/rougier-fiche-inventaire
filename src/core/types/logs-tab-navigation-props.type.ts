import {StackNavigationProp} from '@react-navigation/stack';
import {MainTabsNavigationProps} from './main-tabs-params.type';

type LogsStackNavigationProps = StackNavigationProp<
    MainTabsNavigationProps,
    'logsStack'
>;

export type LogsStackProps = {
    navigation: LogsStackNavigationProps;
};
