<template>
  <div class="home">
    <FilterBar v-show="filterActive" />
    <div v-if="jobList.length > 0">
      <JobItem v-for="(item, index) in filteredData" :key="index" :item="item" />
    </div>
    <div v-else class="without-offers">
      <h2>Currently we don't have a job offers</h2>
    </div>
  </div>
</template>

<script>
import JobItem from '@/components/JobItem.vue';
import FilterBar from '@/components/FilterBar.vue';
import { ref } from '@vue/reactivity';
import { useStore } from 'vuex';
import { computed, watch } from '@vue/runtime-core';

export default {
  name: 'HomeView',
  components: {
    FilterBar, JobItem
  },
  setup() {
    const store = useStore();
    const tagChange = computed(() => store.state.tags);
    const activeTagsIds = computed(() => store.state.activeTagsIds);

    const mapTags = store.state.jobList.map(job => {
      return [job.id, job.role, job.level, ...job.languages, ...job.tools];
    });
    
    watch(
      () => tagChange,
      (e) => {
        store.commit('RESET_TAG_IDS');
        e.value.forEach(element => {

            mapTags.forEach(element2 => {

                element2.forEach(element3 => {
                  if(element === element3) {

                    if(!activeTagsIds.value.includes(element3)) {
                      store.commit('ADD_SEARCH_TAG_ID', element2[[0]]);
                    }
                  }    
                });      
            }); 
        });

      },
      { deep: true }
    )

    const filteredData = computed(() => {
        return store.state.jobList.filter((item) => {        
          let countActiveTags = store.state.tags.length;

          if(countActiveTags === 1) { 
            return activeTagsIds.value.includes(item.id);
          } else if (countActiveTags > 1) {
            const uniq = activeTagsIds.value
              .map((tagid) => {
                return {
                  count: 1,
                  tagid: tagid
                };
              })
              .reduce((result, b) => {
                result[b.tagid] = (result[b.tagid] || 0) + b.count;

                return result;
              }, {});
            const duplicates = Object.keys(uniq).filter((a) => uniq[a] > tagChange.value.length - 1);

            const filteredListItem = ref(null);
            duplicates.forEach(repeatedValue => {
              if(repeatedValue == item.id) {
                filteredListItem.value = repeatedValue;
                return filteredListItem.value;
              }           
            });
            
            return item.id == filteredListItem.value; 
          }

          return item;
        });
    });

    return { 
      filterActive: computed(() => store.state.searchActive),
      jobList: computed(() => store.state.jobList),
      filteredData
    }
  }
}
</script>


<style lang="scss" scoped>
  .home {
    margin-top: -35px;
    z-index: 1;
    position: relative;

    .without-offers {
      h2 {
        text-align: center;
        margin-top: 140px;
        font-size: 40px;
        line-height: 48px;
      }
    }
  }
</style>