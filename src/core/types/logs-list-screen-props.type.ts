import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {CommonPropsType} from './common-props.type';
import {LogsStackParamsTypes} from './logs-stack-params.types';

type LogsListScreenNavigationProps = StackNavigationProp<
    LogsStackParamsTypes,
    'logsList'
>;

type LogsListScreenRouteProps = RouteProp<LogsStackParamsTypes, 'logsList'>;

export interface LogsListScreenProps extends CommonPropsType {
    navigation: LogsListScreenNavigationProps;
    route: LogsListScreenRouteProps;
}
