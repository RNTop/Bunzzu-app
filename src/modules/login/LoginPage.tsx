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
	KeyboardAvoidingView,
	Dimensions,
	SafeAreaView,
	ScrollView
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
import StorageHelper from "../../helpers/StorageHelper";
import AsyncStorage from '@react-native-community/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
let { width, height } = Dimensions.get('window')
class LoginPage extends Component {
	state = {
		email: 'ivan.santiagouk@gmail.com',
		password: 'trattoria',
		// email:'',
		// password:'',
		loading: true,
		loginModalVisible: false,
		registerModalVisible: false,
		offsetY: new Animated.Value(0),
		fadeAnim: new Animated.Value(0),
		indCatorVisible: "flex"
	};
	componentDidMount() {
		this.intervalId = setInterval(() => {
			this.setTimePassed();
		}, 3000);
	
	}
	async setTimePassed() {
		const UserInfo = await AsyncStorage.getItem(StorageHelper.StorageKeys.UserInfo)
		if (UserInfo) {
			this.props.autoLogin(JSON.parse(UserInfo));
		}
		this.setState({ loading: false })
		this.logoAnimation()
		clearInterval(this.intervalId);
	}
	logoAnimation() {
		Animated.timing(
			this.state.offsetY,
			{
				toValue: -150,
				duration: 500
			},

		).start();
		Animated.timing(
			this.state.fadeAnim,
			{
				toValue: 1,
				duration: 2000,
			}
		).start();
	}
	AppLogIn() {
		let { email, password } = this.state
		this.props.loginUser({ email, password })
	}
	public render() {

		let { loading, indCatorVisible, email, password, fadeAnim } = this.state

		let UserInfo = this.props.UserInfo
		return (
			
				<ImageBackground
					style={[styles.container]}
					source={AppBackgroundImage}
				>
				  <KeyboardAwareScrollView > 
				  	<View style={{height:height,width:width}}	>											
								<Animated.View
									style={[{ transform: [{ translateY: this.state.offsetY }] }, styles.animationBox]}
								>
									<Image
										source={LogoUrl}
										style={[DefaultStyles.logo]}
									/>
								</Animated.View>
							
								{
									loading != true ?
										<Animated.View style={[styles.authBox, { opacity: fadeAnim, }]}>
										
											<InputItem
												placeholder="User Name"
												IconName="user"
												IconType="Entypo"
												onChangeText={(text) => { this.setState({ email: text }) }}
												value={email}
											/>
											<InputItem
												placeholder="Password"
												IconName="lock"
												IconType="FontAwesome5"
												onChangeText={(text) => { this.setState({ password: text }) }}
												value={password}
											/>
											<TouchableOpacity style={styles.authBtn}
												onPress={() => { this.AppLogIn() }}
											>
										
												{UserInfo.loading != true ?
													<Text style={styles.btnText}>Sign In</Text> : <UIActivityIndicator color={'white'} size={20} />
												}
											</TouchableOpacity>
											
										</Animated.View> : <Animated.View style={[{ flex:4, backgroundColor: '#00000000' }]}>
											<View style={{ height: 50 }}><SkypeIndicator color={Color.BACKGROUND_WHITE} /></View>
										</Animated.View>
								}
						</View>
				 </KeyboardAwareScrollView>  
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
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
