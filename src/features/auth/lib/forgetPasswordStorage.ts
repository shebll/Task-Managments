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
    if (!data) return undefined;
    try {
      return JSON.parse(data) as ForgetPasswordData;
    } catch {
      localStorage.removeItem("forgetPasswordData");
      return undefined;
    }
  },
  clearForgetPasswordData: () => {
    localStorage.removeItem("forgetPasswordData");
  },
};
