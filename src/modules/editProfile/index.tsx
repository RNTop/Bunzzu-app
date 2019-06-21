import React, {
    Component
} from "react";
import {
    Text,
    View,
    TouchableOpacity,
    ImageBackground,
    StatusBar,
    Image

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
        let { password } = this.state
        if (password == "") return alert("Please Enter Password")
        let {user}=this.props.editData
        let eidtUser=user
        eidtUser.password=password
        this.props.basicInfoSubmit(eidtUser)
    }
    public render() {
        let { user, phonecodes ,isBasicInfoSubmiting} = this.props.editData
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
                    <View style={styles.cardTheme}>
                        <Text style={styles.subTitle}>Basic Info</Text>
                        <Item floatingLabel style={{ margin: 10 }}>
                            <Label>{Strings.Name}</Label>
                            <Input
                                onChangeText={(text) => this.props.nameChanged(text)}
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
                                    onChangeText={(text) => this.props.phoneChanged(text)}
                                    value={user.phone}
                                />
                            </Item>
                        </Item>
                        <Item floatingLabel style={{ margin: 10 }}>
                            <Label>{Strings.Email}</Label>
                            <Input
                                onChangeText={(text) => this.props.emailChanged(text)}
                                value={user.email}
                            />
                        </Item>
                        <Item floatingLabel style={{ margin: 10 }}>
                            <Label>{Strings.Password}</Label>
                            <Input
                                value={password}
                                secureTextEntry={true}
                                onFocus={() => this.openPasswordModal()}
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
