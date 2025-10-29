import { apiSlice } from "../../../../app/apiSlice";

const deviceTypeApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDeviceTypes: builder.query({
            query: () => ({
                url: '/admin/device_type/read',
                method: 'GET'
            })
        }),
        createDeviceType: builder.mutation({
            query: (credentials) => ({
                url: '/admin/device_type/store',
                method: 'POST',
                body: {...credentials}
            })
        })
    })
});

export const {
    useGetDeviceTypesQuery,
    useCreateDeviceTypeMutation
} = deviceTypeApiSlice;
