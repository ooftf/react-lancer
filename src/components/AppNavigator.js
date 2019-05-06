/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import {
    StackNavigator,
} from 'react-navigation';
import {
    StyleSheet,
    Image,TouchableOpacity, 
} from 'react-native';

import ShowScreen from "./ShowScreen"
import Main from "./Main"
import Logo from "./Logo";
import GuideScreen from "./GuideScreen";
import LoginScreen from "./LoginScreen";
import HomeScreen from "./HomeScreen";
import { createBottomTabNavigator, createAppContainer,createStackNavigator  } from 'react-navigation';
const AppNavigator = createStackNavigator({
    Main: {screen: Main},
    Show: {screen: ShowScreen},
    Logo: {screen: Logo},
    GuideScreen: {screen: GuideScreen},
    LoginScreen: {screen: LoginScreen},
    HomeScreen:{screen:HomeScreen}
}, {
    initialRouteName: 'Logo',
    headerMode: 'screen',
    navigationOptions: ({navigation}) =>{return{headerLeft: (
        <TouchableOpacity
            onPress={() => {
                navigation.goBack()
            }}>
            <Image
                resizeMode="center"
                style={styles.headerLeft}
                source={require("../image/left_arrow.png")}

            />
        </TouchableOpacity>
    ),
        headerStyle: {
            backgroundColor: '#2ea7e0',
        }}

    },

})
export default createAppContainer(AppNavigator);
const styles = StyleSheet.create({
    headerLeft: {
        height: 50,
        width: 50,
        padding: 10
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
