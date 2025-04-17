import { PaymentMethod } from "../apis/model.d";
import staffApi from "../apis/staff.api";
import { useAuth } from "../contexts";

interface UseStaffHookType {
  createInvoiceAppointment(
    appointmentId: number,
    success: () => void,
    errors: (err: string) => void
  ): Promise<void>;
  confirmInvoiceAppointment(
    appointmentId: number,
    paymentMethod: PaymentMethod,
    success: () => void,
    errors: (err: string) => void
  ): Promise<void>;
}
const useStaff = (): UseStaffHookType => {
  const { ifAuthFn } = useAuth();
  const confirmInvoiceAppointment = async (
    appointmentId: number,
    paymentMethod: PaymentMethod,
    success: () => void,
    errors: (err: string) => void
  ) => {
    await ifAuthFn(
      async (token) => {
        const res = await staffApi.confirmInvoiceAppointment(
          token,
          appointmentId,
          paymentMethod
        );
        if (res.code === 200) {
          success();
        } else {
          errors(res.message);
        }
      },
      (error) => {
        errors(error);
      }
    );
  };
  const createInvoiceAppointment = async (
    appointmentId: number,
    success: () => void,
    errors: (err: string) => void
  ) => {
    await ifAuthFn(
      async (token) => {
        const res = await staffApi.createInvoiceAppointment(
          token,
          appointmentId
        );
        if (res.code === 200) {
          success();
        } else {
          errors(res.message);
        }
      },
      (error) => {
        errors(error);
      }
    );
  };

  return {
    createInvoiceAppointment: createInvoiceAppointment,
    confirmInvoiceAppointment: confirmInvoiceAppointment,
  };
};

export default useStaff;
