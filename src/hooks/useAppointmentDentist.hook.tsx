import appointmentDentistApi, {
  AddDentalServiceToAppointmentData,
  AddMedicineToAppointmentData,
  AppointmentDentistResponse,
  UpdateTreatmentRecordRequest,
} from "../apis/appointment-dentist.api";
import { MedicineUsed, TreatmentRecordService } from "../apis/model.d";
import { useAuth } from "../contexts";

interface AppointmentDentistContextType {
  confirmAppointment(
    appointmentId: number,
    success: () => void,
    errors: (err: string) => void
  ): Promise<void>;
  cancelAppointment(
    appointmentId: number,
    note: string,
    success: () => void,
    errors: (err: string) => void
  ): Promise<void>;
  addDentalServiceAppointment(
    appointmentId: number,
    dentalServices: AddDentalServiceToAppointmentData[],
    success: () => void,
    errors: (err: string) => void
  ): Promise<void>;
  addMedicineAppointment(
    appointmentId: number,
    medicines: AddMedicineToAppointmentData[],
    success: () => void,
    errors: (err: string) => void
  ): Promise<void>;
  getAppointmentsToday(
    userId: number,
    success: (data: AppointmentDentistResponse[]) => void,
    errors: (err: string) => void
  ): Promise<void>;
  getAppointmentDetails(
    appointmentId: number,
    success: (data: AppointmentDentistResponse | null) => void,
    errors: (err: string) => void
  ): Promise<void>;
  removeSerivce(
    appointmentId: number,
    dentalServiceIds: number[],
    success: () => void,
    errors: (err: string) => void
  ): Promise<void>;
  removeMedicine(
    appointmentId: number,
    medicines: number[],
    success: () => void,
    errors: (err: string) => void
  ): Promise<void>;
  getTreatmentRecordServices(
    appointmentId: number,
    success: (data: TreatmentRecordService[]) => void,
    errors: (err: string) => void
  ): Promise<void>;
  getMedicineUsed(
    appointmentId: number,
    success: (data: MedicineUsed[]) => void,
    errors: (err: string) => void
  ): Promise<void>;
  updateTreatmentRecord(
    appointmentId: number,
    data: UpdateTreatmentRecordRequest,
    success: () => void,
    errors: (err: string) => void
  ): Promise<void>;
  finishAppointment(
    appointmentId: number,
    success: () => void,
    errors: (err: string) => void
  ): Promise<void>;
}
const useAppointmentDentist = (): AppointmentDentistContextType => {
  const { ifAuthFn } = useAuth();
  const finishAppointment = async (
    appointmentId: number,
    success: () => void,
    errors: (err: string) => void
  ) => {
    await ifAuthFn(
      async (token: string) => {
        const res = await appointmentDentistApi.finishAppointment(token,appointmentId);
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
  const updateTreatmentRecord = async (
    appointmentId: number,
    data: UpdateTreatmentRecordRequest,
    success: () => void,
    errors: (err: string) => void
  ) => {
    await ifAuthFn(
      async (token: string) => {
        const res = await appointmentDentistApi.updateTreatmentRecord(
          token,
          appointmentId,
          data
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
  const removeMedicine = async (
    appointmentId: number,
    medicines: number[],
    success: () => void,
    errors: (err: string) => void
  ) => {
    await ifAuthFn(
      async (token) => {
        const res = await appointmentDentistApi.removeMedicine(
          token,
          appointmentId,
          medicines
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
  const removeSerivce = async (
    appointmentId: number,
    dentalServiceIds: number[],
    success: () => void,
    errors: (err: string) => void
  ) => {
    await ifAuthFn(
      async (token) => {
        const res = await appointmentDentistApi.removeSerivce(
          token,
          appointmentId,
          dentalServiceIds
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
  const getAppointmentsToday = async (
    userId: number,
    success: (data: AppointmentDentistResponse[]) => void,
    errors: (err: string) => void
  ) => {
    await ifAuthFn(
      async (token) => {
        const res = await appointmentDentistApi.getAppointmentsToday(
          token,
          userId
        );
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
  const addMedicineAppointment = async (
    appointmentId: number,
    medicines: AddMedicineToAppointmentData[],
    success: () => void,
    errors: (err: string) => void
  ) => {
    await ifAuthFn(
      async (token) => {
        const res = await appointmentDentistApi.addMedicineAppointment(
          token,
          appointmentId,
          medicines
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
  const addDentalServiceAppointment = async (
    appointmentId: number,
    dentalServices: AddDentalServiceToAppointmentData[],
    success: () => void,
    errors: (err: string) => void
  ) => {
    await ifAuthFn(
      async (token) => {
        const res = await appointmentDentistApi.addDentalServiceAppointment(
          token,
          appointmentId,
          dentalServices
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
  const confirmAppointment = async (
    appointmentId: number,
    success: () => void,
    errors: (err: string) => void
  ) => {
    await ifAuthFn(
      async (token) => {
        const res = await appointmentDentistApi.confirmAppointment(
          token,
          appointmentId
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
  const getAppointmentDetails = async (
    appointmentId: number,
    success: (data: AppointmentDentistResponse | null) => void,
    errors: (err: string) => void
  ) => {
    await ifAuthFn(
      async (token) => {
        const res = await appointmentDentistApi.getAppointmentDetails(
          token,
          appointmentId
        );
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
  const cancelAppointment = async (
    appointmentId: number,
    note: string,
    success: () => void,
    errors: (err: string) => void
  ) => {
    await ifAuthFn(
      async (token) => {
        const res = await appointmentDentistApi.cancelAppointment(
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
  const getTreatmentRecordServices = async (
    appointmentId: number,
    success: (data: TreatmentRecordService[]) => void,
    errors: (err: string) => void
  ) => {
    await ifAuthFn(
      async (token) => {
        const res = await appointmentDentistApi.getTreatmentRecordServices(
          appointmentId,
          token
        );
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
  const getMedicineUsed = async (
    appointmentId: number,
    success: (data: MedicineUsed[]) => void,
    errors: (err: string) => void
  ) => {
    await ifAuthFn(
      async (token) => {
        const res = await appointmentDentistApi.getMedicineUsed(
          appointmentId,
          token
        );
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
  return {
    confirmAppointment: confirmAppointment,
    addDentalServiceAppointment: addDentalServiceAppointment,
    addMedicineAppointment: addMedicineAppointment,
    getAppointmentsToday: getAppointmentsToday,
    removeSerivce: removeSerivce,
    removeMedicine: removeMedicine,
    getAppointmentDetails: getAppointmentDetails,
    cancelAppointment: cancelAppointment,
    getTreatmentRecordServices: getTreatmentRecordServices,
    getMedicineUsed: getMedicineUsed,
    updateTreatmentRecord: updateTreatmentRecord,
    finishAppointment:finishAppointment
  };
};
export default useAppointmentDentist;
