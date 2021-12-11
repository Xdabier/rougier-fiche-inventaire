import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {CommonPropsType} from './common-props.type';
import {SettingsStackParamsTypes} from './settings-stack-params.types';

type SettingsScreenNavigationProps = StackNavigationProp<
    SettingsStackParamsTypes,
    'settingsListScreen'
>;

type SettingsScreenRouteProps = RouteProp<
    SettingsStackParamsTypes,
    'settingsListScreen'
>;

export interface SettingsScreenProps extends CommonPropsType {
    navigation: SettingsScreenNavigationProps;
    route: SettingsScreenRouteProps;
}
