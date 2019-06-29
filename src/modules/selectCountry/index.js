import React from "react";
import { StyleSheet, View, Image ,TouchableOpacity,Dimensions,StatusBar} from "react-native";
import Color from "../../styles/colors";
import {
  Icon,
  Body,
  Right,
  List,
  ListItem,
  Text,
  Thumbnail,  
  Item,
  Input,
  Label,
  Container,
  Content
} from "native-base";
let {width,height}=Dimensions.get('window')
import { DefaultStyles } from "../../styles/styles"
import styles from "./styles"
import Strings from "../../constant/strings"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from "../../redux/action.js"
import NavigationService from '../../navigation/NavigationService'
interface Props {
  style?: any;
  disabled?: boolean;
  items?: any;
  selected?: string;
  nameList: string;
  countryChanged: any;
  countryCodeChanged: any; 
}

class CustomCountryPicker extends React.Component<Props> {

  getUrl(iso: string): string {
    return (
      "https://www.digizonetech.co.uk/restaurants/API/flags/" +
      iso.toLowerCase() +
      ".png"
    );
  } 
  renderCheck(item) {
    let {editData}=this.props  
    if (item.id == editData.user.countryCode)
      return <Icon style={styles.icon} name="md-checkmark" />;
  }
  selectedItem(id){
    let newUser=this.props.editData.user
    let NewInitStatus=this.props.editData.initStatus
    NewInitStatus.basic=false;
    newUser.countryCode=id;
    this.props.userInfoChanged(newUser,NewInitStatus)
    NavigationService.goBack()
  }
  render() {

   let {editData}=this.props
    return (
        <Container>
                <StatusBar
                    backgroundColor={Color.PRIMARY_COLOR}
                    barStyle='light-content'
                />
                <View style={DefaultStyles.headerstyle}>
                    <Icon
                        type={"AntDesign"} name={'arrowleft'}
                        style={DefaultStyles.back}
                        onPress={()=>NavigationService.goBack()}
                    />
                    <Text style={DefaultStyles.title}>{Strings.SelectCountry}</Text>
                </View>                
                <List                   
                    dataArray={editData.phonecodes}
                    renderRow={item => (
                    <ListItem button onPress={() =>this.selectedItem(item.id)}>
                        <Body>
                        <View style={{ flexDirection: "row" }}>
                            <Image
                            source={{ uri: this.getUrl(item.iso) }}
                            style={{ width: 30, height: 20 }}
                            />
                            <Text style={styles.label}>{item.name}</Text>
                        </View>
                        </Body>
                        <Right>{this.renderCheck(item)}</Right>
                    </ListItem>
                    )}
                />                
        </Container>
     
    );
  }
}
const mapStateToProps = ({ auth, edit}) => {
    return {
        UserInfo: auth.user,
        editData: edit
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(ActionCreators, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(CustomCountryPicker)



