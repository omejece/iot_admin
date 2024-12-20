import { apiSlice } from "../../../../app/apiSlice";







const deviceApiSlice = apiSlice.injectEndpoints({
     endpoints: (builder)=>({
        createDevice: builder.mutation({
            query: (credentials)=>({
                url: '/admin/device/store',
                method: 'POST',
                body: {...credentials}
            })
        }),
        editDevice: builder.mutation({
            query: (credentials)=>({
                url: '/admin/device/update',
                method: 'PUT',
                body: {...credentials}
            })
        }),
        disableDevice: builder.mutation({
            query: (credentials)=>({
                url: '/admin/device/disable',
                method: 'PUT',
                body: {...credentials}
            })
        }),
        enableDevice: builder.mutation({
            query: (credentials)=>({
                url: '/admin/device/enable',
                method: 'PUT',
                body: {...credentials}
            })
        }),
        deleteDevice: builder.mutation({
            query: (credentials)=>({
                url: '/admin/device/delete',
                method: 'DELETE',
                body: {...credentials}
            })
        }),
        getDevices: builder.query({
            query: (credentials)=>({
                url: '/admin/device/read',
                method: 'GET'
            })
        }),
        getDevice: builder.query({
            query: (credentials)=>({
                url: `/admin/device/detail?imei=${credentials.imei}`,
                method: 'GET'
            })
        })
     })
});

export default {
    useCreateDeviceMutation,
    useEditDeviceMutation,
    useDisableDeviceMutation,
    useEnableDeviceMutation,
    useDeleteDeviceMutation,
    useGetDevicesQuery,
    useGetDeviceQuery

} = deviceApiSlice;