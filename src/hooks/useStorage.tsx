import AsyncStorage from "@react-native-async-storage/async-storage";

export interface UseStorage {
  save(key: string, value: string): Promise<void>;
  get(key: string): Promise<string | null>;
  remove(key: string): Promise<void>;
}
const useStorage = (): UseStorage => {
  const save = async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error("❌ Lỗi lưu storage", error);
    }
  };

  const get = async (key: string): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.error("❌ Lỗi lấy storage:", error);
      return null;
    }
  };

  const remove = async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error("❌ Lỗi xóa storage:", error);
    }
  };
  return {
    get: get,
    remove: remove,
    save: save,
  };
};
export default useStorage;
