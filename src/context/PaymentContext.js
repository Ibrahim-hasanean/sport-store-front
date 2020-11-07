import {useContext,createContext} from 'react';
export const PaymentContext = createContext()
const usePaymentContext = () => {
    return useContext(PaymentContext);
}

export default usePaymentContext
