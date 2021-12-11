import {StackNavigationProp} from '@react-navigation/stack';
import {MainTabsNavigationProps} from './main-tabs-params.type';

type ParcPrepStackNavigationProps = StackNavigationProp<
    MainTabsNavigationProps,
    'parcPrepStack'
>;

export type ParcPrepStackProps = {
    navigation: ParcPrepStackNavigationProps;
};
