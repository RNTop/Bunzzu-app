import { StyleSheet } from "react-native";
import Color from "./colors";

//styles

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
