import { apiSlice } from "../../../../app/apiSlice";







const blockApiSlice = apiSlice.injectEndpoints({
     endpoints: (builder)=>({
        createBlock: builder.mutation({
            query: (credentials)=>({
                url: '/admin/block/store',
                method: 'POST',
                body: {...credentials}
            })
        }),
        editBlock: builder.mutation({
            query: (credentials)=>({
                url: '/admin/block/update',
                method: 'PUT',
                body: {...credentials}
            })
        }),
        deleteBlock: builder.mutation({
            query: (credentials)=>({
                url: '/admin/block/delete',
                method: 'DELETE',
                body: {...credentials}
            })
        }),
        getBlocks: builder.query({
            query: (credentials)=>({
                url: '/admin/block/read',
                method: 'GET'
            })
        }),
        getBlock: builder.query({
            query: (credentials)=>({
                url: `/admin/block/detail?reference=${credentials.reference}`,
                method: 'GET'
            })
        }),
        searchBlock: builder.query({
            query: (credentials)=>({
                url: `/admin/block/search?reference=${credentials.reference}`,
                method: 'GET'
            })
        })
     })
});

export const {
    useCreateBlockMutation,
    useEditBlockMutation,
    useDeleteBlockMutation,
    useGetBlocksQuery,
    useGetBlockQuery,
    useSearchBlockQuery
} = blockApiSlice;