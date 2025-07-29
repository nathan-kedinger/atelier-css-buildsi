import type { Customers } from '@/exampleModules/customers/types/customers'
import { customersData } from '@/exampleModules/customers/data/customers'

export function serviceCustomers(){

  const getCustomers = (): Customers[] => {
    return [...(customersData.value || [])].map((d) => {
      d.date = new Date(d.date)
      return d
    })
  }

  return{
    getCustomers
  }
}





