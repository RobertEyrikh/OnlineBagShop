export interface reviewInterface {
  userId: string
  itemId: string
  review: string
  rate: number
}

export class Review {
  userId: string
  itemId: string
  review: string
  rate: number

  constructor(options: reviewInterface) {
    this.userId = options.userId
    this.itemId = options.itemId
    this.review = options.review
    this.rate= options.rate
  }
}