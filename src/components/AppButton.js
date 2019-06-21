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
import { Icon } from 'native-base';
import Color from "../styles/colors"
export default class AppButton extends Component {
    render() {
        let { onPress,name, bgColor,textColor } = this.props
        return (
            <TouchableOpacity style={[styles.Btn,{backgroundColor:bgColor}]}
                onPress={() => { onPress() }}
            >
                <Text style={[styles.btnText,{color:textColor}]}>{name}</Text>
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    Btn: {		
		width: 300,
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 25,
		margin: 10,
    },
    btnText: {		
		fontWeight: 'bold',
		fontSize: 20
	},
});
