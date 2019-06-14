import Color from "../../styles/colors"
import {Platform,Dimensions} from 'react-native';
let {width, height}=Dimensions.get('window');
export default ({
	container: {
		flex: 1,
		justifyContent: "space-evenly",
		alignItems: "center",
		backgroundColor: Color.PRIMARY_COLOR
	},	
	cardTheme:{
		width:'80%',
		margin:15,
		borderRadius:20,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 1.5,
		elevation: 3,
		backgroundColor:'white'
	},
	logout:{
		fontSize:35, 
		color:Color.BACKGROUND_WHITE,
		position:'absolute',
		right:10,
		top:Platform.OS === 'ios' ? ((height>810||width>810)?50:35): 15
	},
	mainContent:{
		alignItems:'center',
		flex:7,
		backgroundColor:Color.BACKGROUND_GRAY,
		width:'100%',
		paddingTop:-50
	},
	userModal:{
		flex:5,
		marginTop:-50,
		justifyContent:'space-evenly',
		alignItems:'center'
	},
	userAvatar:{
		width:100,
		height:100,
		borderRadius:50,
		borderWidth:5,
		borderColor:Color.BACKGROUND_WHITE,
		marginTop:-75
	},
});
