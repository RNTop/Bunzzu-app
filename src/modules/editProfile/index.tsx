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
import EidtInput from "../../components/EidtInput"
import SubmitButton from "../../components/SubmitButton"
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
    mobilevalidate(text) {
        const reg = /^[0]?[789]\d{9}$/;
        if (reg.test(text) === false) {
          //  mobilevalidate: false,
          return false;
        } else {          
          return true;
        }
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
                        <Text style={styles.subTitle}>{Strings.BasicInfo}</Text>
                        <View style={styles.cardTheme}>                           
                            <EidtInput
                                name={Strings.Name}
                                value={user.name}
                                isValid={minLength3(user.name)}
                                onChangeText={(text) => this.userInfoChanged(Strings.Name, text)}
                            />
                            <View style={styles.countryPicker} >
                                <EidtInput
                                    name={Strings.Code}
                                    width={"25%"}
                                    value={phonecodes[user.countryCode-1].phonecode}
                                    onChangeText={(text) => console.log(text)}
                                />
                                <TouchableOpacity
                                    onPress={() => NavigationService.navigate("SelectCountry")}
                                    style={{ width: 30, height: 20, marginRight: 10, paddingTop: 5 }}
                                >
                                    <Image
                                        source={{ uri: this.getUrl(phonecodes[user.countryCode-1].iso) }}
                                        style={{ width: 30, height: 20 }}
                                    />
                                </TouchableOpacity>
                                <EidtInput
                                    name={Strings.Phone}
                                    width={"60%"}
                                    value={user.phone}
                                    onChangeText={(text) => this.userInfoChanged(Strings.Phone, text)}
                                />
                            </View>
                            <EidtInput
                                name={Strings.Email}
                                value={user.email}
                                isValid={validemail(user.email)}
                                onChangeText={(text) => this.userInfoChanged(Strings.Email, text)}
                            />

                            {
                                (minLength3(user.name)==undefined&&validemail(user.email)==undefined&&this.mobilevalidate(user.phone)==true)?<SubmitButton
                                                submitOnPress={() => this.basicInfoSubmitConfirm()}
                                                submiting={isBasicInfoSubmiting}
                                                initStatus={basic}
                                                cancelOnPress={() => this.props.EditUserBasicInfo(this.props.UserInfo)}
                                                />:<Text></Text>
                            }
                            
                        </View>
                        <Text style={styles.subTitle}>{Strings.Location}</Text>
                        <View style={styles.cardTheme}>                           
                            <EidtInput
                                name={Strings.Address}
                                value={user.address}
                                isValid={minLength3(user.address)}
                                onChangeText={(text) => this.userInfoChanged(Strings.Address, text)}
                            />
                            <EidtInput
                                name={Strings.PostCode}
                                value={user.postcode}
                                isValid={required(user.postcode)}
                                onChangeText={(text) => this.userInfoChanged(Strings.PostCode, text)}
                            />
                            {
                              (minLength3(user.address)==undefined&&required(user.postcode)==undefined)?<SubmitButton
                                submitOnPress={() => this.locationInfoSubmitConfirm()}
                                submiting={isLocationInfoSubmiting}
                                initStatus={location}
                                cancelOnPress={() => this.props.EditUserBasicInfo(this.props.UserInfo)}
                                />:<Text></Text>
                            }
                            
                        </View>
                        <Text style={styles.subTitle}>{Strings.Social}</Text>
                        <View style={styles.cardTheme}>                            
                            <EidtInput
                                name={Strings.Website}
                                value={user.website}
                                isValid={vaildWebsite(user.website)}
                                onChangeText={(text) => this.userInfoChanged(Strings.Website, text)}
                            />
                            <EidtInput
                                name={Strings.Facebook}
                                value={user.facebook}
                                isValid={vaildFacebook(user.facebook)}
                                onChangeText={(text) => this.userInfoChanged(Strings.Facebook, text)}
                            />
                            <EidtInput
                                name={Strings.Twitter}
                                value={user.twitter}
                                isValid={vaildTwitter(user.twitter)}
                                onChangeText={(text) => this.userInfoChanged(Strings.Twitter, text)}
                            />
                            <EidtInput
                                name={Strings.Instagram}
                                value={user.instagram}
                                isValid={vaildInstagram(user.instagram)}
                                onChangeText={(text) => this.userInfoChanged(Strings.Instagram, text)}
                            />
                            <EidtInput
                                name={Strings.Google}
                                value={user.google}
                                isValid={vaildGoogle(user.google)}
                                onChangeText={(text) => this.userInfoChanged(Strings.Google, text)}
                            />
                            {
                                (vaildWebsite(user.website)==undefined&&vaildFacebook(user.facebook)&&vaildTwitter(user.twitter)&&vaildInstagram(user.instagram)&&vaildGoogle(user.google))?
                                <SubmitButton
                                submitOnPress={() => this.socialInfoSubmitConfirm()}
                                submiting={isSocialInfoSubmiting}
                                initStatus={social}
                                cancelOnPress={() => this.props.EditUserBasicInfo(this.props.UserInfo)}
                            />:<Text></Text>
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
