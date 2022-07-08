<template>
  <div class="job-item" :class="{ featured: item.featured }">
    <div class="job-wrapper">
        <div class="job-content">
            <div class="avatar">
                <img :src="require(`../assets/img/company-logos/${item.logo}`)" alt="">
            </div>
            <div class="job-body">
                <div class="company-name">
                    <div class="name">{{ item.company }}</div>
                    <div v-if="item.new" class="badge badge--new">NEW!</div>
                    <div v-if="item.featured" class="badge badge--featured">FEATURED</div>
                </div>
                <router-link class="job-position" :to="{name: 'Job', params: { jobId: item.id } }">
                    {{ item.position }}
                </router-link>
                <div class="job-info">
                    <div class="basic-info date">
                        {{ item.postedAt }}
                    </div>
                    <div class="basic-info working-time">
                        {{ item.contract }}
                    </div>
                    <div class="basic-info country">{{ item.location }}</div>
                </div>
            </div>
        </div>
        <div class="filters">
            <span class="btn" @click="filterList">{{ item.role }}</span>
            <span class="btn" @click="filterList">{{ item.level }}</span>
            <span class="btn" @click="filterList" v-for="(languages, index) in item.languages" :key="index">{{ languages }}</span>
            <span class="btn" @click="filterList" v-for="(tools, index) in item.tools" :key="index">{{ tools }}</span>
        </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';

export default {
    name: 'JobItem',
    props: {
        item: {
            type: Object,
            required: true,
        }
    },
    setup() {
        const store = useStore();

        function filterList(e) {
            store.commit('ADD_SEARCH_TAG', e.target.innerText);
        }
    
        return { filterList }
    }
}
</script>

<style lang="scss">
.job-item {
    background: #fff;
    width: 100%;
    border-radius: 5px;
    margin-bottom: 25px;
    border-left: 5px solid transparent;
    -webkit-box-shadow: 0px 24px 40px -18px rgba(92, 164, 164, 0.34);
    -moz-box-shadow: 0px 24px 40px -18px rgba(92, 164, 164, 0.34);
    box-shadow: 0px 24px 40px -18px rgba(92, 164, 164, 0.34);

    &.featured {
        border-left: 5px solid $main-color;
    }

    .job-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center; 
        height: 100%;
        min-height: 152px;
        padding: 20px 40px 23px 35px;
    }

    .job-content {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .avatar {
            width: 88px;
            margin-right: 23px;
            margin-top: 6px;
        }

        .job-body {
            .company-name {
                display: flex;
                align-items: center;
                margin-bottom: 7px;

                .name {
                    font-size: 18px;
                    font-weight: 700;
                    color: $main-color;
                    margin-right: 17px;
                }

                .badge {
                    font-size: 14px;
                    font-weight: 700;
                    border-radius: 50px;
                    padding: 3px 8px 0px;
                    height: 24px;
                    color: #fff;
                    display: flex;
                    align-items: center;

                    &--new {
                        background: $main-color;
                        margin-right: 9px;
                    }

                    &--featured {
                        background: #2a3636;
                    }
                }
            }
            .job-position {
                font-size: 22px;
                line-height: 30px;
                font-weight: 700;
                color: #2a3636;
                transition: color .2s ease;
                cursor: pointer;
                margin-bottom: 8px;
                display: inline-block;
                text-decoration: none;

                &:hover {
                    color: $main-color;
                }
            }
            .job-info {
                display: flex;
                color: #7b8e8e;
                font-size: 17px;

                .basic-info {
                    position: relative;
                    margin-right: 38px;

                    &::after {
                        content: '';
                        position: absolute;
                        right: -21px;
                        top: 5px;
                        width: 4px;
                        height: 4px;
                        border-radius: 50%;
                        background: #bababa;
                    }
                     &:last-of-type {
                        margin-right: 0;
                        &::after {
                            display: none;
                        }
                    }
                }

                .date {
                    margin-right: 38px;
                }
                .working-time {
                    margin-right: 38px;
                }
            }
        }
    }

    .filters {
        display: flex;
        .btn {
            font-size: 15px;
            font-weight: 700;
            border-radius: 5px;
            padding: 3px 10px 0px;
            height: 32px;
            display: flex;
            align-items: center;
            background: #f0f6f4;
            color: $main-color;
            transition: all .2s ease;
            margin-left: 17px;
            cursor: pointer;

            &:hover {
                background: $main-color;
                color: #fff;
            }
        }
    }
}
</style>