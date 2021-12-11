import {StackNavigationProp} from '@react-navigation/stack';
import {MainTabsNavigationProps} from './main-tabs-params.type';

type SettingsStackNavigationProps = StackNavigationProp<
    MainTabsNavigationProps,
    'settingsStack'
>;

export type SettingsStackProps = {
    navigation: SettingsStackNavigationProps;
};
