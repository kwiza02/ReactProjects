//Utils

import NetInfo from "@react-native-community/netinfo";

import { Alert } from "react-native";

export default class Utils {

static async isNetworkAvailable() {
    const response = await NetInfo.fetch();
    return response.isConnected;
}

    static DialogBox = (text, msg) => {
    setTimeout(() => {
        Alert.alert(text, msg)
    }, 0);
}

}