import { apiSlice } from "../../../../app/apiSlice";







const deviceApiSlice = apiSlice.injectEndpoints({
     endpoints: (builder)=>({
        createDeviceStore: builder.mutation({
            query: (credentials)=>({
                url: '/admin/device_list/store',
                method: 'POST',
                body: {...credentials}
            })
        }),
        editDeviceStore: builder.mutation({
            query: (credentials)=>({
                url: '/admin/device_list/update',
                method: 'PUT',
                body: {...credentials}
            })
        }),
        deleteDeviceStore: builder.mutation({
            query: (credentials)=>({
                url: '/admin/device_list/delete',
                method: 'DELETE',
                body: {...credentials}
            })
        }),
        getDevicesStore: builder.query({
            query: (credentials)=>({
                url: '/admin/device_list/read',
                method: 'GET'
            })
        }),
        getDeviceStore: builder.query({
            query: (credentials)=>({
                url: `/admin/device_list/detail?imei=${credentials.imei}`,
                method: 'GET'
            })
        }),
        searchDeviceStore: builder.query({
            query: (credentials)=>({
                url: `/admin/device_list/search?imei=${credentials.imei}`,
                method: 'GET'
            })
        })
     })
});

export const {
    useCreateDeviceStoreMutation,
    useEditDeviceStoreMutation,
    useDeleteDeviceStoreMutation,
    useGetDevicesStoreQuery,
    useGetDeviceStoreQuery,
    useSearchDeviceStoreQuery
} = deviceApiSlice;