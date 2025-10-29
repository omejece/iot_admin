
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import deviceSlice from "../features/dashboard/pages/devices/deviceSlice";
import authSlice from "../features/auth/authSlice";
import devicesStoreSlice from "../features/dashboard/pages/device_store/devicesStoreSlice";
import blockSlice from "../features/dashboard/pages/blocks/blockSlice";
import merchantSlice from "../features/dashboard/pages/merchants/merchantSlice";
import energySourceSlice from "../features/dashboard/pages/energy_sources/energySourceSlice";
import deviceTypeSlice from "../features/dashboard/pages/device_type/deviceTypeSlice";

const Store = configureStore({
    reducer:{
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSlice,
        device: deviceSlice,
        devicesStore: devicesStoreSlice,
        block: blockSlice,
        merchant: merchantSlice,
        energySource: energySourceSlice,
        deviceType: deviceTypeSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

export default Store;

