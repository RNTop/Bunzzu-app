import React from "react";
import { StyleSheet, View, Image ,TouchableOpacity,Dimensions} from "react-native";
import Color from "../styles/colors";
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
  Container
} from "native-base";
let {width,height}=Dimensions.get('window')

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from "../redux/action.js"
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
 state={
    isdisplay:"none"
 }
  getUrl(iso: string): string {
    return (
      "https://www.digizonetech.co.uk/restaurants/API/flags/" +
      iso.toLowerCase() +
      ".png"
    );
  }

  componentDidMount() {
    // let {selected,items}=this.props
    // this.setState({phonecode:items[selected].phonecode})
  }
  
 
 
  renderCheck(item) { 
    let {editData}=this.props  
    if (item.id == editData.user.countryCode)
      return <Icon style={styles.icon} name="md-checkmark" />;
  }
  selectedItem(id){
    this.props.countryCodeChanged(id)
    this.setState({isdisplay:'none'})
  }
  render() {
   let {isdisplay,phonecode}=this.state
   let {editData}=this.props
    return (
     <View >
         <Item  style={{ margin: 10 }}>
            <Item floatingLabel style={{width:"25%"}}>
                <Label>Code</Label>
                <Input
                value={editData.phonecodes[editData.user.countryCode].phonecode}
                />                                
            </Item>
            <TouchableOpacity
            onPress={()=>this.setState({isdisplay:isdisplay!="flex"?"flex":"none"})}
            style={{width:30,height:20,marginRight:10,paddingTop:5}}
            >
            <Image
            source={{uri:this.getUrl(editData.phonecodes[editData.user.countryCode].iso)}}
            style={{width:30,height:20}}                            
            />   
            </TouchableOpacity>
            <Item floatingLabel style={{width:"60%" }}>
                <Label>Phone</Label>
                <Input
                value={editData.user.phone} 
                />
            </Item>
        </Item>        
        <List
            style={{display:isdisplay}}
            dataArray={editData.phonecodes}
            renderRow={item => (
            <ListItem button onPress={() =>this.selectedItem(item.id-1)}>
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
      
     </View>
     
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




const styles = StyleSheet.create({
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
