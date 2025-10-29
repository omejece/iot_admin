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
        }),
        getYearlyImeiBlockConsumption: builder.query({
            query: (credentials)=>({
                url: `/admin/yearly_consumption?imei=${credentials?.imei}&block_id=${credentials?.block_id}&year=${credentials?.year}`,
                method: 'GET'
            })
        }),
       
        getYearlyImeiConsumption: builder.query({
            query: (credentials)=>({
                url: `/admin/yearly_consumption?imei=${credentials?.imei}&year=${credentials?.year}`,
                method: 'GET'
            })
        }),
        
        getYearlyBlockConsumption: builder.query({
            query: (credentials)=>({
                url: `/admin/yearly_consumption?block_id=${credentials?.block_id}&year=${credentials?.year}`,
                method: 'GET'
            })
        }),
        
        getYearlyConsumption: builder.query({
            query: (credentials)=>({
                url: `/admin/yearly_consumption?year=${credentials?.year}`,
                method: 'GET'
            })
        }),
        
        getImeiBlockRangeConsumption: builder.query({
            query: (credentials)=>({
                url: `/admin/range_consumption?imei=${credentials?.imei}&block_id=${credentials?.block_id}&fromDate=${credentials?.fromDate}&toDate=${credentials?.toDate}`,
                method: 'GET'
            })
        }),
        
        getImeiRangeConsumption: builder.query({
            query: (credentials)=>({
                url: `/admin/range_consumption?imei=${credentials?.imei}&fromDate=${credentials?.fromDate}&toDate=${credentials?.toDate}`,
                method: 'GET'
            })
        }),
        
        getBlockRangeConsumption: builder.query({
            query: (credentials)=>({
                url: `/admin/range_consumption?block_id=${credentials?.block_id}&fromDate=${credentials?.fromDate}&toDate=${credentials?.toDate}`,
                method: 'GET'
            })
        }),

        getRangeConsumption: builder.query({
            query: (credentials)=>({
                url: `/admin/range_consumption?fromDate=${credentials?.fromDate}&toDate=${credentials?.toDate}`,
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
    useSearchConsumptionQuery,
    useGetYearlyImeiBlockConsumptionQuery,
    useGetYearlyImeiConsumptionQuery,
    useGetYearlyBlockConsumptionQuery,
    useGetYearlyConsumptionQuery,
    useGetImeiBlockRangeConsumptionQuery,
    useGetImeiRangeConsumptionQuery,
    useGetBlockRangeConsumptionQuery,
    useGetRangeConsumptionQuery
} = consumptionApiSlice;