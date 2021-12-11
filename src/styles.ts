import {Dimensions, StatusBar, StyleSheet, PixelRatio} from 'react-native';

export const MAIN_GREEN = `#45600e`;
export const MAIN_RED = `#A40D20`;
export const MAIN_GREY = `#888888`;
export const MAIN_LIGHT_GREY = `#adadad`;
export const MAIN_DARK_GREY = `#727272`;

export const MAIN_ELEVATION = 3;
export const BORDER_RADIUS = 8;
export const PADDING_HORIZONTAL = 15;
export const PAGE_TITLE_LINE_HEIGHT = 39;
export const STACK_HEADER_HEIGHT = 57;
export const FILTER_ROW_HEIGHT = 41;
export const ICON_BUTTON_SIZE = 26;
export const TAB_BAR_HEIGHT = 57;
export const TAB_BAR_VERT_PADDING = 8;
export const TAB_BAR_BUTTON_HEIGHT = 45;
export const FAB_BOTTOM_DISTANCE = 10;
export const FAB_BUTTON_SIZE = 69;
export const FAB_BORDER_RADIUS = FAB_BUTTON_SIZE / 2;

export const poppinsBlack = `Poppins-Black`;
export const poppinsBold = `Poppins-Bold`;
export const poppinsExtraBold = `Poppins-ExtraBold`;
export const poppinsExtraLight = `Poppins-ExtraLight`;
export const poppinsLight = `Poppins-Light`;
export const poppinsMedium = `Poppins-Medium`;
export const poppinsRegular = `Poppins-Regular`;
export const poppinsSemi = `Poppins-Semi`;

export const widthPercentageToDP = (widthPercent: number): number => {
    const screenWidth = Dimensions.get('window').width;
    // Convert string input to decimal number
    const elemWidth = parseFloat(`${widthPercent}`);
    return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};

export const heightPercentageToDP = (heightPercent: number): number => {
    const screenHeight = Dimensions.get('window').height;
    // Convert string input to decimal number
    const elemHeight = parseFloat(`${heightPercent}`);
    return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
};

export interface AppStyleSheet {
    noContent: {
        [key: string]: any;
    };
    fullViewWidthInside: {
        [key: string]: any;
    };
    iconButton: {
        [key: string]: any;
    };
    title: {
        [key: string]: any;
    };
    subTitle: {
        [key: string]: any;
    };
    fullViewWidth: {
        [key: string]: any;
    };
    fullViewHeight: {
        [key: string]: any;
    };
    fabButtonView: {
        [key: string]: any;
    };
    fabButton: {
        [key: string]: any;
    };
    backgroundMain: {
        [key: string]: any;
    };
    backgroundSecond: {
        [key: string]: any;
    };
    info: {
        [key: string]: any;
    };
    appPage: {
        [key: string]: any;
    };
    hSpacer5: {
        [key: string]: any;
    };
    hSpacer17: {
        [key: string]: any;
    };
    vSpacer12: {
        [key: string]: any;
    };
    pT2: {
        [key: string]: any;
    };
    pB30: {
        [key: string]: any;
    };
    pB60: {
        [key: string]: any;
    };
    p5: {
        [key: string]: any;
    };
    mB10: {
        [key: string]: any;
    };
    vSpacer25: {
        [key: string]: any;
    };
    vSpacer100: {
        [key: string]: any;
    };
    vSpacer60: {
        [key: string]: any;
    };
    rougierShadow: {
        [key: string]: any;
    };
    scrollView: {
        [key: string]: any;
    };
    regularFont: {
        [key: string]: any;
    };
    textAlignLeft: {
        [key: string]: any;
    };
    textAlignCenter: {
        [key: string]: any;
    };
    mainColor: {
        [key: string]: any;
    };
    fullWidth: {
        [key: string]: any;
    };
    fullHeight: {
        [key: string]: any;
    };
    centerHorizontally: {
        [key: string]: any;
    };
    centerVertically: {
        [key: string]: any;
    };
    spaceBetween: {
        [key: string]: any;
    };
    spaceEvenly: {
        [key: string]: any;
    };
    justifyCenter: {
        [key: string]: any;
    };
    alignCenter: {
        [key: string]: any;
    };
    justifyAlignCenter: {
        [key: string]: any;
    };
    justifyAlignTopVertical: {
        [key: string]: any;
    };
    justifyAlignTBottomVertical: {
        [key: string]: any;
    };
    justifyAlignLeftVertical: {
        [key: string]: any;
    };
    justifyAlignRightVertical: {
        [key: string]: any;
    };
    justifyAlignTopHorizontal: {
        [key: string]: any;
    };
    justifyAlignTBottomHorizontal: {
        [key: string]: any;
    };
    justifyAlignTLeftHorizontal: {
        [key: string]: any;
    };
    justifyAlignRightHorizontal: {
        [key: string]: any;
    };
}

