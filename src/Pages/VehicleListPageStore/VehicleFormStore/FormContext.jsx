import React, { createContext } from "react";
import { useLocalStore, useObserver } from "mobx-react";
import { observable } from "mobx";

const FormContext = createContext();

const FormProvider = ({ children }) => {
  const form = useLocalStore(() =>
    observable({
      vehicleBrand: "",
      vehicleModel: "",
      vehicleYear: "",
      submitDisabled: true,
      modalShow: false,

      setVehicleBrand: (e) => {
        form.vehicleBrand = e;
      },
      setVehicleModel: (e) => {
        form.vehicleModel = e;
      },
      setVehicleYear: (e) => {
        form.vehicleYear = e;
      },
      setSubmitDisabled: (e) => {
        form.submitDisabled = e;
      },
      setModalShow: (e) => {
        form.modalShow = e;
      }
    })
  );

  return useObserver(() => (
    <FormContext.Provider value={form}>{children}</FormContext.Provider>
  ));
};
export { FormContext, FormProvider };
