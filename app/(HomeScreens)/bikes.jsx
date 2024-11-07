import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView } from "react-native";
import React from "react";

const Bikes = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <KeyboardAvoidingView>
        <ScrollView>
          <View>
            <Text>Bikes</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Bikes;

const styles = StyleSheet.create({});
