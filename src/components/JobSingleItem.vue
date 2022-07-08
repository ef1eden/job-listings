<template>
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
                    <div class="job-position no-link">
                        {{ singleJobsData.position }}
                    </div>
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
                <span @click="filterList" class="btn">{{ singleJobsData.role }}</span>
                <span @click="filterList" class="btn">{{ singleJobsData.level }}</span>
                <span @click="filterList" class="btn" v-for="(languages, index) in singleJobsData.languages" :key="index">{{ languages }}</span>
                <span @click="filterList" class="btn" v-for="(tools, index) in singleJobsData.tools" :key="index">{{ tools }}</span>
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
</template>

<script>
import { ref } from '@vue/reactivity';
import { useRoute } from 'vue-router';
import { onBeforeMount } from '@vue/runtime-core';
import { useStore } from 'vuex';

export default {
    setup() {
        const singleJobsData = ref(null);
        const route = useRoute();
        const store = useStore();
        
        function prepareData() {        
            const data = ref(store.state.jobList);
            const post = data.value.filter(item => {
                let currentId = route.params.jobId;
                return currentId == item.id;
            });

            return singleJobsData.value = post[0];
        }

        async function filterList(e) {
            await store.dispatch('ADD_SEARCH_TAG_SINGLE_ITEM');
            await store.commit('ADD_SEARCH_TAG', e.target.innerText);
        }

        onBeforeMount(() => {
            prepareData();
        })

        return { singleJobsData, filterList }
    }
}
</script>

<style lang="scss" scoped>
.job-item {
    margin-top: -35px;
    position: relative;
    z-index: 1;
    .job-wrapper {
        padding: 20px 40px 23px 35px;
    }
    .job-desc {
        padding-top: 50px;
        border-top: 1px solid #eee;
        padding: 30px 40px 13px 35px;
        
        p {
            line-height: 24px;
        }
    }

    .job-position {
        &.no-link {
            &:hover {
                color: #2a3636;
                cursor: initial;
            }
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