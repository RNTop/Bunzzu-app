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
	ImageBackground,
	TextInput,
	Alert,
	TouchableWithoutFeedback,
	Keyboard
} from "react-native";
import {
	LogoUrl, AppBackgroundImage
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
import NavigationService from '../../navigation/NavigationService'
import Strings from "../../constant/strings"
class QrcodeScannerPage extends Component {
	state = {
		points: null
	}
	componentDidMount() {

	}
	eventHandle(qrCodeId) {
		let { id, masterId } = this.props.UserInfo
		let userId = id
		let ScanType = this.props.navigation.state.params.ScanType;
		let { points } = this.state
		if (parseInt(qrCodeId, 10)) {
			if (ScanType == "givePoints") {
				if (points != null) {
					Alert.alert(
						Strings.confirmation,
						Strings.givepoints_confirm_msg + points + " points?",
						[{ text: 'YES', onPress: () => this.props.givePointsApiConnect({ qrCodeId, userId, masterId, points }), style: 'ok' },
						{ text: 'NO', onPress: () => this.restartScanner(), style: 'cancel' }
						]
					);
				} else {
					this.ErrorAlert(Strings.StepsErrorMessage)				
				}
			} else {
				Alert.alert(
					Strings.confirmation,
					Strings.redeem_confirm_msg,
					[{ text: 'YES', onPress: () => this.props.clamimRewardsApiConnect({ qrCodeId, userId, masterId }), style: 'ok' },
					{ text: 'NO', onPress: () => this.restartScanner(), style: 'cancel' }
					]
				);
			}
		} else {
			this.ErrorAlert(Strings.QrcodeInvalidMessage)
			
		}
	}
	ErrorAlert(body) {
		Alert.alert(
			Strings.note,
			body,
			[{ text: 'OK', onPress: () => this.restartScanner(), style: 'ok' }]
		);
	}
	restartScanner(){
		let ScanType = this.props.navigation.state.params.ScanType;
		NavigationService.navigateAndResetWithParams("QrScanner", { ScanType:ScanType});
	}
	// customAlertMessage(title,body,YesOnPress,NoOnPress){
	// 	Alert.alert(
	// 		title,
	// 		body,
	// 		[{ text: 'OK', onPress: () => YesOnPress(), style: 'ok' },
	// 		 { text: 'NO', onPress: () => NoOnPress(), style: 'no' }]
	// 	);	
	// }
	public render() {
		let UserInfo = this.props.UserInfo
		let points = this.state
		let ScanType = this.props.navigation.state.params.ScanType
		return (		    
			<ImageBackground
				style={styles.container}
				source={AppBackgroundImage}
			>
				<Text
					style={styles.cancelText}
					onPress={() => { this.props.scanningCancel() }}
				>Cancel</Text>
				{
					ScanType == "givePoints" ? <TextInput style={styles.iteminput}
					underlineColorAndroid="transparent"
					placeholder={"Points to give"}
					placeholderTextColor={Color.BACKGROUND_WHITE}
					autoCapitalize="none"
					keyboardType='numeric'
					returnKeyType={'done'}
					onChangeText={(text) => { this.setState({ points: text }) }}
					value={points}
				/> : <View></View>
				}
				<QRCodeScanner				    
					showMarker={true}
					onRead={(e) => this.eventHandle(e.data)}
					cameraStyle={{ flex: 1 }}				
				/>
			</ImageBackground>		
		);
	}
}
const mapStateToProps = ({ auth }) => {
	return {
		UserInfo: auth
	}
}
const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(ActionCreators, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(QrcodeScannerPage)
