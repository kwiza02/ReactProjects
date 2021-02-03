//ButtonStyle

import {StyleSheet,} from 'react-native';

import {AppFonts} from '../Resources/Font';
import { getLayoutSize} from '../Component/Responsive';
import TextUtils from '../Resources/TextUtils';

const button = StyleSheet.create({
    mainScreenButtonContainer:{
        height:getLayoutSize(50),
        width: getLayoutSize(180),
        borderRadius: getLayoutSize(30),
        backgroundColor:"#00f3b9",
        justifyContent:"center",
    },
    mainScreenButtonText:{
        fontFamily:AppFonts.text.font4,
        color:"black",
        fontSize:TextUtils.BUTTON_TEXT,
        alignSelf:"center",
    },
    mainScreenButtonLoginContainer: {
        height: getLayoutSize(50),
        width: getLayoutSize(180),
        borderRadius: 30,
        borderColor: "#00f3b9",
        justifyContent: "center",
        borderWidth:1,
    },
    mainScreenButtonLoginText: {
        fontFamily:AppFonts.text.font4,
        color: "#00f3b9",
        fontSize: TextUtils.BUTTON_TEXT,
        alignSelf: "center",
    },
    ButtonLoginContainer: {
        height: getLayoutSize(50),
        width:"100%",
        borderRadius: 30,
        borderColor: "#00f3b9",
        justifyContent: "center",
        borderWidth:1,
    },
    ButtonContainerText: {
        fontFamily:AppFonts.text.font4,
        color: "#e6e6e6",
        fontSize: TextUtils.BUTTON_TEXT,
        alignSelf: "center",
    },
    ButtonContainer: {
        height: getLayoutSize(50),
        width: "100%",
        borderRadius: 30,
        borderColor: "#868686",
        justifyContent: "center",
        borderWidth: 1,
        flexDirection:"row",
        marginTop: getLayoutSize(20),
    },
});

export {button}