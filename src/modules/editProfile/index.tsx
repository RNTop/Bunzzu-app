import React, {
    Component
} from "react";
import {
    Text,
    View,
    TouchableOpacity,
    ImageBackground,
    StatusBar,
    Image,
    Dimensions
} from "react-native";
import { DefaultStyles } from "../../styles/styles"
import { Icon, Header, Container, Left, Content, Col, Title, Item, Label, Input, Thumbnail, Button } from 'native-base'
import Modal from "react-native-modalbox";
import {
	SkypeIndicator,
	UIActivityIndicator
} from 'react-native-indicators';
import UserModal from "@components/UserModal"
import Color from "../../styles/colors"
import styles from "./styles"
import Strings from "../../constant/strings"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from "../../redux/action.js"
import CustomCountryPicker from '@components/CustomCountryPicker'
import NavigationService from "../../navigation/NavigationService";

const required = value => (value ? undefined : "Required");
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
const maxLength15 = maxLength(15);
const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;
const minLength3 = minLength(3);
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;
const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? "Only alphanumeric characters"
    : undefined;


class EditProfilePage extends Component {
    state = {
        isOpen: false,
        isDisabled: false,
        swipeToClose: true,
        password: "",
        confirmpassword: "",
        newpassword: "",
    };
    componentDidMount() {
        this.props.EditUserBasicInfo(this.props.UserInfo);
    }
    openPasswordModal() {
        this.modal1.open();
    }
    closePasswordModal() {
        this.modal1.close();
    }
    getUrl(iso: string): string {
        return (
            "https://www.digizonetech.co.uk/restaurants/API/flags/" +
            iso.toLowerCase() +
            ".png"
        );
    }
    userInfoChanged(key,value){
     let newUserInfo=this.props.editData.user     
     switch (key)  {
         case Strings.Name:
             newUserInfo.name=value;
             break;
             case Strings.Code:
             newUserInfo.code=value;
             break;
             case Strings.Phone:
             newUserInfo.phone=value;
             break;
             case Strings.Email:
             newUserInfo.email=value;
             break;
             case Strings.Address:
             newUserInfo.address=value;
             break;
             case Strings.PostCode:
             newUserInfo.postcode=value;
             break;
             case Strings.Website:
             newUserInfo.website=value;
             break;
             case Strings.Facebook:
             newUserInfo.facebook=value;
             break;
             case Strings.Twitter:
             newUserInfo.twitter=value;
             break;
             case Strings.Instagram:
             newUserInfo.instagram=value;
             break;
             case Strings.Google:
             newUserInfo.google=value;
             break;     
         default:
             break;
     }
     this.props.userInfoChanged(newUserInfo)
    }
    checkPassword() {
        this.closePasswordModal()
        let { confirmpassword, newpassword } = this.state
        if (confirmpassword == "") return alert("Please Enter Password")
        if (confirmpassword != newpassword) {
            alert(Strings.IncorrectPassword)
            this.setState({ password: "" })
        } else {
            this.setState({ password: newpassword })
        }

    }
    basicInfoSubmitConfirm() {      
        let {user}=this.props.editData       
        this.props.basicInfoSubmit(user)
    }
    socialInfoSubmitConfirm(){
        let {user}=this.props.editData
        this.props.socialInfoSubmit(user)
    }
    locationInfoSubmitConfirm(){
        let {user}=this.props.editData
        this.props.locationInfoSubmit(user)

    }
    public render() {
        let { user, phonecodes ,isBasicInfoSubmiting,isLocationInfoSubmiting, isSocialInfoSubmiting, isChangePasswordSubmiting} = this.props.editData
        let { newpassword, confirmpassword, password } = this.state
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
                        onPress={() => NavigationService.goBack()}
                    />
                    <Text style={DefaultStyles.title}>{Strings.EditProfile}</Text>
                </View>
                <Content>
                    <View style={styles.container}>
                        <View style={styles.cardTheme}>
                            <Text style={styles.subTitle}>{Strings.BasicInfo}</Text>
                            <Item floatingLabel style={{ margin: 10 }}>
                                <Label>{Strings.Name}</Label>
                                <Input
                                    onChangeText={(text) => this.userInfoChanged(Strings.Name,text)}
                                    value={user.name}
                                />
                            </Item>
                            <Item style={{ margin: 10 }}>
                                <Item floatingLabel style={{ width: "25%" }}>
                                    <Label>{Strings.Code}</Label>
                                    <Input
                                        value={phonecodes[user.countryCode].phonecode}
                                    />
                                </Item>
                                <TouchableOpacity
                                    onPress={() => NavigationService.navigate("SelectCountry")}
                                    style={{ width: 30, height: 20, marginRight: 10, paddingTop: 5 }}
                                >
                                    <Image
                                        source={{ uri: this.getUrl(phonecodes[user.countryCode].iso) }}
                                        style={{ width: 30, height: 20 }}
                                    />
                                </TouchableOpacity>
                                <Item floatingLabel style={{ width: "60%" }}>
                                    <Label>{Strings.Phone}</Label>
                                    <Input
                                        onChangeText={(text) => this.userInfoChanged(Strings.Phone,text)}
                                        value={user.phone}
                                    />
                                </Item>
                            </Item>
                            <Item floatingLabel style={{ margin: 10 }}>
                                <Label>{Strings.Email}</Label>
                                <Input
                                    onChangeText={(text) => this.userInfoChanged(Strings.Email,text)}
                                    value={user.email}
                                />
                            </Item>                        
                            <TouchableOpacity
                                style={styles.submitBtn}
                                onPress={() => this.basicInfoSubmitConfirm()}
                            >
                            {isBasicInfoSubmiting!=true? 
                                <Text style={styles.submitTxt}>{Strings.Submit}</Text>:
                                <UIActivityIndicator color={'white'} size={20} />}
                            </TouchableOpacity> 
                            <Text style={styles.orTxt}>{Strings.OR}</Text>                       
                            <Text 
                            style={styles.cancelTxt}
                            onPress={() => this.props.EditUserBasicInfo(this.props.UserInfo)}
                            >{Strings.Cancel}</Text>
                            

                        </View>
                        <View style={styles.cardTheme}>
                            <Text style={styles.subTitle}>{Strings.Location}</Text>
                            <Item floatingLabel style={{ margin: 10 }}>
                                <Label>{Strings.Address}</Label>
                                <Input
                                    onChangeText={(text) => this.userInfoChanged(Strings.Address,text)}
                                    value={user.address}
                                />
                            </Item>                       
                            <Item floatingLabel style={{ margin: 10 }}>
                                <Label>{Strings.PostCode}</Label>
                                <Input
                                    onChangeText={(text) => this.userInfoChanged(Strings.PostCode,text)}
                                    value={user.postcode}
                                />
                            </Item>                        
                            <TouchableOpacity
                                style={styles.submitBtn}
                                onPress={() => this.locationInfoSubmitConfirm()}
                            >
                            {isLocationInfoSubmiting!=true? 
                                <Text style={styles.submitTxt}>{Strings.Submit}</Text>:
                                <UIActivityIndicator color={'white'} size={20} />}
                            </TouchableOpacity> 
                            <Text style={styles.orTxt}>{Strings.OR}</Text>                       
                            <Text 
                            style={styles.cancelTxt}
                            onPress={() => this.props.EditUserBasicInfo(this.props.UserInfo)}
                            >{Strings.Cancel}</Text>                      

                        </View>
                        <View style={styles.cardTheme}>
                            <Text style={styles.subTitle}>{Strings.Social}</Text>
                            <Item floatingLabel style={{ margin: 10 }}>
                                <Label>{Strings.Website}</Label>
                                <Input
                                    onChangeText={(text) => this.userInfoChanged(Strings.Website,text)}
                                    value={user.website}
                                />
                            </Item>                       
                            <Item floatingLabel style={{ margin: 10 }}>
                                <Label>{Strings.Facebook}</Label>
                                <Input
                                    onChangeText={(text) => this.userInfoChanged(Strings.Facebook,text)}
                                    value={user.facebook}
                                />
                            </Item>
                            <Item floatingLabel style={{ margin: 10 }}>
                                <Label>{Strings.Twitter}</Label>
                                <Input
                                    onChangeText={(text) => this.userInfoChanged(Strings.Twitter,text)}
                                    value={user.twitter}
                                />
                            </Item>                       
                            <Item floatingLabel style={{ margin: 10 }}>
                                <Label>{Strings.Instagram}</Label>
                                <Input
                                    onChangeText={(text) => this.userInfoChanged(Strings.Instagram,text)}
                                    value={user.instagram}
                                />
                            </Item> 
                            <Item floatingLabel style={{ margin: 10 }}>
                                <Label>{Strings.Google}</Label>
                                <Input
                                    onChangeText={(text) => this.userInfoChanged(Strings.Google,text)}
                                    value={user.google}
                                />
                            </Item>                        
                            <TouchableOpacity
                                style={styles.submitBtn}
                                onPress={() => this.socialInfoSubmitConfirm()}
                            >
                            {isSocialInfoSubmiting!=true? 
                                <Text style={styles.submitTxt}>{Strings.Submit}</Text>:
                                <UIActivityIndicator color={'white'} size={20} />}
                            </TouchableOpacity> 
                            <Text style={styles.orTxt}>{Strings.OR}</Text>                       
                            <Text 
                            style={styles.cancelTxt}
                            onPress={() => this.props.EditUserBasicInfo(this.props.UserInfo)}
                            >{Strings.Cancel}</Text>                

                        </View>
                        <TouchableOpacity
                                style={styles.changePasswordBtn}
                                onPress={() => this.openPasswordModal()}
                            >
                            {isChangePasswordSubmiting!=true? 
                                <Text style={styles.submitTxt}>{Strings.ChangePassword}</Text>:
                                <UIActivityIndicator color={'white'} size={20} />}                            
                        </TouchableOpacity>
                    </View>                                        
                </Content>
                <Modal
                    style={[styles.modal, styles.modal1]}
                    backdrop={false}
                    ref={c => {
                        this.modal1 = c;
                    }}
                    swipeToClose={this.state.swipeToClose}
                >
                    <Icon
                        type={"AntDesign"}
                        name={"closecircleo"}
                        style={styles.closeBtn}
                        onPress={() => this.closePasswordModal()}
                    />
                    <Item floatingLabel style={{ margin: 10 }}>
                        <Label>{Strings.NewPassword}</Label>
                        <Input
                            secureTextEntry={true}
                            onChangeText={(newpassword) => this.setState({ newpassword })}
                        />
                    </Item>
                    <Item floatingLabel style={{ margin: 10 }}>
                        <Label>{Strings.ConfirmPassword}</Label>
                        <Input
                            secureTextEntry={true}
                            onChangeText={(confirmpassword) => this.setState({ confirmpassword })}
                        />
                    </Item>
                    <TouchableOpacity
                        style={styles.submitBtn}
                        onPress={() => this.checkPassword()}
                    >           
                    <Text style={styles.submitTxt}>{Strings.Submit}</Text>
                    </TouchableOpacity>
                </Modal>

            </Container>
        );
    }
}
const mapStateToProps = ({ auth, edit }) => {
    return {
        UserInfo: auth.user,
        editData: edit
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(ActionCreators, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(EditProfilePage)
