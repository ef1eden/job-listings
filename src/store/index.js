import { createStore } from 'vuex'
import offersData from '@/assets/json/data.json'
import router from '@/router';

export default createStore({
  state: {
    jobList: offersData,
    searchActive: null,
    tags: [],
    activeTagsIds: [],
  },
  mutations: {
    ADD_SEARCH_TAG(state, nameTag) {
      if(!state.tags.length > 0) {
        state.searchActive = true;
      } 
      if(!state.tags.includes(nameTag)) {
        state.tags.push(nameTag);
      }
    },
    ADD_SEARCH_TAG_ID(state, nameTagId) {
        state.activeTagsIds.push(nameTagId);
    },
    DELETE_TAG(state, payload) {
      state.tags = state.tags.filter(tag => tag !== payload);
      if(!state.tags.length > 0) {
        state.searchActive = false;
      } 
    },
    RESET_TAG_IDS(state) {
      state.activeTagsIds = [];
    },
  },
  actions: {
    async ADD_SEARCH_TAG_SINGLE_ITEM() {
      await router.push({ name: 'Home' });
    },  
  },
  modules: {
  }
})