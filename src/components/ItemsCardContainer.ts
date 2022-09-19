import {ItemsCard, ItemsCardInterface} from "@/components/ItemsCard";

export default class ItemsCardContainer {
    data: ItemsCardInterface[]

    constructor(options: ItemsCard[]) {
        this.data = options
    }

    newCardAdd(newCard: ItemsCard) {
        this.data.push(newCard)
        localStorage.setItem("ItemsBags",JSON.stringify(this.data))
    }

    cardDelete(id: number) {
        this.data.forEach((item, index) => {
            if (item.id === id) {
                this.data.splice(index, 1)
            }
        })
    }
}