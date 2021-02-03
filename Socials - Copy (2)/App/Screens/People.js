//People

import React, {Component} from 'react';

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  BackHandler,
  ScrollView,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

export default class People extends Component {
 state = {
    flatListState: '',
    isLoading: true,
     text: '',
     arrayholder : [],
     issearch:false,

    setting: [
      {
        name: 'Bhavin Sapara',
        emailid: 'bhavinsaparasb@gmail.com',
        image: require('../Assets/image_one.png'),
        isFollow: false,
      },
      {
        name: 'Bhavin',
        emailid: 'BhavinSapara@gmail.com',
          image: require('../Assets/image_two.jpg'),
        isFollow: false,
      },
      {
        name: 'bha Sapara',
        emailid: 'Bhavinsapab@gmail.com',
          image: require('../Assets/image_three.png'),
        isFollow: false,
      },
      {
        name: 'Nilesh sapara',
        emailid: 'nileshsapara@gmail.com',
          image: require('../Assets/image_four.png'),
        isFollow: false,
      },
      {
        name: 'Naitik',
        emailid: 'naitiksapara@gmail.com',
          image: require('../Assets/image_five.png'),
        isFollow: false,
      },
      {
        name: 'Nobita',
        emailid: 'nobitanobita@gmail.com',
          image: require('../Assets/image_six.png'),
        isFollow: false,
      },
      {
        name: 'Jullie',
        emailid: 'julliejullie@gmail.com',
          image: require('../Assets/image_seven.png'),
        isFollow: false,
      },
      {
        name: 'Parth',
        emailid: 'parthvajas@gmail.com',
          image: require('../Assets/image_eight.png'),
        isFollow: false,
      },
      {
        name: 'Kishan',
        emailid: 'kishansavani@gmail.com',
          image: require('../Assets/image_two.jpg'),
        isFollow: false,
      },
      {
        name: 'Goerage',
        emailid: 'goeragegokhle@gmail.com',
          image: require('../Assets/image_ten.png'),
        isFollow: false,
      },
      {
        name: 'Aarohi',
        emailid: 'aarohipatel@gmail.com',
          image: require('../Assets/image_three.png'),
        isFollow: false,
      },
    ],
    message: [
      {
        name: 'Bhavin Sapara',
        emailid: 'bhavinsaparasb@gmail.com',
            image: require('../Assets/image_one.png'),
      },
      {
        name: 'Bhavin',
        emailid: 'BhavinSapara@gmail.com',
          image: require('../Assets/image_two.jpg'),
      },
      {
        name: 'bha Sapara',
        emailid: 'Bhavinsapab@gmail.com',
          image: require('../Assets/image_three.png'),
      },
      {
        name: 'Nilesh sapara',
        emailid: 'nileshsapara@gmail.com',
          image: require('../Assets/image_four.png'),
      },
      {
        name: 'Naitik',
        emailid: 'naitiksapara@gmail.com',
          image: require('../Assets/image_five.png'),
      },
      {
        name: 'Nobita',
        emailid: 'nobitanobita@gmail.com',
          image: require('../Assets/image_six.png'),
      },
      {
        name: 'Jullie',
        emailid: 'julliejullie@gmail.com',
          image: require('../Assets/image_seven.png'),
      },
      {
        name: 'Parth',
        emailid: 'parthvajas@gmail.com',
          image: require('../Assets/image_eight.png'),
      },
      {
        name: 'Kishan',
        emailid: 'kishansavani@gmail.com',
          image: require('../Assets/image_two.jpg'),
      },
      {
        name: 'Goerage',
        emailid: 'goeragegokhle@gmail.com',
          image: require('../Assets/image_ten.png'),
      },
      {
        name: 'Aarohi',
        emailid: 'aarohipatel@gmail.com',
          image: require('../Assets/image_three.png'),
      },
    ],
  };

  //handler
  disableBackButton=() =>
  {
    this.props.navigation.navigate('People');
    //BackHandler.exitApp();
    
    this.setState({issearch:false});
    if(this.state.issearch == false){
      this.setState({newData:this.state.setting})
    }
    return true;
  }

  UNSAFE_componentWillMount()
  {
      BackHandler.addEventListener('hardwareBackPress' ,this.disableBackButton);
  }

  UNSAFE_componentWillUnmount()
  {
      BackHandler.removeEventListener('hardwareBackPress',this.disableBackButton);
  }
//handler


