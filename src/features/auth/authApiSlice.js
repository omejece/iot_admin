
import {apiSlice} from "../../app/apiSlice";

export const authApiSplice = apiSlice.injectEndpoints({
    endpoints: builder =>({
        login: builder.mutation({
            query: (credentials) =>({
                url: "/admin/login",
                method: "POST",
                body: {...credentials}
            })
        }),

    })
});

export const {
    useLoginMutation
} = authApiSplice;