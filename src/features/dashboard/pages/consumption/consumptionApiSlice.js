import { apiSlice } from "../../../../app/apiSlice";


const consumptionApiSlice = apiSlice.injectEndpoints({
     endpoints: (builder)=>({
        createConsumption: builder.mutation({
            query: (credentials)=>({
                url: '/admin/Consumption/store',
                method: 'POST',
                body: {...credentials}
            })
        }),
        editConsumption: builder.mutation({
            query: (credentials)=>({
                url: '/admin/Consumption/update',
                method: 'PUT',
                body: {...credentials}
            })
        }),
        deleteConsumption: builder.mutation({
            query: (credentials)=>({
                url: '/admin/Consumption/delete',
                method: 'DELETE',
                body: {...credentials}
            })
        }),
        getConsumptions: builder.query({
            query: (credentials)=>({
                url: '/admin/Consumption/read',
                method: 'GET'
            })
        }),
        getConsumption: builder.query({
            query: (credentials)=>({
                url: `/admin/Consumption/detail?imei=${credentials.id}`,
                method: 'GET'
            })
        }),
        searchConsumption: builder.query({
            query: (credentials)=>({
                url: `/admin/Consumption/search?imei=${credentials.id}`,
                method: 'GET'
            })
        })
     })
});

export const {
    useCreateConsumptionMutation,
    useEditConsumptionMutation,
    useDeleteConsumptionMutation,
    useGetConsumptionsQuery,
    useGetConsumptionQuery,
    useSearchConsumptionQuery
} = consumptionApiSlice;