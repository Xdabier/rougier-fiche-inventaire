import {StackNavigationProp} from '@react-navigation/stack';
import {MainTabsNavigationProps} from './main-tabs-params.type';

type HomeStackNavigationProps = StackNavigationProp<
    MainTabsNavigationProps,
    'homeStack'
>;

export type HomeStackProps = {
    navigation: HomeStackNavigationProps;
};
