export interface reviewInterface {
  email: string
  item: string
  review: string
}

export class Review {
  email: string
  item: string
  review: string

  constructor(options: Review) {
    this.email = options.email
    this.item = options.item
    this.review = options.review
    this.email = options.email
  }
}