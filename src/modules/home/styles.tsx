import Color from "../../styles/colors"
export default ({
    container: {
		flex: 1,
		justifyContent: "space-evenly",
		alignItems: "center",
		backgroundColor: Color.PRIMARY_COLOR
	},	
	authBox: {
		justifyContent: "center",
		alignItems: "center",
		height: 200,
	},
	authBtn: {
		backgroundColor: Color.PRIMARY_COLOR,
		width: 300,
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 25,
		margin: 10,
    },
    btnText:{
        color:Color.BACKGROUND_WHITE,
        fontWeight:'bold',
        fontSize:20
    }
});
