import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import CommonStyles, {
    BORDER_RADIUS,
    MAIN_GREEN,
    MAIN_RED,
    PADDING_HORIZONTAL,
    poppinsRegular
} from '../../../styles';
import {translate} from '../../../utils/i18n.utils';
import MatButton from '../mat-button.component';
import {ParcPrepAllDetailsInterface} from '../../../core/interfaces/parc-prep-all-details.interface';

const {
    mainColor,
    centerHorizontally,
    centerVertically,
    spaceBetween,
    alignCenter,
    rougierShadow,
    regularFont,
    textAlignLeft,
    justifyAlignLeftVertical,
    justifyAlignRightVertical,
    justifyAlignRightHorizontal,
    justifyCenter,
    info,
    title,
    subTitle,
    hSpacer5
} = CommonStyles;

const STYLES = StyleSheet.create({
    firstHalfOfCard: {
        maxWidth: '55%'
    },
    mainView: {
        width: Dimensions.get('screen').width - (PADDING_HORIZONTAL + 2) * 2,
        padding: 11,
        borderRadius: BORDER_RADIUS,
        backgroundColor: '#fff'
    },
    button: {
        minWidth: 111,
        paddingVertical: 7,
        paddingHorizontal: 10,
        borderRadius: BORDER_RADIUS
    },
    buttonFill: {
        backgroundColor: MAIN_RED
    },
    buttonFillConfirmed: {
        backgroundColor: MAIN_GREEN
    },
    buttonClear: {
        backgroundColor: '#fff'
    },
    buttonText: {
        lineHeight: 20,
        fontFamily: poppinsRegular,
        fontSize: 13,
        marginLeft: 6
    },
    buttonTextFill: {
        color: '#fff'
    },
    buttonTextClear: {
        color: MAIN_RED
    },
    defCardCapsule: {
        borderRadius: BORDER_RADIUS,
        paddingHorizontal: 5,
        paddingVertical: 2,
        backgroundColor: 'rgba(69, 96, 14, .3)'
    },
    defCardIdx: {
        fontSize: 10,
        color: MAIN_GREEN
    }
});

const ParcPrepCard: React.FunctionComponent<{
    parcPrepFile: ParcPrepAllDetailsInterface;
    onAddLog: () => void;
    editParc?: () => void;
    goToLogs?: (id: string) => void;
}> = ({
    parcPrepFile,
    onAddLog,
    editParc,
    goToLogs
}: {
    parcPrepFile: ParcPrepAllDetailsInterface;
    onAddLog: () => void;
    editParc?: () => void;
    goToLogs?: (id: string) => void;
}) => (
    <View
        style={[
            STYLES.mainView,
            centerHorizontally,
            spaceBetween,
            alignCenter,
            rougierShadow
        ]}>
        <View
            style={[
                STYLES.firstHalfOfCard,
                centerVertically,
                justifyAlignLeftVertical,
                justifyCenter
            ]}>
            <Text style={[mainColor, title, regularFont, textAlignLeft]}>
                {translate('common.id')}{' '}
                <Text style={[mainColor, subTitle, regularFont, textAlignLeft]}>
                    {parcPrepFile.id}
                </Text>
                <View style={[hSpacer5]} />
                {parcPrepFile.isDefault ? (
                    <View style={[STYLES.defCardCapsule]}>
                        <Text style={[STYLES.defCardIdx]}>
                            {translate('common.default')}
                        </Text>
                    </View>
                ) : (
                    <View />
                )}
            </Text>
            <Text style={[info, regularFont, textAlignLeft]}>
                {`${translate('modals.parcPrep.fields.aac.label')}: ${
                    parcPrepFile.aac
                }`}
            </Text>
            <Text style={[info, regularFont, textAlignLeft]}>
                {`${translate('modals.parcPrep.fields.type.label')}: ${
                    parcPrepFile.type
                }`}
            </Text>
            <Text style={[info, regularFont, textAlignLeft]}>
                {translate('common.creationDate', {
                    date: new Date(
                        parcPrepFile.creationDate
                    ).toLocaleDateString()
                })}
            </Text>
            {parcPrepFile.lastLogDate ? (
                <Text style={[info, regularFont, textAlignLeft]}>
                    {translate('common.lastLogDate', {
                        date: new Date(
                            parcPrepFile.lastLogDate
                        ).toLocaleDateString()
                    })}
                </Text>
            ) : (
                <View />
            )}
            {parcPrepFile.logsNumber ? (
                <MatButton
                    onPress={() => {
                        if (goToLogs) {
                            goToLogs(parcPrepFile.id);
                        }
                    }}>
                    <Text
                        style={[mainColor, title, regularFont, textAlignLeft]}>
                        {translate('common.logs')}{' '}
                        <Text
                            style={[
                                mainColor,
                                subTitle,
                                regularFont,
                                textAlignLeft
                            ]}>
                            {translate('common.logsNumber', {
                                numLogs: parcPrepFile.logsNumber
                            })}
                        </Text>
                    </Text>
                </MatButton>
            ) : (
                <View />
            )}
        </View>
        <View
            style={[
                centerVertically,
                justifyAlignRightVertical,
                justifyCenter
            ]}>
            <View
                style={[
                    STYLES.button,
                    parcPrepFile.allSynced
                        ? STYLES.buttonFillConfirmed
                        : STYLES.buttonFill,
                    centerHorizontally,
                    justifyAlignRightHorizontal
                ]}>
                <Icon
                    name={parcPrepFile.allSynced ? 'check' : 'sync'}
                    color="#fff"
                    size={20}
                />
                <Text style={[STYLES.buttonText, STYLES.buttonTextFill]}>
                    {translate(
                        `common.${parcPrepFile.allSynced ? 'synced' : 'sync'}`
                    )}
                </Text>
            </View>
            <MatButton onPress={editParc}>
                <View
                    style={[
                        STYLES.button,
                        STYLES.buttonClear,
                        centerHorizontally,
                        justifyAlignRightHorizontal
                    ]}>
                    <Icon name="edit" color={MAIN_RED} size={20} />
                    <Text style={[STYLES.buttonText, STYLES.buttonTextClear]}>
                        {translate('common.editParcPrepFile')}
                    </Text>
                </View>
            </MatButton>
            <MatButton onPress={onAddLog}>
                <View
                    style={[
                        STYLES.button,
                        STYLES.buttonClear,
                        centerHorizontally,
                        justifyAlignRightHorizontal
                    ]}>
                    <Icon name="add" color={MAIN_RED} size={20} />
                    <Text style={[STYLES.buttonText, STYLES.buttonTextClear]}>
                        {translate('common.addLog')}
                    </Text>
                </View>
            </MatButton>
        </View>
    </View>
);

ParcPrepCard.defaultProps = {
    editParc: () => true,
    goToLogs: () => true
};

export default ParcPrepCard;
