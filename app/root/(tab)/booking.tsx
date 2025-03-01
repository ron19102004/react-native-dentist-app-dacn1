import ColorTheme from '@/common/color.constant';
import { useFocusEffect } from 'expo-router';
import React, { useCallback } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';

const BookingScreen = () => {
    useFocusEffect(
        useCallback(() => {
          StatusBar.setBackgroundColor(ColorTheme.White);
          StatusBar.setBarStyle("dark-content"); // Hoặc "light-content" nếu cần
        }, [])
      );
    return (
        <View>
            
        </View>
    );
}

const styles = StyleSheet.create({})

export default BookingScreen;
