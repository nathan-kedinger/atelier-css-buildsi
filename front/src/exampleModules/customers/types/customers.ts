export type Customers = {
  id: number,
  name: string,
  country: Country,
  company: string,
  date: Date,
  status: string,
  verified: boolean,
  activity: number,
  representative: Representative
  balance: number
}

type Country = {
  code: string,
  name: string
}

type Representative = {
  name: string,
  image: string
}

export const defaultCustomer: Customers = {
  id: 0,
  name: '',
  country: {
    code: '',
    name: ''
  },
  company: '',
  date: new Date(),
  status: '',
  verified: false,
  activity: 0,
  representative: {
    name: '',
    image: ''
  },
  balance: 0
}
