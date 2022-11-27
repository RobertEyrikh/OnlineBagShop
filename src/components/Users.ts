export interface userInterface {
  phone: number
  name: string
  email: string
  uid: string
  birthday: string
  basket: {string: string}
  wishlist: {string: string}
}

export class User {
  phone: number
  name: string
  email: string
  uid: string
  birthday: string
  basket: { string: string }
  wishlist: { string: string }

  constructor(options: userInterface) {
    this.phone = options.phone
    this.name = options.name
    this.email = options.email
    this.uid = options.uid
    this.birthday = options.birthday
    this.basket = options.basket
    this.wishlist = options.wishlist
  }
}