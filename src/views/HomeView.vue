<template>
  <div class="home">
    <SearchBar />
    <JobItem v-for="(item, index) in jobsData" :key="index" :item="item" />
  </div>
</template>

<script>
import jsonData from '@/assets/json/data.json';
import JobItem from '@/components/JobItem.vue';
import SearchBar from '@/components/SearchBar.vue';
import { ref } from '@vue/reactivity';

export default {
  name: 'HomeView',
  components: {
    SearchBar, JobItem
  },
  setup() {
    const jobsData = ref(jsonData);

    return { jobsData }
  }
}
</script>