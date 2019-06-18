import React, {
	Component
} from "react";
import { 
    Text, 
    StyleSheet,
    TouchableOpacity,
    View,
    Dimensions,
    TextInput
} from 'react-native'
import {Icon} from 'native-base';
import Color from "../styles/colors"
export default class InputItem extends Component {
    constructor(props){
        super(props)
    }
	state = {
		passwordShow:true
	};
    
    render() {
        let {placeholder,IconType,IconName,onChangeText, value={value}} =this.props
        let {passwordShow }=this.state
        if(placeholder!="Password"){
            return (
                <View style={styles.container}> 
                    <Icon 
                    type={IconType}
                    name={IconName}           
                    style={{fontSize:20, color:Color.PRIMARY_COLOR}}
                    />                 
                    <TextInput style={styles.iteminput}
                    underlineColorAndroid="transparent"
                    placeholder={placeholder}
                    placeholderTextColor={Color.PRIMARY_COLOR}
                    autoCapitalize="none"                           
                    onChangeText={(text)=>{onChangeText(text)}}
                    value={value}
                    /> 
                </View>
            )
           }else{
            return (
                <View style={styles.container}> 
                    <Icon 
                    type={IconType}
                    name={IconName}           
                    style={{fontSize:20, color:Color.PRIMARY_COLOR}}
                    />                 
                    <TextInput style={[styles.iteminput,{width:220}]}
                    underlineColorAndroid="transparent"
                    placeholder={placeholder}
                    placeholderTextColor={Color.PRIMARY_COLOR}
                    autoCapitalize="none"  
                    secureTextEntry={passwordShow} 
                    onChangeText={(text)=>{onChangeText(text)}}  
                    value={value}      
                    /> 
                    <Icon 
                    type={"Entypo"}
                    name={passwordShow!=true?"eye":"eye-with-line"}           
                    style={{fontSize:25, color:Color.PRIMARY_COLOR}}
                    onPress={()=>{this.setState({passwordShow:!passwordShow})}}
                    /> 
                </View>
            )
        }
	}
 }
const styles = StyleSheet.create({
	container: {
        width:300,
        height:50,
        borderRadius:25,
        borderWidth:1,
        borderColor:Color.PRIMARY_COLOR,
		justifyContent:"center",
        alignItems: "center",
        flexDirection:'row'	,
        paddingLeft:25,
        paddingRight:25,
        margin:10
    },
    iteminput:{
        width:250,
        color:Color.PRIMARY_COLOR,
        paddingLeft:10
    }
	
});
