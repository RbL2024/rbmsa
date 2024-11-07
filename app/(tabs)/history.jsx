import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView } from "react-native";
import React from "react";
import { ThemedText } from "@/components/ThemedText";

const History = () => {
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
            <ThemedText type="title">History</ThemedText>
            <Text style={{fontFamily:"mplus", fontSize: 32}}> HISTORY</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default History;

const styles = StyleSheet.create({});
