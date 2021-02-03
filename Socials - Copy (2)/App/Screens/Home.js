//Home

import React, {Component} from 'react';

import {
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Share, 
  BackHandler,
} from 'react-native';

import {SliderBox} from 'react-native-image-slider-box';
import Video from 'react-native-video';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onMouseTapLike:false,
      likeCount:"0",
      isOpenPicker:false,
      data: [
        {
          name: 'Miyah Myles',
          date: 'Jun 11, 06:44 PM',
          profile: require('../Assets/person.png'),
          post: [
            require('../Assets/nature_one.png'),
            require('../Assets/nature_two.png'),
            require('../Assets/nature_three.png'),
            require('../Assets/nature_four.png'),
          ],
          video: require('../Assets/video_two.mp4'),
          postName: 'city',
          postInfo:
            "Delhi the capital of India.Known for heritages.One of India's largest city.",
          postTag: '#City',
          postCommentInfo: 'Well defined!!!',
          postLike: require('../Assets/like.png'),
          postComment: require('../Assets/commentGray.png'),
          commentCount: ' Comments',
          others: require('../Assets/more.png'),
          flag: '1',
        },
        {
          name: 'Miyah Myles',
          date: 'Jun 11, 06:44 PM',
          profile: require('../Assets/person.png'),
          post: [
            require('../Assets/city.png'),
            require('../Assets/nature_three.png'),
            require('../Assets/nature_four.png'),
          ],
          video: require('../Assets/video_two.mp4'),
          postName: 'city',
          postInfo:
            "Delhi the capital of India.Known for heritages.One of India's largest city.",
          postTag: '#City',
          postCommentInfo: 'Well defined!!!',
          postLike: require('../Assets/like.png'),
          postComment: require('../Assets/commentGray.png'),
          commentCount: ' Comments',
          others: require('../Assets/more.png'),
          flag: '',
        },
        {
          name: 'Miyah Myles',
          date: 'Jun 11, 06:44 PM',
          profile: require('../Assets/person.png'),
          post: [require('../Assets/city.png')],
          video: require('../Assets/video_two.mp4'),
          postName: 'city',
          postInfo:
            "Delhi the capital of India.Known for heritages.One of India's largest city.",
          postTag: '#City',
          postCommentInfo: 'Well defined!!!',
          postLike: require('../Assets/like.png'),
          postComment: require('../Assets/commentGray.png'),
          commentCount: 'Comments',
          others: require('../Assets/more.png'),
          flag: '',
        },
        {
          name: 'Miyah Myles',
          date: 'Jun 11, 06:44 PM',
          profile: require('../Assets/person.png'),
          post: [require('../Assets/city.png')],
          video: require('../Assets/video_two.mp4'),
          postName: 'city',
          postInfo:
            "Delhi the capital of India.Known for heritages.One of India's largest city.",
          postTag: '#City',
          postCommentInfo: 'Well defined!!!',
          postLike: require('../Assets/like.png'),
          postComment: require('../Assets/commentGray.png'),
          commentCount: 'Comments',
          others: require('../Assets/more.png'),
          flag: '',
        },
        {
          name: 'Miyah Myles',
          date: 'Jun 11, 06:44 PM',
          profile: require('../Assets/person.png'),
          post: [require('../Assets/city.png')],
          video: require('../Assets/video_two.mp4'),
          postName: 'city',
          postInfo:
            "Delhi the capital of India.Known for heritages.One of India's largest city.",
          postTag: '#City',
          postCommentInfo: 'Well defined!!!',
          postLike: require('../Assets/like.png'),
          postComment: require('../Assets/commentGray.png'),
          commentCount: 'Comments',
          others: require('../Assets/more.png'),
          flag: '',
        },
        {
          name: 'Miyah Myles',
          date: 'Jun 11, 06:44 PM',
          profile: require('../Assets/person.png'),
          post: [
            require('../Assets/nature_one.png'),
            require('../Assets/nature_two.png'),
            require('../Assets/nature_three.png'),
            require('../Assets/nature_four.png'),
          ],
          video: require('../Assets/video_two.mp4'),
          postName: 'city',
          postInfo:
            "Delhi the capital of India.Known for heritages.One of India's largest city.",
          postTag: '#City',
          postCommentInfo: 'Well defined!!!',
          postLike: require('../Assets/like.png'),
          postComment: require('../Assets/commentGray.png'),
          commentCount: 'Comments',
          others: require('../Assets/more.png'),
          flag: '1',
        },
        {
          name: 'Miyah Myles',
          date: 'Jun 11, 06:44 PM',
          profile: require('../Assets/person.png'),
          post: [require('../Assets/city.png')],
          video: require('../Assets/video_two.mp4'),
          postName: 'city',
          postInfo:
            "Delhi the capital of India.Known for heritages.One of India's largest city.",
          postTag: '#City',
          postCommentInfo: 'Well defined!!!',
          postLike: require('../Assets/like.png'),
          postComment: require('../Assets/commentGray.png'),
          commentCount: 'Comments',
          others: require('../Assets/more.png'),
          flag: '',
        },
        {
          name: 'Miyah Myles',
          date: 'Jun 11, 06:44 PM',
          profile: require('../Assets/person.png'),
          post: [
            require('../Assets/city.png'),
            require('../Assets/nature_two.png'),
          ],
          video: require('../Assets/video_two.mp4'),
          postName: 'city',
          postInfo:
            "Delhi the capital of India.Known for heritages.One of India's largest city.",
          postTag: '#City',
          postCommentInfo: 'Well defined!!!',
          postLike: require('../Assets/like.png'),
          postComment: require('../Assets/commentGray.png'),
          commentCount: 'Comments',
          others: require('../Assets/more.png'),
          flag: '1',
        },
        {
          name: 'Miyah Myles',
          date: 'Jun 11, 06:44 PM',
          profile: require('../Assets/person.png'),
          post: [require('../Assets/city.png')],
          video: require('../Assets/video_two.mp4'),
          postName: 'city',
          postInfo:
            "Delhi the capital of India.Known for heritages.One of India's largest city.",
          postTag: '#City',
          postCommentInfo: 'Well defined!!!',
          postLike: require('../Assets/like.png'),
          postComment: require('../Assets/commentGray.png'),
          commentCount: ' Comments',
          others: require('../Assets/more.png'),
          flag: '1',
        },
        {
          name: 'Bhavin',
          date: 'Jun 11, 06:44 PM',
          profile: require('../Assets/person.png'),
          post: [require('../Assets/city.png')],
          video: require('../Assets/video_two.mp4'),
          postName: 'city',
          postInfo:
            "Delhi the capital of India.Known for heritages.One of India's largest city.",
          postTag: '#City',
          postCommentInfo: 'Well defined!!!',
          postLike: require('../Assets/like.png'),
          postComment: require('../Assets/commentGray.png'),
          commentCount: 'Comments',
          others: require('../Assets/more.png'),
          flag: '1',
        },
        {
          name: 'Kwiza Kaneria',
          date: 'Jun 11, 06:44 PM',
          profile: require('../Assets/person.png'),
          post: [
            require('../Assets/city.png'),
            require('../Assets/nature_three.png'),
            require('../Assets/nature_four.png'),
          ],
          video: require('../Assets/video_two.mp4'),
          postName: 'city',
          postInfo:
            "Delhi the capital of India.Known for heritages.One of India's largest city.",
          postTag: '#City',
          postCommentInfo: 'Well defined!!!',
          postLike: require('../Assets/like.png'),
          postComment: require('../Assets/commentGray.png'),
          commentCount: ' Comments',
          others: require('../Assets/more.png'),
          flag: '',
        },
        {
          name: 'Miyah Myles',
          date: 'Jun 11, 06:44 PM',
          profile: require('../Assets/person.png'),
          post: [require('../Assets/city.png')],
          video: require('../Assets/video.mp4'),
          postName: 'city',
          postInfo:"Delhi the capital of India.Known for heritages.One of India's largest city.",
          postTag: '#City',
          postCommentInfo: 'Well defined!!!',
          postLike: require('../Assets/like.png'),
          postComment: require('../Assets/commentGray.png'),
          commentCount: ' Comments',
          others: require('../Assets/more.png'),
          flag: '',
        },
      ],
    };
  }

  disableBackButton = () => {
   BackHandler.exitApp();
    return true;
  }

  UNSAFE_componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.disableBackButton);
  }

  UNSAFE_componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.disableBackButton);
  }


  updateLike(flag) {
    if (!this.state.onMouseTapLike) {
      this.setState({ onMouseTapLike: true })
      this.state.likeCount++;
    }
    else {
      this.setState({ onMouseTapLike: false })
      this.state.likeCount--;
    }
  }

  clickEventListener = (item) => {
    this.setModalVisible(true);
  }

  setModalVisible(visible) {
    this.setState({ isOpenPicker: visible });
  }

  onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  renderItem1({item, index}) {
    return (
      <View style={{flex: 1}}>
        <View style={styles.inputStyle}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Profile',{name:item.name});
            }}>
            <Image
              source={item.profile}
              style={{width: 50, height: 50, borderRadius: 25, marginRight: 10}}
            />
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              justifyContent: 'space-between',
              flex: 1,
            }}>
           
            <Text style={{fontWeight: 'bold', fontSize: 15}}>{item.name}</Text>
            <Text style={{fontSize: 15}}>{item.date}</Text>
          </View>
        </View>

        <SliderBox
          images={item.post}
          sliderBoxHeight={270}
          onCurrentImagePressed={index => this.props.navigation.navigate("VideoFull",{post:item.post[index],flag:item.flag,name:item.name})}
          dotColor="white"
          inactiveDotColor="#90A4AE"
          dotStyle={{
            width: 12,
            height: 12,
            borderRadius: 12,
            marginHorizontal: 0,
            padding: 0,
            margin: 0,
          }}
        />

        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Details', { name: item.name });
          }}>
          <View style={{padding: 10}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              {item.postName}
            </Text>
            <Text style={{fontSize: 15}}>{item.postInfo}</Text>
            <Text style={{fontSize: 15, fontWeight: 'bold'}}>
              {item.postTag}
            </Text>
            <Text style={{fontSize: 15, fontWeight: 'bold'}}>
              {item.postCommentInfo}
            </Text>
          </View>
        </TouchableOpacity>

        <View style={{borderColor: 'gray', borderWidth: 0.5, marginTop: 3}} />

        <View
          style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 20,
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => { this.updateLike();}}>
            <Image source={item.postLike} style={{height: 30, width: 30,tintColor:this.state.onMouseTapLike==true ? "blue":"gray"}} />
            </TouchableOpacity>
            <Text style={{fontSize: 18, color: 'gray', marginLeft: 9}}>
              {this.state.likeCount}
            </Text>
            <Text style={{fontSize: 18, color: 'gray', alignSelf: 'center',marginLeft:5}}>Likes</Text>
          </View>
          <TouchableOpacity onPress={() => { this.props.navigation.navigate("CommentScreen") }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 30,
              justifyContent: 'center',
            }}>
            <Image
              source={item.postComment}
              style={{
                height: 28,
                width: 28,
                marginRight: 8,
                marginTop:2,
                alignSelf: 'center',
              }}
            />
            <Text style={{fontSize: 18, color: 'gray', alignSelf: 'center'}}>
              {item.commentCount}
            </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{this.clickEventListener()}}>
          <Image
            source={item.others}
            style={{height: 30, width: 30, marginLeft: 60}}
          />
          </TouchableOpacity>
        </View>

        <View
          style={{
            borderColor: 'gray',
            borderWidth: 1,
            marginTop: 10,
            marginBottom: 8,
          }}
        >
      </View>

        <Modal
          transparent={true}
          animationType={"feed"}
          visible={this.state.isOpenPicker}>

          <View style={styles.popupOverlay}>
            <TouchableOpacity style={{ width: screenWidth, height: screenHeight, position: 'absolute' }}
              onPress={() => { this.setModalVisible(false) }} />
            <View style={styles.popup}>
                <TouchableOpacity onPress={this.onShare}>
                <Text style={{ fontSize: 18,padding:20,fontWeight:"bold"}}>Share</Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 18, padding: 20, fontWeight: "bold"}}>Abusel</Text>
            </View>
          </View>
        </Modal>

       
      </View>
    );
  }

  renderItem2({item, index}) {
    return (
      <View style={{flex: 1}}>
        <View style={styles.inputStyle}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Profile',{name:item.name});
            }}>
            <Image
              source={item.profile}
              style={{width: 50, height: 50, borderRadius: 25, marginRight: 10}}
            />
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              justifyContent: 'space-between',
              flex: 1,
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 15}}>{item.name}</Text>
            <Text style={{fontSize: 15}}>{item.date}</Text>
          </View>
        </View>
        
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('VideoFull', { video: item.video, flag: item.flag, name: item.name});
          }}>
        <Video source={item.video} 
          style={{width: '100%', height: 270,}}>
        </Video>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Details',{name:item.name});
          }}>
          <View style={{padding: 10}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              {item.postName}
            </Text>
            <Text style={{fontSize: 15}}>{item.postInfo}</Text>
            <Text style={{fontSize: 15, fontWeight: 'bold'}}>
              {item.postTag}
            </Text>
            <Text style={{fontSize: 15, fontWeight: 'bold'}}>
              {item.postCommentInfo}
            </Text>
          </View>
        </TouchableOpacity>

        <View style={{borderColor: 'gray', borderWidth: 0.5, marginTop: 3}} />

        <View
          style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 20,
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => { this.updateLike() }}>
              <Image source={item.postLike} style={{ height: 30, width: 30, tintColor: this.state.onMouseTapLike == true ? "blue" : "gray" }} />
            </TouchableOpacity>
            <Text style={{ fontSize: 18, color: 'gray', marginLeft: 9 }}>
              {this.state.likeCount}
            </Text>
            <Text style={{ fontSize: 18, color: 'gray', alignSelf: 'center', marginLeft: 5 }}>Likes</Text>
          </View>
          <TouchableOpacity onPress={() => { this.props.navigation.navigate("CommentScreen") }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 30,
              justifyContent: 'center',
            }}>
            <Image
              source={item.postComment}
              style={{
                height: 28,
                width: 28,
                marginTop:2,
                marginRight: 8,
                alignSelf: 'center',
              }}
            />
            <Text style={{fontSize: 18, color: 'gray', alignSelf: 'center'}}>
              {item.commentCount}
            </Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { this.clickEventListener() }}>
            <Image
              source={item.others}
              style={{ height: 30, width: 30, marginLeft: 60 }}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            borderColor: 'gray',
            borderWidth: 1,
            marginTop: 10,
            marginBottom: 8,
          }}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: 'gray',
            borderWidth: 1,
            padding: 15,
          }}>
          <Text style={{
              fontWeight: 'bold',
              fontSize: 20,
              alignSelf: 'center',
              marginLeft: 5,
              marginRight: 280,
            }}>
            Recent
          </Text>

          <TouchableOpacity onPress={()=>{this.props.navigation.navigate("Map")}}>
            <Image
            source={require('../Assets/pin.png')}
            style={{height: 30, width: 30}}
          />
          </TouchableOpacity>
        </View>

        <FlatList
          data={this.state.data}
          keyExtractor={(item) => item}
          renderItem={({item, index}) => {
            if (item.flag == 1) {
              return this.renderItem1({item, index});
            }
            return this.renderItem2({item, index});
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  inputStyle: {
    width: '100%',
    height: 75,
    flexDirection: 'row',
    padding: 10,
  },
  popup: {
    backgroundColor: 'white',
    marginTop:400,
    borderRadius: 2,
    width: 200,
    height:150,
    marginLeft:100,
    shadowColor: "gray",
    shadowOpacity: 0.3,
    shadowRadius:1,
    elevation: 10,
    shadowOffset: { height: 3, width: 0 }
  },
  popupOverlay: {
    flex: 1,
    position:"absolute",
  },
});
