import { useMutation } from "convex/react";
import { useState } from "react";


export const useApiMutation = (mutationFunc:any) => {

    const [isLoading, setIsLoading] = useState(false);
    const apiMutation = useMutation(mutationFunc)

    const mutate = (payload:any) => {
        setIsLoading(true);
        return apiMutation(payload)
           .finally(() => setIsLoading(false))
           .then((result) => { return result})
           .catch((error) => {throw error})
    }

    return {mutate, isLoading};
}
