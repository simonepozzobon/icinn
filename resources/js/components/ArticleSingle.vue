<template>
<div class="container">
    <div class="article-single">
        <div class="article-single__date">
            <h3>{{ dataFormatted }}</h3>
        </div>
        <div class="article-single__title">
            <h1>{{ item.title }}</h1>
        </div>
        <div class="article-single__art">
            <art-divider />
        </div>
        <div
            class="article-single__content"
            v-html="item.content"
        >

        </div>
        <div
            class="article-single__downloads"
            v-for="(file, i) in files"
            :key="i"
        >
            <pdf-download
                :url="file.url"
                :title="file.title"
            />
        </div>
        <div class="article-single__div">
            <small-divider />
        </div>
    </div>
</div>
</template>

<script>
import ArtDivider from './ArtDivider.vue'
import moment from 'moment'
import PdfDownload from './PdfDownload.vue'
import SmallDivider from './SmallDivider.vue'

export default {
    name: 'ArticleSingle',
    components: {
        ArtDivider,
        PdfDownload,
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
        files: function () {
            if (this.item && this.item.files) {
                return this.item.files
            }
            return []
        }
    },
    mounted: function () {
        // console.log(this.files);
    },
}
</script>

<style lang="scss">
@import '~styles/shared';

.article-single {
    padding-top: $spacer * 4;
    padding-bottom: $spacer * 4;
    background-color: $primary;
    color: $white;

    &__title {
        margin-bottom: $spacer * 4;
    }

    &__content {
        margin-top: $spacer * 4;
        margin-bottom: $spacer * 4;

        img {
            max-width: 100%;
        }
    }

    &__downloads {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: $spacer * 3;
    }

    &__div {
        display: flex;
        justify-content: center;
        align-items: center;
    }

}
</style>
