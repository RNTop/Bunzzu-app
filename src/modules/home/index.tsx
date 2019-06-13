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

export default class HomePage extends Component {
    state = {

    };
    componentDidMount() {

    }

    public render() {


        return (
            <View style={styles.container}>
                <Image
                    source={LogoUrl}
                    style={[DefaultStyles.logo]}
                />
            </View>
        );
    }
}

// const mapDispatchToProps = (dispatch) => {
// 	return bindActionCreators(ActionCreators, dispatch)
//   }
// export default connect(null, mapDispatchToProps)(LoginPage)
