//ButtonStyle

import {StyleSheet,} from 'react-native';

import {AppFonts} from '../Resources/Font';
import { getLayoutSize} from '../Component/Responsive';

const button = StyleSheet.create({
    mainScreenButtonContainer:{
        height:getLayoutSize(50),
        width: getLayoutSize(180),
        borderRadius: getLayoutSize(30),
        backgroundColor: "#00f3b9",//Colors.colorPrimary
        justifyContent:"center",
    },
    mainScreenButtonText:{
        fontFamily:AppFonts.text.font4,
        color:"black",
        fontSize:12,
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
        fontSize: 12,
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
        color: "#b3b3b3",
        fontSize: 12,
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