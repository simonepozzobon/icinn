<template>
<div class="article-simple">
    <div class="article-simple__container">
        <div class="article-simple__date">
            {{ dataFormatted }}
        </div>
        <div class="article-simple__details">
            <div class="article-simple__title">
                <h2>
                    {{ item.title }}
                </h2>
            </div>
            <div class="article-simple__description">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                est
                laborum.
            </div>
            <div class="article-simple__link">
                <button class="btn btn-outline-white">Read more</button>
            </div>
        </div>
    </div>
    <small-divider class="article-simple__divider" />
</div>
</template>

<script>
import SmallDivider from './SmallDivider.vue'

import moment from 'moment'

export default {
    name: 'ArticlesListSimple',
    components: {
        SmallDivider,
    },
    props: {
        item: {
            type: Object,
            default: function () {
                return {}
            },
        },
    },
    computed: {
        dataFormatted: function () {
            if (this.item && this.item.date) {
                return moment(this.item.date).format('Do MMMM YYYY')
            }
            return null
        },
    },
}
</script>

<style lang="scss" scoped>
@import '~styles/shared';

.article-simple {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &__container {
        width: 100%;
        display: flex;
        color: $white;
        padding-bottom: $spacer * 4;
    }

    &__divider {
        margin-bottom: $spacer * 4;
        max-width: 150px;
    }

    &__date {
        flex: 1 1 25%;
        max-width: 25%;
        font-size: $h3-font-size;
        font-weight: $headings-font-weight;
        padding-right: $spacer;
    }

    &__details {
        flex: 1 1 60%;
        max-width: 60%;
        display: flex;
        flex-direction: column;
    }

    &__title {
        font-size: $h3-font-size;
    }

    &__description {
        margin-top: $spacer * 1.618;
    }

    &__link {
        margin-top: $spacer * 1.618;
        // width: 100%;
        // display: flex;
        // justify-content: center;
        // align-items: center;
    }
}
</style>
