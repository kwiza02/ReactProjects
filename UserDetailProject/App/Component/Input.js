//Input 

import React from 'react';

import { 
    StyleSheet, 
    TextInput,
    Dimensions,
} from 'react-native';

import { getFontSize, getLayoutSize } from '../Component/Responsive';
import { Colors, AppFonts } from '../Resources/index';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const Input = (props) => {
    return <StandardInput {...props} />;
}

const StandardInput = (props) => (

    <TextInput style={[styles.TextInput, props.InputStyle]}
        placeholder={props.placeholder ? props.placeholder : 'Anything'}
        placeholderTextColor={props.placeholderTextColor ? props.placeholderTextColor : '#000'}
        {...props}
    />
)


const styles = StyleSheet.create({
    TextInput: {
        marginTop: getLayoutSize(40),
        borderBottomColor: Colors.SEPRATOR_COLOR,
        borderWidth: 1,
        color: Colors.TITLE_COLOR,
    }
})

export default Input;
