import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {HomeStackParamsList} from './home-stack-params.types';
import {CommonPropsType} from './common-props.type';
import {MainTabsNavigationProps} from './main-tabs-params.type';

type HomeScreenNavigationProps = StackNavigationProp<MainTabsNavigationProps>;

type HomeScreenRouteProps = RouteProp<HomeStackParamsList, 'homeScreen'>;

export interface HomeScreenProps extends CommonPropsType {
    navigation: HomeScreenNavigationProps;
    route: HomeScreenRouteProps;
}
