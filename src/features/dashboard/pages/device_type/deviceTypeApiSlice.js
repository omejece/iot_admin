import { apiSlice } from "../../../../app/apiSlice";







const deviceTypeApiSlice = apiSlice.injectEndpoints({
     endpoints: (builder)=>({
        createDeviceType: builder.mutation({
            query: (credentials)=>({
                url: '/admin/device_type/store',
                method: 'POST',
                body: {...credentials}
            })
        }),
        editDeviceType: builder.mutation({
            query: (credentials)=>({
                url: '/admin//device_type/update',
                method: 'PUT',
                body: {...credentials}
            })
        }),
        deleteDeviceType: builder.mutation({
            query: (credentials)=>({
                url: '/admin//device_type/delete',
                method: 'DELETE',
                body: {...credentials}
            })
        }),
        getDeviceTypes: builder.query({
            query: (credentials)=>({
                url: '/admin//device_type/read',
                method: 'GET'
            })
        }),
        getDeviceType: builder.query({
            query: (credentials)=>({
                url: `/admin//device_type/detail?id=${credentials.id}`,
                method: 'GET'
            })
        }),
        searchDeviceType: builder.query({
            query: (credentials)=>({
                url: `/admin/device_search/search?name=${credentials.name}`,
                method: 'GET'
            })
        })
     })
});

export const {
    useCreateDeviceTypeMutation,
    useEditDeviceTypeMutation,
    useDeleteDeviceTypeMutation,
    useGetDeviceTypesQuery,
    useGetDeviceTypeQuery,
    useSearchDeviceTypeQuery
} = deviceTypeApiSlice;