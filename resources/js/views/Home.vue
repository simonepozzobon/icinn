<template>
<div class="icinn">
    <div class="art-divider container">
        <art-divider />
    </div>
    <articles-list-simple :articles="articles" />

    <div class="icinn__archive">
        <button
            class="btn btn-outline-white"
            @click.prevent="goToArchive"
        >
            Archive
        </button>
    </div>
</div>
</template>

<script>
import ArtDivider from '../components/ArtDivider.vue'
import ArticlesListSimple from '../components/ArticlesListSimple.vue'

export default {
    name: 'Home',
    components: {
        ArtDivider,
        ArticlesListSimple,
    },
    data: function () {
        return {
            articles: [],
        }
    },
    methods: {
        getData: function () {
            this.$http.get('/api/articles').then(response => {
                this.articles = response.data.articles
            })
        },
        goToArchive: function () {
            this.$root.goTo('archive')
        }
    },
    created: function () {
        this.getData()
    },
}
</script>

<style lang="scss" scoped>
@import '~styles/shared';

.icinn {
    background-color: $primary;

    &__archive {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-bottom: $spacer * 1.618;
    }
}

.art-divider {
    padding-top: $spacer * 4;
}

.footer-nav {
    background-color: $primary;
    display: flex;
    padding-bottom: $spacer * 4;
    justify-content: center;
    align-items: center;

    &__link {
        color: $white;
        text-decoration: underline;
        font-size: $font-size-lg;
    }
}
</style>
