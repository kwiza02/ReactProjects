//SplashScreen

import React, { Component } from 'react';

import { Text,
View,
Image,
ScrollView,
StatusBar,
} from 'react-native';

export default class Splash extends Component {


  componentDidMount(){
    setTimeout(() => {
    this.props.navigation.navigate(" LoginScreen ");
  }, 2000);

  }

  render(){
    return(
      <ScrollView style={{backgroundColor:"white"}}>
        <View style={{alignSelf:"center",justifyContent:"center",marginTop:200}} >

        <StatusBar

           barStyle="dark-content"
           hidden={false}
           backgroundColor="white"
           translucent={false}
           networkActivityIndicatorVisible={true}/>

          <Text style={{fontSize:30,color:"black",alignSelf:"center",marginTop:20}}>Welcome</Text>
          <Image source={require("../Assest/instagramLogo.png")} style={{alignSelf:"center",marginTop:50}}/>
        </View>
      </ScrollView>
    );
  }
}
