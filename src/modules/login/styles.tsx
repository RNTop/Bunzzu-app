import Color from "../../styles/colors"
export default ({
	container: {
		flex: 1,
		justifyContent: "space-evenly",
		alignItems: "center",
		backgroundColor: Color.BACKGROUND_COLOR,
		resizeMode: 'contain'
	},
	authBox: {
		flex: 4,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: Color.BACKGROUND_WHITE,
		width: '100%',
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
	btnText: {
		color: Color.BACKGROUND_WHITE,
		fontWeight: 'bold',
		fontSize: 20
	},
	animationBox: {
		flex: 6,
		alignItems: 'center',
		justifyContent: "center"
	}
});
