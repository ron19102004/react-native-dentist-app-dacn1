import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  LayoutAnimation,
  UIManager,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import { API_HOST_NAME, WS_POINT } from "@/src/constants/api.constant";
import { Feather } from "@expo/vector-icons";
import { Pressable, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "expo-router";
import ColorTheme from "@/common/color.constant";

interface ChatMessage {
  message: string;
  role: "user" | "ai";
  uuid?: string;
}

interface ChatMessageResponseStream {
  message: string;
  uuid: string;
  finished: boolean;
  prompt: string;
  chatResponse: any;
  responseTime: string;
}
const Chatbot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const chatListRef = useRef<FlashList<ChatMessage>>(null);
  const socket = useRef<WebSocket | null>(null);
  const currentBotMessage = useRef<ChatMessage | null>(null);
  const [keyboardVerticalOffset, setKeyboardVerticalOffset] =
    useState<number>(0);
  const navigation = useNavigation();

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () =>
      setKeyboardVerticalOffset(110)
    );
    const hideSub = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardVerticalOffset(0)
    );
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, [navigation]);

  useEffect(() => {
    socket.current = new WebSocket(`${WS_POINT}/ai/chat`);
    socket.current.onopen = () => console.log("🔵 WebSocket Chat Connected");

    socket.current.onmessage = (event) => {
      const data: ChatMessageResponseStream = JSON.parse(event.data);
      if (
        currentBotMessage.current &&
        currentBotMessage.current.uuid === data.uuid
      ) {
        const updatedMessage: ChatMessage = {
          role: "ai",
          message: currentBotMessage.current.message + data.message,
          uuid: data.uuid,
        };
        currentBotMessage.current = updatedMessage;
        setMessages((prev) => [...prev.slice(0, -1), updatedMessage]);
      } else {
        const newMessage: ChatMessage = {
          role: "ai",
          message: data.message,
          uuid: data.uuid,
        };
        currentBotMessage.current = newMessage;
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    return () => socket.current?.close();
  }, []);

  useEffect(() => {
    if (chatListRef.current && messages.length > 0) {
      LayoutAnimation.easeInEaseOut();
      setTimeout(() => {
        chatListRef.current?.scrollToIndex({
          index: messages.length - 1,
          animated: true,
        });
      }, 50);
    }
  }, [currentBotMessage.current]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newUserMessage: ChatMessage = {
      role: "user",
      message: input,
      uuid: "USER-" + Date.now(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    socket.current?.send(input);
    setInput("");
    currentBotMessage.current = null;
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <FlashList
          ref={chatListRef}
          data={messages}
          estimatedItemSize={50}
          renderItem={({ item }) => (
            <View
              style={[
                styles.messageBubble,
                item.role === "user" ? styles.userMessage : styles.aiMessage,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  item.role === "user" ? styles.userText : styles.aiText,
                ]}
              >
                {item.message}
              </Text>
            </View>
          )}
          keyExtractor={(item, index) => item.uuid || index.toString()}
          contentContainerStyle={{ padding: 10, paddingBottom: 20 }}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nhập tin nhắn..."
            value={input}
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
          />
          <Pressable onPress={sendMessage} style={styles.sendButton}>
            <Feather name="send" size={20} color="#fff" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  messageBubble: {
    padding: 10,
    marginVertical: 4,
    borderRadius: 12,
    maxWidth: "80%",
  },
  userMessage: {
    backgroundColor: "#007aff",
    alignSelf: "flex-end",
  },
  aiMessage: {
    backgroundColor: "#e5e5ea",
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: "#fff",
  },
  aiText: {
    color: "#000",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    height: 42,
    borderRadius: 20,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    color: ColorTheme.Black,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: "#007aff",
    padding: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Chatbot;
