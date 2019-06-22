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
const validemail = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? "Invalid email address"
        : undefined;
const alphaNumeric = value =>
    value && /[^a-zA-Z0-9 ]/i.test(value)
        ? "Only alphanumeric characters"
        : undefined;
const vaildWebsite = value => value.includes("http://") ? undefined : value.includes("https://") ? undefined : "Invaild Website URL";
const vaildFacebook = value => value.includes("https://www.facebook.com/") ? undefined : "Invaild Facebook URL";
const vaildInstagram = value => value.includes("https://www.instagram.com/") ? undefined : "Invaild Instagram URL";
const vaildTwitter = value => value.includes("https://twitter.com/") ? undefined : "Invaild Twitter URL";
const vaildGoogle = value => value.includes("https://www.google.com") ? undefined : "Invaild Google URL";


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
        let { editData, EditUserBasicInfo, UserInfo } = this.props;
        if (!editData.isCompleted) EditUserBasicInfo(UserInfo)
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
    userInfoChanged(key, value) {
        let newUserInfo = this.props.editData.user
        let NewInitStatus = this.props.editData.initStatus

        switch (key) {
            case Strings.Name:
                newUserInfo.name = value;
                NewInitStatus.basic = false;
                break;
            case Strings.Code:
                newUserInfo.code = value;
                NewInitStatus.basic = false;
                break;
            case Strings.Phone:
                newUserInfo.phone = value;
                NewInitStatus.basic = false;
                break;
            case Strings.Email:
                newUserInfo.email = value;
                NewInitStatus.basic = false;
                break;
            case Strings.Address:
                newUserInfo.address = value;
                NewInitStatus.location = false;
                break;
            case Strings.PostCode:
                newUserInfo.postcode = value;
                NewInitStatus.location = false;
                break;
            case Strings.Website:
                newUserInfo.website = value;
                NewInitStatus.social = false;
                break;
            case Strings.Facebook:
                newUserInfo.facebook = value;
                NewInitStatus.social = false;
                break;
            case Strings.Twitter:
                newUserInfo.twitter = value;
                NewInitStatus.social = false;
                break;
            case Strings.Instagram:
                newUserInfo.instagram = value;
                NewInitStatus.social = false;
                break;
            case Strings.Google:
                newUserInfo.google = value;
                NewInitStatus.social = false;
                break;
            default:
                break;
        }
        this.props.userInfoChanged(newUserInfo, NewInitStatus)
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
        let { user } = this.props.editData
        this.props.basicInfoSubmit(user)
    }
    socialInfoSubmitConfirm() {
        let { user } = this.props.editData
        this.props.socialInfoSubmit(user)
    }
    locationInfoSubmitConfirm() {
        let { user } = this.props.editData
        this.props.locationInfoSubmit(user)

    }
    ValidationInput(name, value, isValid) {
        return (
            <Item fixedLabel style={{ margin: 10, borderBottomColor: isValid == undefined ? Color.BACKGROUND_GRAY : "red" }}>
                <Item floatingLabel style={{ borderBottomColor: Color.BACKGROUND_WHITE }}>
                    <Label style={{fontSize:14}}>{name}</Label>
                    <Input
                        style={{fontSize:14}}
                        onChangeText={(text) => this.userInfoChanged(name, text)}
                        value={value}
                    />
                </Item>
                {
                    isValid == "" ? <Text></Text> : <Text style={styles.invalidTxt}>{isValid}</Text>
                }
            </Item>
        )
    }

    public render() {
        let { initStatus, user, phonecodes, isBasicInfoSubmiting, isLocationInfoSubmiting, isSocialInfoSubmiting, isChangePasswordSubmiting } = this.props.editData
        let { basic, social, location } = initStatus

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
                            {this.ValidationInput(Strings.Name, user.name, minLength3(user.name))}
                            <Item style={{ margin: 10 }}>
                                <Item floatingLabel style={{ width: "25%", borderBottomColor: Color.BACKGROUND_WHITE }}>
                                    <Label style={{fontSize:14}}>{Strings.Code}</Label>
                                    <Input
                                        value={phonecodes[user.countryCode].phonecode}
                                        style={{fontSize:14,color:Color.PRIMARY_COLOR}}
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
                                <Item floatingLabel style={{ width: "60%", borderBottomColor: Color.BACKGROUND_WHITE }}>
                                    <Label style={{fontSize:14}}>{Strings.Phone}</Label>
                                    <Input
                                        style={{fontSize:14}}
                                        onChangeText={(text) => this.userInfoChanged(Strings.Phone, text)}
                                        value={user.phone}
                                    />
                                </Item>
                            </Item>
                            {this.ValidationInput(Strings.Email, user.email, validemail(user.email))}
                            <TouchableOpacity
                                style={styles.submitBtn}
                                onPress={() => this.basicInfoSubmitConfirm()}
                            >
                                {isBasicInfoSubmiting != true ?
                                    <Text style={styles.submitTxt}>{Strings.Submit}</Text> :
                                    <UIActivityIndicator color={'white'} size={20} />}
                            </TouchableOpacity>                           
                            {
                                basic != true ?
                                    <View style={styles.cancelNav}>
                                        <Text style={styles.orTxt}>{Strings.OR}</Text>
                                        <Text style={styles.cancelTxt}
                                            onPress={() => this.props.EditUserBasicInfo(this.props.UserInfo)}
                                        >{Strings.Cancel}</Text>
                                    </View> : <View style={styles.cancelNav}></View>
                             }
                        </View>
                        <View style={styles.cardTheme}>
                            <Text style={styles.subTitle}>{Strings.Location}</Text>
                            {this.ValidationInput(Strings.Address, user.address, minLength3(user.address))}
                            {this.ValidationInput(Strings.PostCode, user.postcode, required(user.postcode))}
                            <TouchableOpacity
                                style={styles.submitBtn}
                                onPress={() => this.locationInfoSubmitConfirm()}
                            >
                                {isLocationInfoSubmiting != true ?
                                    <Text style={styles.submitTxt}>{Strings.Submit}</Text> :
                                    <UIActivityIndicator color={'white'} size={20} />}
                            </TouchableOpacity>
                            {
                                location != true ?
                                    <View style={styles.cancelNav}>
                                        <Text style={styles.orTxt}>{Strings.OR}</Text>
                                        <Text style={styles.cancelTxt}
                                            onPress={() => this.props.EditUserBasicInfo(this.props.UserInfo)}
                                        >{Strings.Cancel}</Text>
                                    </View> : <View style={styles.cancelNav}></View>
                             }                            
                        </View>
                        <View style={styles.cardTheme}>
                            <Text style={styles.subTitle}>{Strings.Social}</Text>
                            {this.ValidationInput(Strings.Website, user.website, vaildWebsite(user.website))}
                            {this.ValidationInput(Strings.Facebook, user.facebook, vaildFacebook(user.facebook))}
                            {this.ValidationInput(Strings.Twitter, user.twitter, vaildTwitter(user.twitter))}
                            {this.ValidationInput(Strings.Instagram, user.instagram, vaildInstagram(user.instagram))}
                            {this.ValidationInput(Strings.Google, user.google, vaildGoogle(user.google))}
                            <TouchableOpacity
                                style={styles.submitBtn}
                                onPress={() => this.socialInfoSubmitConfirm()}
                            >
                                {isSocialInfoSubmiting != true ?
                                    <Text style={styles.submitTxt}>{Strings.Submit}</Text> :
                                    <UIActivityIndicator color={'white'} size={20} />}
                            </TouchableOpacity>
                            {
                                social != true ?
                                    <View style={styles.cancelNav}>
                                        <Text style={styles.orTxt}>{Strings.OR}</Text>
                                        <Text style={styles.cancelTxt}
                                            onPress={() => this.props.EditUserBasicInfo(this.props.UserInfo)}
                                        >{Strings.Cancel}</Text>
                                    </View> : <View style={styles.cancelNav}></View>
                             }                           
                        </View>
                        <TouchableOpacity
                            style={styles.changePasswordBtn}
                            onPress={() => this.openPasswordModal()}
                        >
                            {isChangePasswordSubmiting != true ?
                                <Text style={styles.submitTxt}>{Strings.ChangePassword}</Text> :
                                <UIActivityIndicator color={'white'} size={20} />}
                        </TouchableOpacity>
                    </View>
                </Content>
                <Modal
                    style={[styles.modal]}
                    backdrop={false}
                    ref={c => {
                        this.modal1 = c;
                    }}
                    swipeToClose={this.state.swipeToClose}
                >
                    <View style={[styles.modal1]}>
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
                    </View>
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
