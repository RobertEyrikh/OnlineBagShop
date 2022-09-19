export interface ItemsCardInterface {
    image: any
    price: number | string
    title: string
    id: number
}
export class ItemsCard {
    image: string
    price: number | string
    title: string
    id: number
    shoppingBag: string

    constructor(options: ItemsCardInterface) {
        this.image = options.image
        this.price = options.price
        this.title = options.title
        this.id = options.id
        this.shoppingBag = '../assets/shoppingBag.webp'
    }
}

