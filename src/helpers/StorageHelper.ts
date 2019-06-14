import AsyncStorage from '@react-native-community/async-storage';

const StorageKeys = {
  UserInfo: "UserInfo"   // This is same with the response of login API->id, masterId,username, appLogo ,email, response
};

const  saveItem =(key, value)=> {
  try {
     AsyncStorage.setItem(key, value).then();
    return true;
  } catch (error) {
    console.log("Error saving data");
    return false;
  }
}

const removeItem=async(key)=> {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (exception) {
    return false;
  }
}

const  getItem=async(key)=> {
  try {
    await AsyncStorage.getItem(key);
    return true;
  } catch (exception) {
    return false;
  }
}

export default {
  removeItem,
  StorageKeys,
  getItem,
  saveItem
};
