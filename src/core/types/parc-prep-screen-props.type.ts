import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {CommonPropsType} from './common-props.type';
import {ParcPrepStackParamsTypes} from './parc-prep-stack-params.types';

type ParcPrepScreenNavigationProps = StackNavigationProp<
    ParcPrepStackParamsTypes,
    'parcPrepList'
>;

type ParcPrepScreenRouteProps = RouteProp<
    ParcPrepStackParamsTypes,
    'parcPrepList'
>;

export interface ParcPrepScreenProps extends CommonPropsType {
    navigation: ParcPrepScreenNavigationProps;
    route: ParcPrepScreenRouteProps;
}
