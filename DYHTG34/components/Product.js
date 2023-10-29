import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import { Image } from "expo-image";
import React from "react";
import PropTypes from 'prop-types';


const Product = ({ product, available}) => {
    return (
        <SafeAreaView style={styles.product}>
            <View style={styles.productChild}/>
            <View style={styles.frameParent}>
                <View style={styles.frame}>
                    <View style={styles.frame1}>
                        <Text style={[styles.inStock, styles.textTypo]}>{available}</Text>
                    </View>
                    <View style={styles.frame2}>
                        <View style={styles.frame3}>
                            <Text style={[styles.rickenbacker, styles.rickenbackerTypo]}>
                                {product.BrandName}
                            </Text>
                            <Text style={styles.p12StringJetglo}>{product.ItemName}</Text>
                        </View>
                        <View style={[styles.frame4, styles.frameLayout2]}>
                            <View style={[styles.frame5, styles.frameLayout2]}>
                                <Text style={[styles.aFavouriteModel, styles.textFlexBox]}>
                                    {product.description}
                                </Text>
                            </View>
                            <View style={[styles.frame6, styles.frame6Position]}>
                                <Image
                                    style={[styles.image6Icon, styles.frame6Position]}
                                    contentFit="cover"
                                    source={product.PictureMain}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={[styles.frame7, styles.frameLayout1]}>
                    <View style={[styles.frame8, styles.frameLayout]}>
                        <View style={[styles.frame9, styles.frameLayout]}>
                            <Image
                                style={styles.infoCircleIcon}
                                contentFit="cover"
                                source={require("../assets/info-circle.png")}
                            />
                            <Text style={styles.findOutMore}>Find out More</Text>
                        </View>
                    </View>
                    <View style={[styles.frame10, styles.textPosition]}>
                        <Text style={[styles.text, styles.textPosition]}>{product.SalesPrice}</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

Product.propTypes = {
    product: PropTypes.object.isRequired,
    available: PropTypes.string.isRequired,
}

const styles = StyleSheet.create({
    textTypo: {
        fontFamily: "Helvetica Neue",
        fontWeight: "600",
        textAlign: "left",
    },
    rickenbackerTypo: {
        textAlign: "center",
        fontFamily: "Helvetica Neue",
        position: "absolute",
    },
    frameLayout2: {
        width: 283,
        position: "absolute",
        overflow: "hidden",
    },
    textFlexBox: {
        alignItems: "center",
        display: "flex",
        color: "black"
    },
    frame6Position: {
        height: 293,
        top: 0,
        position: "absolute",
    },
    frameLayout1: {
        width: 167,
        overflow: "hidden",
    },
    frameLayout: {
        height: 15,
        position: "absolute",
        overflow: "hidden",
    },
    textPosition: {
        height: 40,
        top: 0,
        position: "absolute",
    },
    productChild: {
        top: 85,
        borderRadius: 20,
        backgroundColor: "white",
        width: 301,
        height: 705,
        left: 29,
        position: "absolute",
    },
    inStock: {
        fontSize: 30,
        color: "red",
        textAlign: "left",
        left: 20,
        top: 0,
        position: "absolute",
    },
    frame1: {
        top: 454,
        left: 121,
        width: 99,
        height: 24,
        position: "absolute",
        overflow: "hidden",
    },
    rickenbacker: {
        top: 29,
        fontSize: 15,
        color: "grey",
        left: 0,
        width: 341,
    },
    p12StringJetglo: {
        fontSize: 24,
        color: "black",
        textAlign: "center",
        fontFamily: "Helvetica Neue",
        left: 0,
        top: 0,
        width: 341,
        position: "absolute",
    },
    frame3: {
        height: 47,
        left: 0,
        top: 0,
        width: 341,
        position: "absolute",
        overflow: "hidden",
    },
    aFavouriteModel: {
        left: 1,
        fontSize: 12,
        justifyContent: "center",
        width: 282,
        textAlign: "center",
        fontFamily: "Helvetica Neue",
        position: "absolute",
        top: 0,
    },
    frame5: {
        top: 302,
        height: 33,
        left: 0,
    },
    image6Icon: {
        width: 113,
        left: 20,
    },
    frame6: {
        left: 75,
        width: 133,
        overflow: "hidden",
    },
    frame4: {
        top: 81,
        height: 335,
        left: 29,
    },
    frame2: {
        height: 416,
        left: 0,
        top: 0,
        width: 341,
        position: "absolute",
        overflow: "hidden",
    },
    frame: {
        height: 478,
        left: 0,
        top: 0,
        width: 341,
        position: "absolute",
        overflow: "hidden",
    },
    infoCircleIcon: {
        top: 2,
        left: 77,
        width: 12,
        height: 12,
        position: "absolute",
    },
    findOutMore: {
        fontSize: 13,
        fontWeight: "100",
        fontFamily: "Helvetica Neue",
        color: "#040404",
        textAlign: "left",
        left: 0,
        top: 0,
        position: "absolute",
    },
    frame9: {
        left: 8,
        width: 89,
        top: 0,
    },
    frame8: {
        top: 118,
        left: 35,
        width: 97,
    },
    text: {
        left: 21,
        fontSize: 32,
        width: 146,
        alignItems: "center",
        display: "flex",
        color: "black",
        textAlign: "left",
        fontFamily: "Helvetica Neue",
        fontWeight: "600",
    },
    frame10: {
        width: 167,
        overflow: "hidden",
        left: 0,
    },
    frame7: {
        top: 516,
        left: 87,
        height: 133,
        position: "absolute",
    },
    frameParent: {
        top: 17,
        left: 9,
        height: 649,
        width: 341,
        position: "absolute",
    },
    product: {
        backgroundColor: "cyan",
        width: 360,
        height: 800,
        overflow: "hidden",
    },
});

export default Product;
