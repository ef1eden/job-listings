<template>
  <div class="filter-bar">
    <ul>
        <li class="btn" v-for="tag in tags" :key="tag">
            <span class="name-tag">{{ tag }}</span>
            <span class="remove-tag" @click="deleteTag(tag)">
                <img src="@/assets/img/icon-remove.svg" alt="">
            </span>
        </li>
    </ul>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core';
import { useStore } from 'vuex'
export default {
    name: 'FilterBar',
    setup() {
        const store = useStore();

        const tags = computed(() => store.state.tags);

        function deleteTag(tag) {
            store.commit('DELETE_TAG', tag);
        }

        return { tags, deleteTag }
    }
}
</script>

<style lang="scss" scoped>
.filter-bar {
    position: relative;
    z-index: 1;
    width: 100%;
    min-height: 72px;
    border-radius: 5px;
    display: flex;
    align-content: center;
    background: #fff;
    margin-bottom: 40px;
    -webkit-box-shadow: 0px 24px 40px -18px rgba(92, 164, 164, 0.34);
    -moz-box-shadow: 0px 24px 40px -18px rgba(92, 164, 164, 0.34);
    box-shadow: 0px 24px 40px -18px rgba(92, 164, 164, 0.34);

    ul {
        display: flex;
        flex-wrap: wrap;
        padding: 4px 42px 15px;
        margin-bottom: -5px;

        .btn {
            height: 32px;
            border-radius: 5px;
            display: flex;
            margin: 0 17px 10px 0;
            background: #f0f6f4;

            .name-tag {
                font-size: 16px;
                font-weight: 700;
                padding: 5px 10px 3px 7px;
                height: 32px;
                display: flex;
                align-items: center; 
                color: $main-color;                
            }
            .remove-tag {
                background: $main-color;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 32px;
                transition: all .2s ease;
                border-radius: 0 5px 5px 0;
                cursor: pointer;

                img {
                    width: 14px;
                    height: 14px;
                }

                &:hover {
                    background: #2a3636;
                }
            }
        }
    }
}
</style>