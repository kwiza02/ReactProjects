//LoginScreen

import React, { Component } from 'react';
import {
    Image,
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    BackHandler,
    Linking,
    Share,
    Dimensions,
    ScrollView,
    FlatList,
    ActivityIndicator,
    PermissionsAndroid,
    RefreshControl,
    Alert,
} from 'react-native';

import { Header,button,Colors,String,AppFonts} from '../../Resources/index';
import Utils from '../../Component/Utils';
import { Constants } from '../../RestAPI/Constants';
import { get, post  } from '../../RestAPI/RestAPIHandler';
import { getLayoutSize,getFontSize } from '../../Component/Responsive';
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from '@react-native-community/geolocation';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class LoginScreen extends Component{

    constructor(props){
        super(props);
        this.state={
            userid:'',
            isLoading: false,
            isMoreData: false,
            isRefreshing: false,
            useridError:'',
            myList: [],
            useridValid:'',
            password:'',
            passwordError:'',
        }
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
    requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "Cool Photo App Camera Permission",
                    message:
                        "Cool Photo App needs access to your camera " +
                        "so you can take awesome pictures.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the camera");
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };
    
    async componentDidMount() {

        Geolocation.getCurrentPosition(info => {
            console.log(info)
            this.setState({currentLocation: info});
            Alert.alert(JSON.stringify(info))
            }
        );


        this.doSignUp();
        //this.onShare();
        //Linking.openURL('mailto:support@example.com?subject=SendMail&body=Description')
        //Linking.openURL("https://www.google.com");
    }

    disableBackButton = () => {
        this.props.navigation.navigate("MainScreen");
        return true;
    }

    UNSAFE_componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.disableBackButton);
    }

    UNSAFE_componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.disableBackButton);
    }

    async doSignUp() {

        // let formdata = new FormData();
        // formdata.append("full_name", 'Harry')
        // formdata.append("email", "harry@example.com")
        // formdata.append("password", "123456789")
        // formdata.append("device_type", 'android')
        // formdata.append("device_token", "android")
        // formdata.append("profile_picture", {uri: photo.uri, name: 'image.jpg', type: 'image/jpeg'})
        // var data = await postFormData(Constants.SIGN_UP, formdata);

        var body = JSON.stringify({
            full_name: 'harry',
            email: 'harry@example.com',
            password: '123456789',
            device_type: '0',
            register_type: '2',
            email_recieve: '1',
            apple_id: "123456",
            device_token: 'android',
        })

        var data = await post(Constants.SIGN_UP, body);
        console.log("Data payload "+JSON.stringify(data));
    }

    // Check null condition before save data in async storage or used in flatlist or anyw
    async isCheck() {
        this.setState({isLoading: true});
        var body = JSON.stringify({
            email: 'harry@example.com',
            password: '123456789',
            device_type: 'android',
            device_token: 'android',
        })
        var data = await post(Constants.LOGIN, body);
        //let data = this.getData();
        if (data !== null && data.success === "yes" && data.data !== null) {
            //AsyncStorage.setItem("@data", JSON.stringify(data.data));
            //AsyncStorage.setItem("@user_id", JSON.stringify(data.data.user_id));
            Alert.alert("Success");
        } else {
            Alert.alert(data.message)
        }
        this.setState({ isLoading: false });
        console.log("Data "+JSON.stringify(data));
        var isValid = true;

        if (Utils.isStringNull(this.state.userid)) {
            isValid = false;
            this.setState({ useridError: String.validate.usernameError });
        }else if (!Utils.isEmailValid(this.state.userid)) {
            isValid = false;
            this.setState({ useridValid: String.validate.validEmail });
        }else {
            this.setState({ useridError: null });
        }

        if (Utils.isStringNull(this.state.password)) {
            isValid = false;
            this.setState({ passwordError: String.validate.passwordError });
        } else if (!Utils.isPassSmall(this.state.password)) {
            isValid = false;
            this.setState({ passwordError: String.validate.smallError });
        } else if (!Utils.isPassCapital(this.state.password)) {
            isValid = false;
            this.setState({ passwordError: String.validate.capitalError });
        } else if (!Utils.isPassNumber(this.state.password)) {
            isValid = false;
            this.setState({ passwordError: String.validate.numberError });
        } else if (!Utils.isPassSpecial(this.state.password)) {
            isValid = false;
            this.setState({ passwordError: String.validate.specialError });
        } else if (!Utils.ispassLength(this.state.password)) {
            isValid = false;
            this.setState({ passwordError: String.validate.lengthError });
        } else {
            this.setState({ passwordError: null });
        }

        if (isValid === true) {
            this.props.navigation.navigate("RegisterScreen");

        }
    }

    // Use async and await for API call
    // Get API pass parameter with ? and & sign to add
    // JSON.stringify to convert json object to string
    // JSON.Parse for convert string object ot convert into JSON object
    async getData() {
        try {
            let response = await fetch(
                Constants.GET_MOVIES
            );
            let json = await response.json();
            //var dataJson = JSON.stringify(json);
            //var arrayData = JSON.parse(dataJson);
            console.log("Details " + JSON.stringify(json.title))
            this.setState({myList: json.movies, isLoading: false});
            return json.movies;
        } catch (error) {
            console.error(error);
            Alert.alert("Some thing went wrong. Please try again later.");
            Alert.alert(error.message);
        }
    }
    async onRefresh() {
        this.setState({ isRefreshing: true})
        var data = await get("https://reactnative.dev/movies.json");
        console.log("URL " + JSON.stringify(data));
        this.setState({ myList: [...this.state.myList, ...data.movies ] , isLoading: false });
        this.setState({ isRefreshing: false })
    }

    handleLoadMore = async () => {
        this.setState({ isMoreData: true})
        var data = await get("https://reactnative.dev/movies.json");
        console.log("URL " + JSON.stringify(data));
        this.setState({ myList: [...this.state.myList, ...data.movies], isLoading: false, isMoreData: false });

    };
    renderFooterLoader = () => {
        if (!this.state.isMoreData) return null;
        return (
            <ActivityIndicator size="small" color="#0000ff" />
        );
    };
    renderHeader = () => {
        return (
            <Text style={{color: 'black'}}> Header</Text>
        );
    };
    render(){
        return(
            <View style={styles.mainContainer}>

                {/*<View>
                    <View style={{ backgroundColor: 'red', width: '100%', height: '100%' }}>

                    </View>
                    <View style={{ backgroundColor: 'green', position: 'absolute', top: 20, left: 20, width: 200, height: 200 }}>
                        
                    </View>
                </View>*/}

                <ScrollView>
                    <Header title={require("../../Assets/ImageAndIcons/logo.png")} imgSrc={require("../../Assets/ImageAndIcons/back_with_arrow.png")} isBack={true} screen={"MainScreen"} navigation={this.props.navigation}></Header>
               <View style={styles.container}>
                   <View style={{width: '100%', height: 200,backgroundColor: 'white'}}>
                            {this.state.isLoading === true ? 
                            <ActivityIndicator size="small" color="#0000ff" /> : (
                            this.state.myList.length !== 0 ? 
                            <FlatList
                                data={this.state.myList}
                                keyExtractor={({ id }, index) => id}
                                refreshControl={
                                      <RefreshControl
                                           refreshing={this.state.isRefreshing}
                                           onRefresh={this.onRefresh.bind(this)}
                                      />
                                }
                                renderItem={({ item }) => (
                                    <Text>{item.id}, {item.title}, {item.releaseYear}</Text>
                                )}
                                            ListHeaderComponent={this.renderHeader.bind(this)}
                                onEndReachedThreshold={0.4}
                                            ListFooterComponent={this.renderFooterLoader.bind(this)}
                                onEndReached={this.handleLoadMore.bind(this)}
                            />
                            : <Text>No Records</Text>
                        )}
                        </View>
                        <Text style={styles.textStyle}>LOGIN TO CNQR</Text>
                        <Text style={{color: 'white'}}>{JSON.stringify(this.state.currentLocation)}</Text>
                   <TextInput
                        style={styles.inputStyle}
                        placeholder="Email"
                        placeholderTextColor="#a9a9a9"
                        value={this.state.userid}
                        onChangeText={(text)=>{this.setState({userid:text,useridError:null,useridValid:null})}}/>

                    {!!this.state.useridValid && (
                        <Text style={Colors.first}>{String.validate.validEmail}</Text>
                    )}

                    {!!this.state.useridError && (
                        <Text style={Colors.first}>{String.validate.usernameError}</Text>
                    )}

                    <TextInput
                        style={styles.inputStyle}
                        placeholder="Password"
                        secureTextEntry={true}
                        maxLength={8}
                        placeholderTextColor="#a9a9a9"
                        value={this.state.password}
                        onChangeText={(text) => { this.setState({ password: text,passwordError:null }) }} />
                    
                    {!!this.state.passwordError && (
                        <Text style={Colors.first}>{this.state.passwordError}</Text>
                    )}

                    <View style={styles.forgotView}>
                        <Text style={styles.forgotText}>Forgot password?</Text>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate("ForgotPasswordScreen")}}>
                            <Text style={styles.forgotHelp}>Get help signing in</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonView}>
                        <TouchableOpacity style={button.ButtonLoginContainer} onPress={()=>{this.isCheck();}}>
                            <Text style={button.mainScreenButtonLoginText}>LOGIN</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={button.ButtonContainer} onPress={()=>{this.props.navigation.navigate("UserProfileScreen")}}>
                            <Image source={require("../../Assets/ImageAndIcons/gmail_1x.png")} style={styles.image}/>
                            <Text style={button.ButtonContainerText}>LOGIN WITH GMAIL</Text>
                        </TouchableOpacity>
                    </View>
               </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: "black",
        flex: 1,
    },
    container:{
        flex:1,
        padding: getLayoutSize(10),
    },
    textStyle:{
        color:"white",
        fontSize: getFontSize(18),
        alignSelf:"center",
        marginTop: getLayoutSize(50),
        fontFamily:AppFonts.text.font2,
    },
    inputStyle:{
        marginTop: getLayoutSize(30),
        borderBottomColor:"#a9a9a9",
        borderWidth:1,
        color:"white",
    },
    forgotView:{
        flexDirection:"row",
        marginTop: getLayoutSize(30),
    },
    forgotText:{
        fontSize: getFontSize(12),
        color:"#a9a9a9",
    },
    forgotHelp:{
        color:"#10fec3",
        fontSize: getFontSize(14),
        marginLeft: getLayoutSize(4),
    },
    buttonView:{
        marginTop: getLayoutSize(50),
    },
    gmailView:{
        flexDirection:"row",
        justifyContent:"center",
    },
    image:{
        tintColor:"#f8f8f8",
        height: getLayoutSize(20),
        width: getLayoutSize(20),
        marginRight: getLayoutSize(5),
       alignSelf:"center",
    },
});