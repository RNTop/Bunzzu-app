import Color from "../../styles/colors"
import {Platform,Dimensions} from 'react-native';
let {width, height}=Dimensions.get('window');
export default ({
	container:{
		backgroundColor:Color.BACKGROUND_GRAY,
		width:width,
		alignItems:'center',
		justifyContent:'center'
	},
	cardTheme:{
		width:'95%',
		margin:10,
		padding:10,
		borderRadius:5,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.5,
		shadowRadius: 1.5,
		elevation: 3,
		backgroundColor:'white',
		alignItems:'center'
	},	
	subTitle:{		
		marginTop:10,
		fontSize:20,
		fontWeight:"bold",
		width:'100%',
		textAlign:"left",	
		color:Color.PRIMARY_COLOR	
	},
	containerImage: {
		flex: 1,
		width: null,
		height: null
	 },
	 box: {
		padding: 10,
		backgroundColor: "transparent",
		flex: 1,
		height: height - 70
	 },
	 space: {
		marginTop: 10,
		marginBottom: 10,
		justifyContent: "center",
		alignItems: "center"
	 },
	 modal: {
		justifyContent: "center",
		alignItems: "center",
		flex:1,
		backgroundColor: "#00000070",
	 },
	 modal1: {
		height: 270,
		width:300,
		padding:20,
		borderRadius:10,
		borderWidth:1,
		borderColor:Color.BACKGROUND_GRAY,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: Color.BACKGROUND_WHITE,
	 },
	 modal2: {
		height: height - 78,
		position: "relative",
		justifyContent: "center"
	 },
	 closeBtn:{
		 color:Color.PRIMARY_COLOR,
		 position:'absolute',
		 right:15,
		 top:15
	 },
	 submitBtn: {
		backgroundColor: Color.PRIMARY_COLOR,
		width: 150,
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 25,
		marginTop: 20,
	},
	changePasswordBtn:{
		backgroundColor: Color.PRIMARY_COLOR,
		width: 300,
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 25,
		margin: 20,
		marginBottom:40
	},
	invalidTxt:{
		position:'absolute',
		color:'red',
		bottom:-15,
		right:0,
		zIndex:100,
		fontSize:10
	},
	submitTxt:{
		fontSize:18,
		color:Color.BACKGROUND_WHITE,
		fontWeight:"bold"
	},
	cancelTxt:{
		fontSize:18,
		color:"black",
		fontWeight:"bold"
	},
	cancelNav:{
		width:'100%',
		alignItems:'center',
		justifyContent:'center'
	},
	orTxt:{
		fontSize:12,
		color:"black",
		fontWeight:"bold",
		margin: 15,	
	},
	inputGrp: {
		flexDirection: "row",
		margin: 10
	 },
	 input: {
		paddingLeft: 10,
		color: "black"
	 },
	 formErrorIcon: {
		color: "black",
		marginTop: 5,
		right: 10
	 },
	 formErrorText1: {
		fontSize: Platform.OS === "android" ? 12 : 15,
		color: "red",
		textAlign: "right",
		top: -10
	 },
	 formErrorText2: {
		fontSize: Platform.OS === "android" ? 12 : 15,
		color: "transparent",
		textAlign: "right",
		top: -10
	 }
});
