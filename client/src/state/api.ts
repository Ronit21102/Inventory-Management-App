import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Product {
  productId: string;
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
}
export interface NewProduct {
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
}
export interface SalesSummary {
  salesSummaryId: string;
  totalValue: number;
  changePercentage?: number;
  date: string;
}
export interface PurchaseSummary {
  purchaseSummaryId: string;
  totalPurchased: number;
  changePercentage?: number;
  date: string;
}
export interface ExpenseSummary {
  expenseSummaryId: string;
  totalExpenses: number;
  date: string;
}

export interface ExpenstByCategorySummary {
  expenseByCategorySummaryId: string;
  category: string;
  amount: string;
  date: string;
}
export interface ExpenseByCategorySummary {
  expenseByCategorySummaryId: string;
  category: string;
  amount: string;
  date: string;
}
export interface DashboardMetrics {
  popularProducts: Product[];
  salesSummary: SalesSummary[];
  purchaseSummary: PurchaseSummary[];
  expenseSummary: ExpenseSummary[];
  expenseByCategorySummary: ExpenseByCategorySummary[];
}
export interface User {
  userId: string;
  name: string;
  email: string;
}

//       What this does is allow Redux to remember the data fetched by this query under the tag DashboardMetrics.
// Any component or function that uses this query endpoint will now rely on the cached result for DashboardMetrics if it exists, which saves the need for repetitive network requests.
/*Initial Fetch:

When useGetDashboardMetricsQuery is called for the first time, it fetches data from the /dashboard endpoint, and caches it under the DashboardMetrics tag.
This cached result will be used by any other component that calls useGetDashboardMetricsQuery as long as it hasn’t been invalidated.
Updating Data:

Suppose you have a different mutation endpoint, like updateDashboardMetrics, where you edit dashboard metrics.
By setting invalidatesTags: ["DashboardMetrics"] on this mutation, every time updateDashboardMetrics is called, Redux Toolkit Query knows to invalidate the cache for any data tagged as DashboardMetrics.
Automatic Re-fetch:

When DashboardMetrics is invalidated, Redux Toolkit Query automatically re-fetches the data for useGetDashboardMetricsQuery to ensure your UI has the most current data. This way, your components don’t have to handle cache invalidation or re-fetching manually—it’s all handled based on these tags.*/
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }), // it will be prefixed to every request
  reducerPath: "api", // the reducer name as which it will be saved in the store
  tagTypes: ["DashboardMetrics", "Products", "Users", "Expenses"], //tells Redux that you have a category of data called DashboardMetrics. This type is like a label that will help Redux know which part of the cache relates to the dashboard metrics.
  endpoints: (build) => ({
    getDashboardMetrics: build.query<DashboardMetrics, void>({
      query: () => "/dashboard",
      providesTags: ["DashboardMetrics"], //you're tagging the result of this endpoint with a specific label
    }),
    getProducts: build.query<Product[], string | void>({
      query: (search) => ({
        url: "/products",
        params: search ? { search } : {},
      }),
      providesTags: ["Products"],
    }),
    createProduct: build.mutation<Product, NewProduct>({
      query: (newProduct) => ({
        url: "/products",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
    }),
    getUsers: build.query<User[], void>({
      query: () => "/users",
      providesTags: ["Users"],
    }),
    getExpensesByCategory: build.query<ExpenseByCategorySummary[], void>({
      query: () => "/expenses",
      providesTags: ["Expenses"],
    }),
  }),
});

export const {
  useGetDashboardMetricsQuery,
  useGetProductsQuery,
  useCreateProductMutation,
  useGetUsersQuery,
  useGetExpensesByCategoryQuery,
} = api;
