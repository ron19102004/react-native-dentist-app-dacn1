import appointmentUserApi, {
  CreateAppointmentRequest,
  CreateAppointmentResponse,
  GetAppointmentDetails,
  GetAppointmentOptions,
  GetAppointmentResponse,
} from "../apis/appointment-user.api";
import { useAuth } from "../contexts";

interface AppointmentUserContextType {
  createAppointment(
    data: CreateAppointmentRequest,
    success: (data: CreateAppointmentResponse | null) => void,
    errors: (error: string) => void
  ): Promise<void>;
  getAppointments(
    options: GetAppointmentOptions,
    success: (data: GetAppointmentResponse[]) => void,
    errors: (err: string) => void
  ): Promise<void>;
  getAppointmentItem(
    id: number,
    success: (data: GetAppointmentDetails | null) => void,
    errors: (err: string) => void
  ): Promise<void>;
  cancelAppointment(
    appointmentId: number,
    note: string,
    success: () => void,
    errors: (err: string) => void
  ): Promise<void>;
}

const useAppointmentUser = (): AppointmentUserContextType => {
  const { ifAuthFn } = useAuth();
  const cancelAppointment = async (
    appointmentId: number,
    note: string,
    success: () => void,
    errors: (err: string) => void
  ) => {
    await ifAuthFn(
      async (token) => {
        const res = await appointmentUserApi.cancelAppointment(
          token,
          appointmentId,
          note
        );
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
  const getAppointmentItem = async (
    id: number,
    success: (data: GetAppointmentDetails | null) => void,
    errors: (err: string) => void
  ) => {
    await ifAuthFn(
      async (token) => {
        const res = await appointmentUserApi.getAppointmentItem(token, id);
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
  const getAppointments = async (
    options: GetAppointmentOptions,
    success: (data: GetAppointmentResponse[]) => void,
    errors: (err: string) => void
  ) => {
    await ifAuthFn(
      async (token) => {
        const res = await appointmentUserApi.getAppointments(token, options);
        if (res.code === 200) {
          success(res.data ?? []);
          return;
        }
        errors(res.message);
      },
      (err) => {
        errors(err);
      }
    );
  };
  const createAppointment = async (
    data: CreateAppointmentRequest,
    success: (data: CreateAppointmentResponse | null) => void,
    errors: (error: string) => void
  ) => {
    await ifAuthFn(
      async (token) => {
        const res = await appointmentUserApi.createAppointment(token, data);
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
  return {
    createAppointment: createAppointment,
    getAppointments: getAppointments,
    getAppointmentItem: getAppointmentItem,
    cancelAppointment: cancelAppointment,
  };
};

export default useAppointmentUser;