  componentDidMount() {
    this._retrieveData();
    this.state.isLoading=false, 
    this.setState({datasource:this.state.setting})
  }

  
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('flatListState');
      this.setState({flatListState: value});
    } catch (error) {
      alert(error);
    }
  };

  updatefollow = (item,index) =>{
    var list = this.state.setting;
    list[index].isFollow = !item.isFollow
    this.setState({data:list},()=>{
      console.log("data list --> " +JSON.stringify(list));
    });
   }


  SearchFilterFunction(text) {
    const newData = this.state.setting.filter(function(item) {
      const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      datasource: newData,
      text: text,
    });
  }



  render() {
    return (

    
      <View style={{flex: 1,backgroundColor:"white"}}>
        {this.state.issearch == false ?
        <View style={{borderBottomWidth:1,borderBottomColor:"black",
        flexDirection:"row",height:60,backgroundColor:'white'}}>

                      <TouchableOpacity style={{alignSelf:"center"}} onPress={() => {this.props.navigation.navigate('User')}}>
                        <Image style={{ height: 20, width: 20, marginLeft: 10 }} source={require('../Assets/leftArrow.png')} />
                      </TouchableOpacity>

                      <Text style={{fontWeight:"bold",fontSize:22,alignSelf:"center",marginLeft:20}}>People</Text>
                      <TouchableOpacity onPress={() => {this.setState({issearch:true})}} >
                        <Image source={require('../Assets/search.png')} style={{height:30,width:30,alignSelf:"center",marginTop:15,marginLeft:250}}/>
                      </TouchableOpacity>
          </View>
          :
          <View style={{flexDirection:"row",borderBottomColor:"gray",borderBottomWidth:1,height:60}}>

            <TouchableOpacity style={{alignSelf:"center"}} onPress={() => {this.setState({issearch:false})}}>
                        <Image style={{ height: 20, width: 20, marginLeft: 15 }} source={require('../Assets/leftArrow.png')} />
                      </TouchableOpacity>
          


          <View style={{borderBottomWidth:2,borderBottomColor:"black",flexDirection:"row",height:50}}>
                        <Image source={require('../Assets/search.png')} style={{height:20,width:20,marginLeft:15,tintColor:"gray",marginTop:15}}
            />
          
          
          <TextInput
          style={styles.textInputStyle}
          onChangeText={text => this.SearchFilterFunction(text)}
          value={this.state.text}
          underlineColorAndroid="transparent"
          placeholder="Search People"
        />
        </View>
         
         <TouchableOpacity onPress={() => {this.setState({issearch:false})}}>
                        <Image source={require('../Assets/close.png')} style={{height:25,width:25,tintColor:"gray",alignSelf:"center",marginTop:15}}/>
         </TouchableOpacity>
        
        </View>

      } 


          
        <ScrollView>
        {this.state.flatListState == 'setting' ? (

          <View> 
          <FlatList
            data={this.state.datasource}
            keyExtractor={(item) => item}
            renderItem={this.renderItem.bind(this)}
          />
          </View>
        ) : (
          <FlatList
            data={this.state.message}
            keyExtractor={(item) => item}
            renderItem={this.renderItem.bind(this)}
          />
        )}
        </ScrollView>
      </View>
    );
  }
  renderItem({item, index}) {
    return (


      <View >
        
      <View style={styles.inputStyle}>
        <Image
          source={item.image}
          style={{
            height: 60,
            width: 60,
            marginTop:-7,
            borderRadius: 30,
            borderColor: '#20232a',
            borderWidth: 1,
          }}
        />

        <View style={{alignItems: 'center', flex: 1}}>
          <Text style={{fontWeight: 'bold'}}>
            {item.name}
            {'\n'}
            <Text style={{fontWeight: 'normal'}}>{item.emailid}</Text>
          </Text>
        </View>

        <TouchableOpacity
          underlayColor="#DFE1E3"
          onPress={() => {
            this.updatefollow(item, index);
          }}>

          {this.state.flatListState == 'setting' ? (
          
           ! item.isFollow === true ?
            <View style={styles.followouter}>
              <Text style={{ color: 'white', fontSize: 12 }}>Follow</Text>
            </View>
           :
            <View style={styles.unfollowouter}>
              <Text style={{ color: 'black', fontSize: 12 }}>UnFollow</Text>
            </View>
          ):

          <TouchableOpacity onPress={() => {this.props.navigation.navigate('Message',{name:item.name})}}>
          <View style={styles.followouter}>
              
              <Text style={{color: 'white', fontSize: 12}}>Message</Text>
              
            </View>
            </TouchableOpacity>
  }
          
        </TouchableOpacity>
      </View>
      </View>
    );
  }
  
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    justifyContent: 'center',
  },
  inputStyle: {
    width: '100%',
    borderColor: '#20232a',
    height: 75,
    padding:20,
    marginTop:10,
    flexDirection: 'row',
  },
  followouter: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
    height: 25,
    borderRadius: 4,
    marginTop: 10,
      backgroundColor: 'dodgerblue',
  },
  unfollowouter: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
    height: 25,
    borderRadius: 4,
    borderWidth: 1,
    marginTop: 10,
    borderColor: '#20639B',
  },
  textInputStyle: {
    fontSize:20,
    height:50,
    borderBottomColor:"black",
    borderBottomWidth:2,
    width:290,
    marginLeft: 10,
    backgroundColor: '#FFFFFF',
  },
});
