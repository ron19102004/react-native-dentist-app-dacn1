import dentistApi from "../apis/dentist.api";
import { DentistResponse } from "../apis/model.d";

interface DentistHookType {
  getDentists(
    success: (data: DentistResponse[]) => void,
    errors: (err: string) => void,
    page?: number,
    size?: number
  ): Promise<void>;
}

const useDentist = (): DentistHookType => {
  const getDentists = async (
    success: (data: DentistResponse[]) => void,
    errors: (err: string) => void,
    page?: number,
    size?: number
  ) => {
    const res = await dentistApi.getDentists(page, size);
    if (res.code === 200) {
      success(res.data ?? []);
      return;
    }
    errors(res.message);
  };
  return {
    getDentists: getDentists,
  };
};

export default useDentist;
