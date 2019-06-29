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
import {
    SkypeIndicator,
    UIActivityIndicator
} from 'react-native-indicators';
import { Icon, Header, Container, Left, Content, Col, Title, Item, Label, Input, Thumbnail, Button } from 'native-base'

import Color from "../styles/colors"
export default class EditInput extends Component {
    state={
        labelColor:"black",
        fieldColor: Color.BACKGROUND_GRAY
    }
    onFocus() {
        this.setState({
            labelColor: Color.PRIMARY_COLOR,
            fieldColor:  Color.PRIMARY_COLOR
        })
      }
    
    onBlur() {
    this.setState({
        labelColor: "black",
        fieldColor: Color.BACKGROUND_GRAY
    })
    }
    render() {
       
        let {submitOnPress,submiting , initStatus,cancelOnPress} = this.props
        return (
           <View style={styles.Container}>
                   <TouchableOpacity
                                style={styles.submitBtn}
                        onPress={() => submitOnPress()}
                    >
                        {submiting != true ?
                            <Text style={styles.submitTxt}>Submit</Text> :
                            <UIActivityIndicator color={'white'} size={20} />}
                    </TouchableOpacity>
                    {
                        initStatus != true ?
                            <View style={styles.cancelNav}>
                                <Text style={styles.orTxt}>OR</Text>
                                <Text style={styles.cancelTxt}
                                    onPress={() => cancelOnPress()}
                                >Cancel</Text>
                            </View> : <View style={styles.cancelNav}></View>
                     }  
           </View>
        )
    }
}
const styles = StyleSheet.create({
    Container:{
        alignItems:"center",
        justifyContent:"center",
        width:'100%'
        
    },
    submitBtn: {
		backgroundColor: Color.PRIMARY_COLOR,
		width: 150,
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 25,
		marginTop: 20,
	},
    submitTxt:{
		fontSize:18,
		color:"white",
		fontWeight:"bold"
	},
	cancelTxt:{
		fontSize:18,
		color:"black",
		fontWeight:"bold"
	},
	cancelNav:{
		width:'100%',
		alignItems:'center',
		justifyContent:'center'
	},
	orTxt:{
		fontSize:12,
		color:"black",
		fontWeight:"bold",
		margin: 15,	
	},
});
