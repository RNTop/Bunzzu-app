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
	LogoUrl,AppBackgroundImage
} from "../../constant/index";
import {
	SkypeIndicator,
	UIActivityIndicator
} from 'react-native-indicators';
import InputItem from "@components/InputItem"
import Color from "../../styles/colors"
import { DefaultStyles } from "../../styles/styles"
import styles from "./styles"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from "../../redux/action.js"

import QRCodeScanner from 'react-native-qrcode-scanner';
 class QrcodeScannerPage extends Component {
	
	componentDidMount() {		
		
	}
	eventHandle(value){
      alert(value)
    }
	public render() {		
		let UserInfo = this.props.UserInfo
		return (
			<ImageBackground 
			 style={styles.container}
			 source={AppBackgroundImage}			
			>	
            <Text 
            style={styles.cancelText}
            onPress={()=>{this.props.scanningCancel()}}
            >Cancel</Text>		
              <QRCodeScanner
                showMarker={true}
                onRead={(e)=>this.eventHandle(e.data)}
                cameraStyle={{flex:1}}
                // flashMode={false}
                topContent={
                <Text style={styles.centerText}>
                Here You can scan QR code
                </Text>
                }            
                />
			</ImageBackground>
		);
	}
}
const mapStateToProps = ({auth}) => {
    return {
        UserInfo: auth
    }
}
const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(ActionCreators, dispatch)
  }
export default connect(mapStateToProps, mapDispatchToProps)(QrcodeScannerPage)
