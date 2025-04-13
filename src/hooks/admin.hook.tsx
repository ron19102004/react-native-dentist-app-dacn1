import { useContext } from "react";
import { ApiResponse, SystemInfoData } from "../apis/model.d";
import { AuthContext } from "../contexts/auth.context";
import adminApi from "../apis/admin.api";

interface AdminContextType {
  changeStaffInfo(name: string): Promise<void>;
  updateSystemInfo(
    data: SystemInfoData,
    success: () => void,
    err: (error: string) => void
  ): Promise<void>;
  getSystemInfo(): Promise<ApiResponse<SystemInfoData>>;
}

const useAdmin = (): AdminContextType => {
  const { ifAuthFn } = useContext(AuthContext);
  const updateSystemInfo = async (
    data: SystemInfoData,
    success: () => void,
    err: (error: string) => void
  ) => {
    await ifAuthFn(
      async (token) => {
        const res = await adminApi.updateSystemInfo(token, data);
        if (res.code === 200) success();
        else err(res.message);
      },
      (error) => {
        err(error);
      }
    );
  };
  const changeStaffInfo = async (name: string): Promise<void> => {};
  const getSystemInfo = async () => {
    return await adminApi.getSystemInfo();
  };
  return {
    changeStaffInfo: changeStaffInfo,
    updateSystemInfo: updateSystemInfo,
    getSystemInfo: getSystemInfo,
  };
};
export default useAdmin;
