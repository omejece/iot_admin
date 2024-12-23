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
        }),
        searchDevice: builder.query({
            query: (credentials)=>({
                url: `/admin/device/search?imei=${credentials.imei}`,
                method: 'GET'
            })
        })
     })
});

export const {
    useCreateDeviceMutation,
    useEditDeviceMutation,
    useDeleteDeviceMutation,
    useGetDevicesQuery,
    useGetDeviceQuery,
    useSearchDeviceQuery
} = deviceApiSlice;