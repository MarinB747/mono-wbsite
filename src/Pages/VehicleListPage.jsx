import React from "react";
import "./Pages.css";
import VehicleList from "./VehicleListPageStore/VehicleList";
import VehicleForm from "./VehicleListPageStore/VehicleForm";
import { StoreProvider } from "./VehicleListPageStore/VehicleContext";
import { ListProvider } from "./VehicleListPageStore/VehicleListStore/ListContext";
import { FormProvider } from "./VehicleListPageStore/VehicleFormStore/FormContext";
export default function VehicleListPage() {
  return (
    <StoreProvider>
      <ListProvider>
        <FormProvider>
          <div className="vehicle__table">
            <VehicleList />
            <VehicleForm />
          </div>
        </FormProvider>
      </ListProvider>
    </StoreProvider>
  );
}
