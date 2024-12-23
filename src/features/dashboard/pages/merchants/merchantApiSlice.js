import { apiSlice } from "../../../../app/apiSlice";







const merchantApiSlice = apiSlice.injectEndpoints({
     endpoints: (builder)=>({
        createMerchant: builder.mutation({
            query: (credentials)=>({
                url: '/admin/merchant/store',
                method: 'POST',
                body: {...credentials}
            })
        }),
        editMerchant: builder.mutation({
            query: (credentials)=>({
                url: '/admin/merchant/update',
                method: 'PUT',
                body: {...credentials}
            })
        }),
        deleteMerchant: builder.mutation({
            query: (credentials)=>({
                url: '/admin/merchant/delete',
                method: 'DELETE',
                body: {...credentials}
            })
        }),
        getMerchants: builder.query({
            query: (credentials)=>({
                url: '/admin/merchant/read',
                method: 'GET'
            })
        }),
        getMerchant: builder.query({
            query: (credentials)=>({
                url: `/admin/merchant/detail?imei=${credentials.id}`,
                method: 'GET'
            })
        }),
        searchMerchant: builder.query({
            query: (credentials)=>({
                url: `/admin/merchant/search?imei=${credentials.id}`,
                method: 'GET'
            })
        })
     })
});

export const {
    useCreateMerchantMutation,
    useEditMerchantMutation,
    useDeleteMerchantMutation,
    useGetMerchantsQuery,
    useGetMerchantQuery,
    useSearchMerchantQuery
} = merchantApiSlice;