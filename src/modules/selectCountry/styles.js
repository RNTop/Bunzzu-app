import Color from "../../styles/colors"
import {Platform,Dimensions} from 'react-native';
let {width, height}=Dimensions.get('window');
export default ({
			
	cardTheme:{
		width:'90%',
		margin:15,
		padding:15,
		borderRadius:20,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 1.5,
		elevation: 3,
		backgroundColor:'white'
    },
    input: {
        color: Color.PRIMARY_COLOR
      },
    label: {
        color: Color.TEXTCOLOR_BLACK
    },
    icon: {
        color: Color.PRIMARY_COLOR
    },
    container: {
        flex: 1
    },
    modal: {
        justifyContent: "center",
        alignItems: "center"
    },	
});
