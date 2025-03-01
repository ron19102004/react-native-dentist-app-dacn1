import React from "react";
import { Linking, StyleSheet, Text, View } from "react-native";
import ListTile from "../list-tile";
import { AntDesign } from "@expo/vector-icons";
import ColorTheme from "@/common/color.constant";

interface InforData {
  phone: string;
  facebook: string;
  gmail: string;
}
const Infor: InforData = {
  phone: "0392477615",
  facebook: "https://www.facebook.com/ronial.04",
  gmail: "ron19102004@gmail.com",
};
const ContactSupport = () => {
  const openSafeURL = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      alert("Không thể mở URL này");
    }
  };
  return (
    <View>
      <Text style={styles.Title}>Liên hệ tổng đài</Text>
      <ListTile
        onPress={async () => await openSafeURL("mailto:" + Infor.gmail)}
        center={(color) => <Text style={{ color: color }}>Gmail</Text>}
        leading={(color) => (
          <AntDesign name="mail" style={{ ...styles.TileIcon, color: color }} />
        )}
        suffix={(color) => (
          <AntDesign
            name="right"
            style={{ ...styles.TileIcon, color: color }}
          />
        )}
      />
      <ListTile
        onPress={async () => await openSafeURL("tel:" + Infor.phone)}
        center={(color) => <Text style={{ color: color }}>Số điện thoại</Text>}
        leading={(color) => (
          <AntDesign
            name="phone"
            style={{ ...styles.TileIcon, color: color }}
          />
        )}
        suffix={(color) => (
          <AntDesign
            name="right"
            style={{ ...styles.TileIcon, color: color }}
          />
        )}
      />
      <ListTile
        onPress={async () => await openSafeURL(Infor.facebook)}
        center={(color) => <Text style={{ color: color }}>Facebook</Text>}
        leading={(color) => (
          <AntDesign
            name="facebook-square"
            style={{ ...styles.TileIcon, color: color }}
          />
        )}
        suffix={(color) => (
          <AntDesign
            name="right"
            style={{ ...styles.TileIcon, color: color }}
          />
        )}
      />
      <ListTile
        onPress={async () => await openSafeURL("sms:" + Infor.phone)}
        center={(color) => <Text style={{ color: color }}>Tin nhắn SMS</Text>}
        leading={(color) => (
          <AntDesign
            name="message1"
            style={{ ...styles.TileIcon, color: color }}
          />
        )}
        suffix={(color) => (
          <AntDesign
            name="right"
            style={{ ...styles.TileIcon, color: color }}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Title: {
    fontWeight: "bold",
    fontSize: 20,
    paddingHorizontal: 15,
  },
  TileIcon: {},
});

export default ContactSupport;
