import { ForgetPasswordData } from "../types/types";

export const forgetPasswordStorage = {
  setForgetPasswordData: (forgetPasswordData: ForgetPasswordData) => {
    localStorage.setItem(
      "forgetPasswordData",
      JSON.stringify(forgetPasswordData),
    );
  },
  getForgetPasswordData: (): ForgetPasswordData | void => {
    const data = localStorage.getItem("forgetPasswordData");
    if (!data) {
      return undefined;
    }
    if (data) {
      return JSON.parse(data) as ForgetPasswordData;
    }
  },
};
