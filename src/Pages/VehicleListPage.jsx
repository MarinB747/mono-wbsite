import React from "react";
import "./Pages.css";
import VehicleList from "./VehicleListPageStore/VehicleList";
import VehicleForm from "./VehicleListPageStore/VehicleForm";
import { StoreProvider } from "./VehicleListPageStore/Context";

export default function VehicleListPage() {
  return (
    <StoreProvider>
      <div className="vehicle__table">
        <VehicleList />
        <VehicleForm />
      </div>
    </StoreProvider>
  );
}