const CommonStyles = StyleSheet.create<AppStyleSheet>({
    appPage: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: PADDING_HORIZONTAL,
        paddingTop: 20,
        backgroundColor: '#fff',
        minHeight: '100%'
    },
    title: {
        fontSize: 19
    },
    subTitle: {
        fontSize: 12,
        textAlign: 'left',
        opacity: 0.76
    },
    info: {
        fontSize: 12,
        color: MAIN_DARK_GREY
    },
    mainColor: {
        color: MAIN_GREEN
    },
    fullWidth: {
        width: '100%'
    },
    centerVertically: {
        flexDirection: 'column'
    },
    centerHorizontally: {
        flexDirection: 'row'
    },
    justifyAlignCenter: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    justifyAlignTBottomHorizontal: {
        alignItems: 'flex-end'
    },
    justifyAlignTBottomVertical: {
        justifyContent: 'flex-end'
    },
    justifyAlignTLeftHorizontal: {
        justifyContent: 'flex-start'
    },
    justifyAlignLeftVertical: {
        alignItems: 'flex-start'
    },
    justifyAlignTopHorizontal: {
        alignItems: 'flex-start'
    },
    justifyAlignTopVertical: {
        justifyContent: 'flex-start'
    },
    justifyAlignRightHorizontal: {
        justifyContent: 'flex-end'
    },
    justifyAlignRightVertical: {
        alignItems: 'flex-end'
    },
    spaceBetween: {
        justifyContent: 'space-between'
    },
    spaceEvenly: {
        justifyContent: 'space-evenly'
    },
    alignCenter: {
        alignItems: 'center'
    },
    justifyCenter: {
        justifyContent: 'center'
    },
    regularFont: {
        fontFamily: poppinsRegular
    },
    rougierShadow: {
        elevation: MAIN_ELEVATION
    },
    textAlignCenter: {
        textAlign: 'center'
    },
    textAlignLeft: {
        textAlign: 'left'
    },
    hSpacer17: {
        width: 17
    },
    hSpacer5: {
        width: 5
    },
    vSpacer12: {
        height: 12
    },
    pT2: {
        paddingTop: 2
    },
    vSpacer25: {
        height: 25
    },
    vSpacer60: {
        height: 60
    },
    vSpacer100: {
        height: 100
    },
    scrollView: {
        width: Dimensions.get('screen').width - PADDING_HORIZONTAL * 2
    },
    fabButtonView: {
        position: 'absolute',
        right: 10,
        bottom: 10,
        borderRadius: FAB_BORDER_RADIUS
    },
    fabButton: {
        width: FAB_BUTTON_SIZE,
        height: FAB_BUTTON_SIZE,
        borderRadius: FAB_BORDER_RADIUS
    },
    backgroundMain: {
        backgroundColor: MAIN_RED
    },
    backgroundSecond: {
        backgroundColor: MAIN_GREEN
    },
    fullViewHeight: {
        height:
            Dimensions.get('screen').height -
            ((StatusBar.currentHeight ? StatusBar.currentHeight : 0) +
                STACK_HEADER_HEIGHT)
    },
    fullViewWidth: {
        width: Dimensions.get('screen').width
    },
    fullViewWidthInside: {
        width: Dimensions.get('screen').width - PADDING_HORIZONTAL * 2
    },
    iconButton: {
        width: ICON_BUTTON_SIZE,
        height: ICON_BUTTON_SIZE,
        borderRadius: ICON_BUTTON_SIZE / 2
    },
    noContent: {
        fontFamily: poppinsBold,
        color: MAIN_LIGHT_GREY,
        fontSize: 30,
        textAlign: 'center'
    },
    fullHeight: {
        height: '100%'
    },
    pB30: {
        paddingBottom: 30
    },
    pB60: {
        paddingBottom: 60
    },
    p5: {
        padding: 5
    },
    mB10: {
        marginBottom: 10
    }
});

export default CommonStyles;
