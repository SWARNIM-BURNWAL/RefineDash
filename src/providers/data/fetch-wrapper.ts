import { RedditSquareFilled } from "@ant-design/icons";
import { GraphQLError, GraphQLFormattedError } from "graphql";

type Error = {
    message: string;
    status_code?: string;
    error_messages?: string;
}
const customFetch = async (url: string, options: RequestInit) => {
  const accessToken = localStorage.getItem("access_token");
  const headers = options.headers as Record<string, string>;
  return await fetch(url, {
    ...options,
    headers: {
      ...headers,
      Authorization: headers?.Authorization || `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "Apllo-Require-preflight": "true",
    },
  });
};

const getGraphQLErrors = (body:Record<"errors",GraphQLFormattedError[]| undefined>):Error|null  =>{
   if (!body) {
    return { message: "No response from server",status_code: 'INTERNAL_SERVER_ERROR' };
   }
   if('error'in body){
     return {
         message:"Error in response from server",
         error_messages:body?.errors?.map((error)=>error.message).join(''),
     }
   }
   return null;
}


export const fetchWrapper = async (url: string, options: RequestInit) => {
    const response = await customFetch(url, options);
    const cloneResponse= response.clone();
    const body = await cloneResponse.json();    
    if (!response.ok) {
        const error = getGraphQLErrors(body);
        if(error){
            throw error;
        }
        throw new Error(body.message);
    }
    return response;

};