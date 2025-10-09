import { apiSlice } from "../../../../app/apiSlice";

const deviceTypeApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDeviceTypes: builder.query({
            query: () => ({
                url: '/admin/device_type/read',
                method: 'GET'
            })
        })
    })
});

export const {
    useGetDeviceTypesQuery
} = deviceTypeApiSlice;
