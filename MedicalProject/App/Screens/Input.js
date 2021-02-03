import React from 'react';

import {StyleSheet,TextInput} from 'react-native';

const Input = (props) => {
    return <StandardInput {...props} />;
}

const StandardInput = (props) => (

    <TextInput style={[styles.TextInput,props.InputStyle]}
    placeholder={props.placeholder ? props.placeholder : 'Anything'}
    placeholderTextColor={props.placeholderTextColor ? props.placeholderTextColor : '#000' }
    {...props}
    />
)


const Styles = StyleSheet.create ({
    TextInput:{
        
    }
})

export default Input;
