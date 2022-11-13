import { ref, onMounted } from 'vue';
import ItemsCardContainer from '@/components/ItemsCardContainer';
import { ItemsCard, ItemsCardInterface } from '@/components/ItemsCard';
import axios from 'axios';

export class PostCards { 
  static url = 'https://lethermanshop-default-rtdb.asia-southeast1.firebasedatabase.app/posts'

  // constructor(private axios: any) {
  // }

    create(itemCard: ItemsCardInterface) {
      return axios.post(`${PostCards.url}.json`, itemCard)
      
     }
}