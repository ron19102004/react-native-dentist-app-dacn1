import { Link, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

const StartScreen = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.replace("/auth/login");
    }, 1);
  }, [0]);
  return (
    <View>
      <Text>Start screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default StartScreen;
