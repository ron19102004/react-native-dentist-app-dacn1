import ColorTheme from "@/common/color.constant";
import React, { FC, useContext, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Images from "@/assets/images";
import { BoxShadow } from "@/common/style.comman";
import { UseScreen } from "@/src/hooks/useScreen";
import { User } from "@/src/apis/model";
import { useAuth, useScreen } from "@/src/contexts";

interface ProfileTileProps {
  onPress?: (user: User) => void;
}
const ProfileTile: FC<ProfileTileProps> = ({ onPress = () => {} }) => {
  const { userCurrent } = useAuth();
  const [mtTile] = useState<number>(30);
  const { isMobile } = useScreen();
  return (
    <Pressable
      onPress={() => {
        if (userCurrent !== null) {
          onPress(userCurrent);
        }
      }}
    >
      <View
        style={{
          backgroundColor: ColorTheme.Primary,
          height: 130,
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
          position: "relative",
          marginBottom: mtTile,
          borderBottomEndRadius: isMobile ? 10 : 20,
          borderBottomStartRadius: isMobile ? 10 : 20,
          ...BoxShadow({ color: ColorTheme.Primary, elevation: 20 }),
        }}
      >
        <View
          style={{
            width: "95%",
            position: "absolute",
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 30,
            paddingHorizontal: 12,
            backgroundColor: ColorTheme.White,
            bottom: -mtTile,
            borderRadius: 10,
          }}
        >
          <Image
            source={Images.MaxR}
            style={{
              width: 60,
              height: 60,
              objectFit: "cover",
              borderRadius: 100,
            }}
          />
          <View style={{ paddingLeft: 10 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: ColorTheme.Primary,
              }}
            >
              {userCurrent?.fullName}
            </Text>
            <Text style={{ fontStyle: "italic", color: ColorTheme.Black }}>
              UID: {userCurrent?.id}
            </Text>
            <Text style={{ fontStyle: "italic", color: ColorTheme.Black }}>
              Mã giới thiệu: {userCurrent?.phone}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default ProfileTile;
