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
import DeviceDetail from './features/dashboard/pages/device_store/DeviceStoreDetail';

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
                         <Route path="device/:imei" element={<DeviceDetail />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

