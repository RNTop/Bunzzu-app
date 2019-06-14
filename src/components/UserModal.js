
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
import { Icon } from 'native-base';
import Color from "../styles/colors"
export default class AppButton extends Component {
    render() {
        let { onPress,username, avatar,email } = this.props
        return (
            <View style={[styles.cardTheme,styles.userModal]}> 
                 <Image 
                  source={{uri:avatar}}
                  style={styles.userAvatar}
                 />
                 <Text style={{fontSize:25,fontWeight:'bold'}}>{username}</Text> 
                 <Text>{email}</Text>  
                 <TouchableOpacity
                  style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}
                  onPress={()=>onPress()}
                 >
                    <Icon   type={"AntDesign"} name={'edit'}           
                    style={{fontSize:20, color:Color.PRIMARY_COLOR,paddingRight:10}}
                    /> 
                    <Text 
                    style={{color:Color.PRIMARY_COLOR}}                     
                    >Edit Your Details</Text>
                 </TouchableOpacity>              
            </View>
        )
    }
}
const styles = StyleSheet.create({
    userModal:{
		flex:5,
		marginTop:-50,
		justifyContent:'space-evenly',
		alignItems:'center'
	},
	userAvatar:{
		width:100,
		height:100,
		borderRadius:50,
		borderWidth:5,
		borderColor:Color.BACKGROUND_WHITE,
		marginTop:-75
    },
    cardTheme:{
		width:'80%',
		margin:15,
		borderRadius:20,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 1.5,
		elevation: 3,
		backgroundColor:'white'
	},
});
