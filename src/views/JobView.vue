<template>
  <div>
    <div class="job-item" :class="{ featured: singleJobsData.featured }">
        <div class="job-wrapper">
            <div class="job-content">
                <div class="avatar">
                    <img :src="require(`../assets/img/company-logos/${singleJobsData.logo}`)" alt="">
                </div>
                <div class="job-body">
                    <div class="company-name">
                        <div class="name">{{ singleJobsData.company }}</div>
                        <div v-if="singleJobsData.new" class="badge badge--new">NEW!</div>
                        <div v-if="singleJobsData.featured" class="badge badge--featured">FEATURED</div>
                    </div>
                    <router-link class="job-position" :to="{name: 'Job', params: { jobId: singleJobsData.id } }">
                        {{ singleJobsData.position }}
                    </router-link>
                    <div class="job-info">
                        <div class="basic-info date">
                            {{ singleJobsData.postedAt }}
                        </div>
                        <div class="basic-info working-time">
                            {{ singleJobsData.contract }}
                        </div>
                        <div class="basic-info country">{{ singleJobsData.location }}</div>
                    </div>
                </div>
            </div>
            <div class="filters">
                <span class="btn">{{ singleJobsData.role }}</span>
                <span class="btn">{{ singleJobsData.level }}</span>
                <span class="btn" v-for="(languages, index) in singleJobsData.languages" :key="index">{{ languages }}</span>
                <span class="btn" v-for="(tools, index) in singleJobsData.tools" :key="index">{{ tools }}</span>
            </div>
        </div>
        <div class="job-desc">
            <p>{{ singleJobsData.desc }}</p>
        </div>
        <router-link class="back-home" :to="{name: 'Home'}">
            <span class="btn">
                Back to homepage
            </span>
        </router-link>
    </div>
  </div>
</template>

<script>
import jsonData from '@/assets/json/data.json';
import { ref } from '@vue/reactivity';
import { useRoute } from 'vue-router';
import { onBeforeMount } from '@vue/runtime-core';
export default {
    name: 'JobView',
    setup() {
        const jobsData = ref(jsonData);
        const singleJobsData = ref(null);
        const route = useRoute();

        function prepareData() {
            const data = ref(jobsData.value);

            const post = data.value.filter(item => {
                let currentId = route.params.jobId;
                return currentId == item.id;
            });

            return singleJobsData.value = post[0];
        }

        onBeforeMount(() => {
            prepareData();
        })


        return { jobsData, singleJobsData }
    },
}
</script>

<style lang="scss" scoped>
.job-item {
    margin-top: -35px;
    position: relative;
    z-index: 1;
    .job-wrapper {
        padding: 43px 40px 0 35px;
    }
    .job-desc {
        margin-top: 50px;
        padding-top: 50px;
        border-top: 1px solid #eee;
        padding: 30px 40px 13px 35px;
        
        p {
            line-height: 24px;
        }
    }

    .back-home {
        display: flex;
        text-decoration: none;
        padding: 0 40px 43px 35px;

        .btn {
            font-size: 17px;
            font-weight: 700;
            border-radius: 5px;
            padding: 3px 20px 0px;
            height: 42px;
            display: flex;
            align-items: center;
            background: #f0f6f4;
            color: $main-color;
            transition: all .2s ease;
            cursor: pointer;
            

            &:hover {
                background: $main-color;
                color: #fff;
            }
        }
    }
}
</style>