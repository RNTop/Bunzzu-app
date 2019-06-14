import Color from "../../styles/colors"
import {Platform,Dimensions} from 'react-native';
let {width, height}=Dimensions.get('window');
export default ({
	container: {
        flex: 1,
        paddingTop:Platform.OS === 'ios' ? ((height>810||width>810)?35:20): 0,
		justifyContent: "space-evenly",
		alignItems: "center",
		backgroundColor: Color.BACKGROUND_COLOR,
		resizeMode: 'contain'
    },
    cancelText:{
        color:Color.BACKGROUND_WHITE,
        fontSize:20,
        margin:10,
        width:'90%'
    }
	
});
