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
        let {labelColor,fieldColor}=this.state
        let { onChangeText, name, isValid,value,width} = this.props
        return (
            <Item fixedLabel style={{ margin: 10, borderBottomColor: isValid == undefined ? fieldColor : "red", width:width==undefined?"100%":width }}>
                <Item floatingLabel style={{ borderBottomColor: Color.BACKGROUND_WHITE }} tintColor={Color.PRIMARY_COLOR}>
                    <Label style={{fontSize:14,color:labelColor}}>{name}</Label>
                    <Input                        
                        style={{fontSize:14,color:labelColor}}
                        onBlur={ () => this.onBlur() }
                        onFocus={ () => this.onFocus() }
                        onChangeText={(text) => onChangeText(text)}
                        value={value}                                                                
                    />
                </Item>               
                {
                    isValid == "" ? <Text></Text> : <Text style={styles.invalidTxt}>{isValid}</Text>
                }
            </Item>
        )
    }
}
const styles = StyleSheet.create({
    invalidTxt:{
		position:'absolute',
		color:'red',
		bottom:-15,
		right:0,
		zIndex:100,
		fontSize:10
	},
});
