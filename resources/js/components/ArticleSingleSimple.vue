<template>
<div class="article-simple">
    <div class="article-simple__container">
        <div class="article-simple__date">
            {{ dataFormatted }}
        </div>
        <div class="article-simple__details">
            <div class="article-simple__title">
                <a
                    href="#"
                    class="article-simple__title-link"
                    @click.prevent="readMore"
                >
                    <h2>
                        {{ item.title }}
                    </h2>
                </a>
            </div>
            <div class="article-simple__description">
                {{ shortDescription }}
            </div>
            <div class="article-simple__link">
                <button
                    class="btn btn-outline-white"
                    @click.prevent="readMore"
                >
                    Read more
                </button>
            </div>
        </div>
    </div>
    <small-divider class="article-simple__divider" />
</div>
</template>

<script>
const clipper = require('text-clipper')
import moment from 'moment'
import SmallDivider from './SmallDivider.vue'
import stripHtml from 'string-strip-html'

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
                return moment(this.item.date).format('Do MMM YYYY')
            }
            return null
        },
        shortDescription: function () {
            if (this.item && this.item.content) {
                let short = clipper(this.item.content, 400, {
                    html: true,
                    imageWeight: 0,
                })
                return stripHtml(short)
            }
            return null
        }
    },
    methods: {
        readMore: function () {
            this.$root.goToWithParams('single', {
                id: this.item.id
            })
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
        flex-direction: column;
        justify-content: center;
        align-items: center;

        @include media-breakpoint-up('sm') {
            flex-direction: row;
            justify-content: flex-start;
            align-items: flex-start;
        }
    }

    &__divider {
        margin-bottom: $spacer * 4;
        max-width: 150px;
    }

    &__date {
        font-size: $h3-font-size;
        font-weight: $headings-font-weight;
        padding-right: $spacer;
        margin-bottom: $spacer;

        @include media-breakpoint-up('sm') {
            flex: 1 1 25%;
            max-width: 25%;
            margin-bottom: 0;
        };
    }

    &__details {
        display: flex;
        flex-direction: column;

        @include media-breakpoint-up('sm') {
            flex: 1 1 60%;
            max-width: 60%;
        };
    }

    &__title-link {
        text-decoration: none;

        &:hover {
            text-decoration: underline;
            color: $white;
        }
    }

    &__title {
        font-size: $h3-font-size;
    }

    &__description {
        margin-top: $spacer * 1.618;
    }

    &__link {
        margin-top: $spacer * 1.618;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        @include media-breakpoint-up('sm') {
            justify-content: flex-start;
        };
    }
}
</style>
