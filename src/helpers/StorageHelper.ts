import { AsyncStorage } from "react-native";

const StorageKeys = {
  USER_ID: "userId"
};

async function saveItem(key, value) {
  try {
    await AsyncStorage.setItem(key, value).then();
    return true;
  } catch (error) {
    console.log("Error saving data");
    return false;
  }
}

async function removeItem(key) {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (exception) {
    return false;
  }
}

async function getItem(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

export default {
  removeItem,
  StorageKeys,
  getItem,
  saveItem
};
