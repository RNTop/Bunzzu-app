import { StyleSheet, Dimensions, Platform } from "react-native";
import Color from "./colors";
let { width, height } = Dimensions.get('window')

export const DefaultStyles = StyleSheet.create({
  alignCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  mainContainer: {
    padding: 5,
    backgroundColor: Color.BACKGROUND_COLOR,
    flex: 1
  },
  headerstyle: {
    backgroundColor: Color.PRIMARY_COLOR,
    height: Platform.OS === 'ios' ? ((height > 810 || width > 810) ? 105 : 80) : 60,
    paddingTop: Platform.OS === 'ios' ? ((height > 810 || width > 810) ? 65 : 50) : 15,
    paddingLeft: 15,
    flexDirection: 'row'    
  },
  back: {
    color: Color.BACKGROUND_WHITE,
    marginRight: 10
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Color.BACKGROUND_WHITE
  },
  detailCard: {
    padding: 10,
    backgroundColor: "white",
    margin: 12,
    borderRadius: 7,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowRadius: 7,
    shadowOpacity: 0.2
  },
  descriptionText: {
    color: Color.TEXTCOLOR_DARKGREY,
    fontFamily: "Roboto",
    fontSize: 14,
    margin: 10
  },
  logo: {
    marginTop: 200,
    height: 150,
    width: 150
  },
  homeLogo: {
    height: 150,
    width: 150
  },
});
