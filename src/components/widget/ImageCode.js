import React, {Component} from 'react';
import {ActivityIndicator, Image, StyleSheet, TouchableOpacity,} from 'react-native';
import request from "../engine/Net";

export default class ImageCode extends Component {
    constructor() {
        super();
        this.state = {
            uuid: null,
            imageBase64: null,
            state: 2//0加载中   1 加载完成；2:加载失败
        }
    }

    getImage() {
        if (this.state.state == 0) return
        this.setState({
            uuid: null,
            imageBase64: null,
            state: 0
        })
        return request('system/identify')
            .then((responseJson) => {
                console.log("responseJsonresponseJson" + responseJson.time)
                this.setState({
                    uuid: responseJson.body.uuid,// var byte = new Buffer ( responseJson.body.indentify , 'base64' )
                    imageBase64: responseJson.body.indentify,
                    state: 1
                })
                return responseJson
            })
    }

    componentDidMount() {
        this.getImage();
    }

    render() {
        if (this.state.state == 0) {
            return (<ActivityIndicator style={styles.imageCode} animating={true}/>)
        } else if (this.state.state == 1) {
            return (
                <TouchableOpacity
                    onPress={() => this.getImage()}>
                    <Image
                        resizeMode="contain" style={styles.imageCode}
                        source={{uri: "data:image/png;base64," + this.state.imageBase64}}/>
                </TouchableOpacity>)
        } else if (this.state.state == 2) {
            return (
                <TouchableOpacity
                    onPress={() => this.getImage()}>
                    <Image
                        resizeMode="contain" style={styles.imageCode}
                        source={require('../../image/retry.png')}/>
                </TouchableOpacity>)
        }
    }
}
const styles = StyleSheet.create({
    imageCode: {
        marginRight: 15,
        width: 100,
        height: 45,
    }
});