'use strict'
import {
    Button,
    Image,
    Text, TouchableOpacity,
    View,
    StyleSheet,
    ViewPagerAndroid,
    Dimensions,
} from 'react-native';
import React, {Component} from 'react';

var deviceWidth = Dimensions.get('window').width;
var swiperHeight = deviceWidth * 240 / 480

import Swiper from 'react-native-swiper'
import request from "../engine/Net";


export default class HomeTab extends Component {
    constructor() {
        super();
        this.state = {
            scrollEnabled: true,
            body: null,
            page: 0,
        }

    }

    onPageSelected(e) {
        console.log("onPageSelected::" + e.nativeEvent.position)
        this.setState({page: e.nativeEvent.position});
    }

    getHomeData() {
        var param = new Map()
        param.set('useClientVersion', '1')
        param.set('terminalType', '2')
        return request('more/index', param)
    }

    componentDidMount() {
        this.getHomeData().then((responseJson) => {
            console.log("then::responseJson" + JSON.stringify(responseJson))
            this.setState({
                body: responseJson.body,
            })
        })
    }

    render() {
        let {body} = this.state
        if (body === null) {
            return (<Text>加载中。。。</Text>)
        }
        let pages = [];
        let length = body.picList.length;
        for (let i = 0; i < length; i++) {
            pages.push(
                <Image
                    key={i}
                    resizeMode="stretch"
                    style={styles.image}
                    source={{uri: body.picList[i].picUrl}}
                />
            );
        }
        return (
            <View style={styles.container}>
                <View style={styles.swiperWrapper}>
                    <Swiper
                        horizontal={true}
                        autoplay={true}
                        dot={<View style={{
                            backgroundColor: '#FFFFFF',
                            width: 6,
                            height: 6,
                            borderRadius: 3,
                            marginLeft: 5,
                            marginRight: 5,
                            marginTop: 3,
                        }}/>}
                        activeDot={<View style={{
                            backgroundColor: '#FFFFFF',
                            width: 9,
                            height: 9,
                            borderRadius: 4.5,
                            marginLeft: 5,
                            marginRight: 5,
                            marginTop: 3,
                        }}/>}>
                        {pages}
                    </Swiper>
                </View>
                <Text>Footer..</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: deviceWidth,
        height: swiperHeight,
    },
    swiperWrapper: {
        width: deviceWidth,
        height: swiperHeight,
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    pageStyle: {
        alignItems: 'center',
        padding: 20,
      }
      
});