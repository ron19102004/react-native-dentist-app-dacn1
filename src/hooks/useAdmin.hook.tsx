import { useContext } from "react";
import { ApiResponse, SystemInfoData } from "../apis/model.d";
import { AuthContext } from "../contexts/auth.context";
import adminApi, {
  AccountInfoRole,
  UpdateDentistInfoRequest,
  UpdateStaffInfoRequest,
  UpdateUserRoleRequest,
} from "../apis/admin.api";

interface AdminContextType {
  updateSystemInfo(
    data: SystemInfoData,
    success: () => void,
    err: (error: string) => void
  ): Promise<void>;
  getSystemInfo(): Promise<ApiResponse<SystemInfoData>>;
  lockAccount(
    gmail: string,
    success: () => void,
    errors: (err: string) => void
  ): Promise<void>;
  unlockAccount(
    gmail: string,
    success: () => void,
    errors: (err: string) => void
  ): Promise<void>;
  updateAccDentist(
    gmail: string,
    data: UpdateDentistInfoRequest,
    success: () => void,
    errors: (err: string) => void
  ): Promise<void>;
  updateAccStaff(
    gmail: string,
    data: UpdateStaffInfoRequest,
    success: () => void,
    errors: (err: string) => void
  ): Promise<void>;
  getInfoUserHasRole(
    gmail: string,
    success: (data: AccountInfoRole | null) => void,
    errors: (err: string) => void
  ): Promise<void>;
  updateRole(
    data: UpdateUserRoleRequest,
    success: () => void,
    errors: (err: string) => void
  ): Promise<void>;
}

const useAdmin = (): AdminContextType => {
  const { ifAuthFn } = useContext(AuthContext);
  const updateRole = async (
    data: UpdateUserRoleRequest,
    success: () => void,
    errors: (err: string) => void
  ) => {
    await ifAuthFn(
      async (token) => {
        const res = await adminApi.updateRole(token, data);
        if (res.code === 200) {
          success();
          return;
        }
        errors(res.message);
      },
      (err) => {
        errors(err);
      }
    );
  };
  const getInfoUserHasRole = async (
    gmail: string,
    success: (data: AccountInfoRole | null) => void,
    errors: (err: string) => void
  ) => {
    await ifAuthFn(
      async (token) => {
        const res = await adminApi.getInfoRole(gmail, token);
        if (res.code === 200) {
          success(res.data);
          return;
        }
        errors(res.message);
      },
      (err) => {
        errors(err);
      }
    );
  };
  const updateAccStaff = async (
    gmail: string,
    data: UpdateStaffInfoRequest,
    success: () => void,
    errors: (err: string) => void
  ) => {
    await ifAuthFn(
      async (token) => {
        const res = await adminApi.updateStaffInfo(gmail, token, data);
        if (res.code === 200) {
          success();
          return;
        }
        errors(res.message);
      },
      (err) => {
        errors(err);
      }
    );
  };
  const updateAccDentist = async (
    gmail: string,
    data: UpdateDentistInfoRequest,
    success: () => void,
    errors: (err: string) => void
  ) => {
    await ifAuthFn(
      async (token) => {
        const res = await adminApi.updateDentistInfo(gmail, token, data);
        if (res.code === 200) {
          success();
          return;
        }
        errors(res.message);
      },
      (err) => {
        errors(err);
      }
    );
  };
  const lockAccount = async (
    gmail: string,
    success: () => void,
    errors: (err: string) => void
  ) => {
    await ifAuthFn(
      async (token) => {
        const res = await adminApi.lockUser(gmail, token);
        if (res.code === 200) {
          success();
          return;
        }
        errors(res.message);
      },
      (err) => {
        errors(err);
      }
    );
  };
  const unlockAccount = async (
    gmail: string,
    success: () => void,
    errors: (err: string) => void
  ) => {
    await ifAuthFn(
      async (token) => {
        const res = await adminApi.unlockUser(gmail, token);
        if (res.code === 200) {
          success();
          return;
        }
        errors(res.message);
      },
      (err) => {
        errors(err);
      }
    );
  };
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
  const getSystemInfo = async () => {
    return await adminApi.getSystemInfo();
  };
  return {
    updateSystemInfo: updateSystemInfo,
    getSystemInfo: getSystemInfo,
    lockAccount: lockAccount,
    unlockAccount: unlockAccount,
    updateAccStaff: updateAccStaff,
    updateAccDentist: updateAccDentist,
    getInfoUserHasRole: getInfoUserHasRole,
    updateRole: updateRole,
  };
};
export default useAdmin;
