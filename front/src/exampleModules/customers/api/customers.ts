import type { Customers } from '@/modules/customers/types/customers.ts'

export const postCustomer = async (customer: Customers): Promise<Customers> => {
    if(customer){
      console.log(customer)
    }
  return  customer
}
