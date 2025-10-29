import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { Routes, Route,BrowserRouter } from 'react-router-dom';
import Store from './app/store';
import Auth from './features/auth/Auth';
import Dashboard from './features/dashboard/Dashboard';
import RequireAuth from './features/auth/RequireAuth';
import Home from './features/dashboard/pages/home/Home';
import DeviceStore from './features/dashboard/pages/device_store/DeviceStore';
import DeviceStoreDetail from './features/dashboard/pages/device_store/DeviceStoreDetail';
import Device from './features/dashboard/pages/devices/Device';
import DeviceDetail from './features/dashboard/pages/devices/DeviceDetail';
import DeviceType from './features/dashboard/pages/devices/DeviceType';
import Merchant from './features/dashboard/pages/merchants/Merchant';
import MerchantDetail from './features/dashboard/pages/merchants/MerchantDetail';
import Block from './features/dashboard/pages/blocks/Block';
import BlockDetail from './features/dashboard/pages/blocks/BlockDetail';
import Consumption from './features/dashboard/pages/consumption/Consumption';
import DeviceType from './features/dashboard/pages/device_type/DeviceType';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={Store}>
        <BrowserRouter>
            <Routes>
                <Route path="" element={<Auth /> } />
                <Route element={<RequireAuth />}>
                    <Route path="/dashboard" element={<Dashboard /> }>
                         <Route path="" element={<Home />} />

                         <Route path="device_store" element={<DeviceStore />} />
                         <Route path="device_store_detail/:imei" element={<DeviceStoreDetail />} />

                         <Route path="devices" element={<Device />} />
                         <Route path="device_detail/:imei" element={<DeviceDetail />} />
                         <Route path="device_types" element={<DeviceType />} />

                         <Route path="merchants" element={<Merchant />} />
                         <Route path="merchant_detail/:id" element={<MerchantDetail />} />

                         <Route path="blocks" element={<Block />} />
                         <Route path="block_detail/:reference" element={<BlockDetail />} />

                         <Route path="consumptions" element={<Consumption />} />

                         <Route path="device_types" element={<DeviceType /> } />

                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

