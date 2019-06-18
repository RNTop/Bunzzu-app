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
        fontSize:14,
        marginTop:Platform.OS === 'ios' ? ((height>810||width>810)?40:25): 5,
        width:'90%',
        zIndex:100,
        position:'absolute',
        height:25
    },
    iteminput:{
        zIndex:100,
        width:250,
        height:50,       
        textAlign:'center',
        fontSize:20,
        borderColor:Color.BACKGROUND_WHITE,
        borderWidth:1,
        borderRadius:25,
        paddingLeft:25,
        paddingRight:25,
        color:Color.BACKGROUND_WHITE,
        marginTop:Platform.OS === 'ios' ? ((height>810||width>810)?65:50): 30,
        position:'absolute'        
    }
	
});
