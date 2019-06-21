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
		width:'85%',
		margin:15,
		padding:15,
		borderRadius:20,
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
		fontSize:25,
		fontWeight:"bold"		
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
		borderRadius:10,
		borderWidth:1,
		borderColor:Color.BACKGROUND_GRAY
	 },
	 modal1: {
		height: 270,
		width:300,
		padding:20
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
		margin: 20,
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
	orTxt:{
		fontSize:12,
		color:"black",
		fontWeight:"bold",
		marginBottom: 20,	
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
