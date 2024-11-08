import React from "react";
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    ImageBackground,
} from "react-native";
import { Link} from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import RDim from "@/hooks/useDimensions";
import { ThemedText } from "@/components/ThemedText";
import useAPI from "../../hooks/useAPI";


const Card = ({ title, description, imageSource }) => {
    return (
        <View style={styles.card}>
            <ImageBackground
                source={imageSource}
                style={styles.imageBackground}
                imageStyle={styles.image}
            >
                <View style={styles.cardContent}>
                    <Text style={styles.title} numberOfLines={1}>{title}</Text>
                    <Text style={styles.description}>{description}</Text>
                </View>
            </ImageBackground>
        </View>
    );
};

export default function Adults() {
    const { allAdult, loading, error } = useAPI();
    return (
        <LinearGradient
            colors={["#355E3B", "#D6D6CA"]} // Define your gradient colors here
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 0.35 }}
            style={{ flex: 1, position: "relative" }}
        >
            <View style={styles.newBikes}>
                <View>
                    <ThemedText type="title" style={{ paddingHorizontal: 30 }}>
                        All Bikes
                    </ThemedText>
                </View>
                <ScrollView showsVerticalScrollIndicator={true} style={styles.SView} contentContainerStyle={styles.scrollViewCon}>
                    {
                        allAdult.map((bike, index) => {

                            return (
                                <Link
                                    key={index}
                                    href={{
                                        pathname: '/preview',
                                        params: { ...bike }
                                    }}
                                    style={styles.card}
                                >
                                    <Card
                                        title={bike.bike_name}
                                        description="see details"
                                        imageSource={{ uri: bike.bike_image_url }} // Replace with your image path
                                    />
                                </Link>
                            )
                        })
                    }
                </ScrollView>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    newBikes: {
        marginTop: 40,
        alignSelf: 'center'
      },
    
    
      SView: {
        height: RDim.height * 0.58,
        width: RDim.width,
        maxHeight: RDim.height * 0.58,
        alignSelf: 'center'
      },
      scrollViewCon: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
      card: {
        borderRadius: 8,
        margin: RDim.scale * 4,
        overflow: "hidden", // Ensures the border radius is applied
      },
      imageBackground: {
        width: RDim.width * 0.5 - 25,
        height: RDim.height * 0.15 - 25, // Set the height of the card
        justifyContent: "flex-end", // Align content at the bottom
      },
      image: {
        borderRadius: 8,
      },
      cardContent: {
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background for text
        padding: RDim.scale * 1,
      },
      title: {
        fontSize: RDim.scale * 5,
        fontWeight: "bold",
        color: "#fff", // Text color
      },
      description: {
        fontSize: RDim.scale * 4,
        color: "#fff", // Text color
      },
})