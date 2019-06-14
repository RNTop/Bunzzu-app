import React, { Component } from "react";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import reducers from "./src/redux/reducer/index";
import { createStackNavigator, createAppContainer } from "react-navigation";
import LoginPage from "./src/modules/login/LoginPage";
import HomePage from "./src/modules/home";
import QrScannerPage from "./src/modules/qrcodescanner";

import NavigationService from "./src/navigation/NavigationService";
import Color from "./src/styles/colors";

interface Props {}

const headerTabStyle = {
	backgroundColor: Color.PRIMARY_COLOR,
	shadowOpacity: 0,
	shadowOffset: {
		height: 0,
		width: 0
	},
	elevation: 0,
	marginBottom: 0,
	borderBottomWidth: 0
};

const RootStack = createStackNavigator(
	{
		Login: {
			screen: LoginPage,
			navigationOptions: {
				header: null
			}
		},
		Home: {
			screen: HomePage,
			navigationOptions: {
				header: null
			}
		},
		QrScanner:{
			screen: QrScannerPage,
			navigationOptions: {
				header: null
			}
		}
	},
	{
		initialRouteName: "Login",
		defaultNavigationOptions: {
			headerStyle: headerTabStyle,
			headerTintColor: "#fff",
			headerTitleStyle: {
				fontWeight: "bold"
			},
			headerBackTitle: null
		}
	}
);
export default class App extends Component<Props> {
	render() {
		const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
		const Apps = createAppContainer(RootStack);

		return (
			<Provider store={store}>
				<Apps
					ref={navigatorRef => {
						NavigationService.setTopLevelNavigator(navigatorRef);
					}}
				/>
			</Provider>
		);
	}
}
