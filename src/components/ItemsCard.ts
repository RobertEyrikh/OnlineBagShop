export interface ItemsCardInterface {
    image: any
    price: number | string
    title: string
    id: number
    category: string
    body: string
}
export class ItemsCard {
    image: string
    price: number | string
    title: string
    id: number
    category: string
    body: string

    constructor(options: ItemsCardInterface) {
        this.image = options.image
        this.price = options.price
        this.title = options.title
        this.id = options.id
        this.category = options.category
        this.body = options.body
    }
}