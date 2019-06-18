import React, {
	Component
} from "react";
import {
	StyleSheet,
	Text,
	View,
	Image,
	Animated,
	TouchableOpacity,
	ImageBackground
} from "react-native";
import {
	LogoUrl,AppBackgroundImage,ButtonImage
} from "../../constant/index";
import {
	SkypeIndicator,
	UIActivityIndicator
} from 'react-native-indicators';
import {Icon,Content,Card, Thumbnail, Title} from 'native-base'
import UserModal from "@components/UserModal"
import Color from "../../styles/colors"
import { DefaultStyles } from "../../styles/styles"
import styles from "./styles"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from "../../redux/action.js"
import StorageHelper from "../../helpers/StorageHelper";
import AsyncStorage from '@react-native-community/async-storage';

class HomePage extends Component {
    state = {

    };
    componentDidMount() {
    
    }
    
    async applogout() {		
      await AsyncStorage.removeItem(StorageHelper.StorageKeys.UserInfo)
      this.props.logout();		
	  }
    public render() {
       let {username,email,appLogo}=this.props.UserInfo
        return (
            <ImageBackground 
			 style={styles.container}
			 source={AppBackgroundImage}			
			>              
            <View style={{flex:2,width:'100%'}}>
                <Icon   
                type={"MaterialCommunityIcons"} name={'logout'}           
                style={styles.logout}
                onPress={()=>this.applogout()}
                /> 
            </View>
            <View style={styles.mainContent}>
              <UserModal  
               avatar={appLogo}
               username={username}
               email={"ivansantiagouk2gmail.com"}  
               onPress={()=>{alert('here')}}        
              />
              <TouchableOpacity 
              style={[styles.cardTheme,{flex:4,justifyContent:'center',alignItems:'center',backgroundColor:Color.PRIMARY_COLOR}]}
              onPress={()=>{this.props.qrcodeScan('givePoints')}}
              >          
               <Text style={{fontSize:30,color:Color.BACKGROUND_WHITE,fontWeight:'bold'}}>Give Points</Text>                           
              </TouchableOpacity>
              <TouchableOpacity 
              style={[styles.cardTheme,{flex:4,marginBottom:100,justifyContent:'center',alignItems:'center',backgroundColor:Color.PRIMARY_COLOR}]}
              onPress={()=>{this.props.qrcodeScan('claimReward')}}
              >                  
                <Text style={{fontSize:30,color:Color.BACKGROUND_WHITE,fontWeight:'bold'}}>Redeem rewards</Text>                 
             </TouchableOpacity>
            </View>
            </ImageBackground>
        );
    }
}
const mapStateToProps = ({auth,qrData}) => {
    return {
        UserInfo: auth.user,
        ScanedValue:qrData
    }
}
const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(ActionCreators, dispatch)
  }
export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
