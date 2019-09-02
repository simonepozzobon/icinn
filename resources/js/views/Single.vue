<template>
<div class="article-single">
    <div class="container">
        <div
            class="article-single__container"
            v-if="!isLoading"
        >
            <div class="article-single__date">
                <h3>{{ dataFormatted }}</h3>
            </div>
            <div class="article-single__title">
                <h1>{{ article.title }}</h1>
            </div>
            <div class="article-single__art">
                <art-divider />
            </div>
            <div
                class="article-single__content"
                v-html="article.content"
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
</div>
</template>

<script>
import ArtDivider from '../components/ArtDivider.vue'
import moment from 'moment'
import PdfDownload from '../components/PdfDownload.vue'
import SmallDivider from '../components/SmallDivider.vue'

export default {
    name: 'Single',
    components: {
        ArtDivider,
        PdfDownload,
        SmallDivider,
    },
    data: function () {
        return {
            articleID: 0,
            article: null,
            isLoading: true,
        }
    },
    computed: {
        dataFormatted: function () {
            if (this.article && this.article.date) {
                return moment(this.article.date).format('Do MMMM YYYY')
            }
            return null
        },
        files: function () {
            if (this.article && this.article.files) {
                return this.article.files
            }
            return []
        }
    },
    methods: {
        getData: function () {
            if (this.articleID != 0) {
                let url = '/api/articles/' + this.articleID
                this.$http.get(url).then(response => {
                    console.log(response.data);
                    this.article = response.data.article
                    this.isLoading = false
                })
            }
        },
    },
    created: function () {
        this.articleID = this.$route.params.id
        this.getData()
    },
}
</script>

<style lang="scss">
@import '~styles/shared';

.article-single {
    background-color: $primary;

    &__container {
        padding-top: $spacer * 4;
        padding-bottom: $spacer * 4;
        background-color: $primary;
        color: $white;
    }

    &__title {
        margin-bottom: $spacer * 4;
    }

    &__content {
        margin-top: $spacer * 4;
        margin-bottom: $spacer * 4;

        img {
            max-width: 100%;
        }

        a {
            color: $white !important;
            text-decoration: underline;
        }

        a:hover {
            color: darken($white, 10) !important;
            text-decoration: underline;
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
