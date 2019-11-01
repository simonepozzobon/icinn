<template>
<div class="icinn">
    <div class="art-divider container">
        <art-divider />
    </div>
    <articles-list-simple :articles="articles" />

    <div class="icinn__archive">
        <button
            class="btn btn-outline-white"
            @click.prevent="goToHome"
        >
            Back Home
        </button>
    </div>
</div>
</template>

<script>
import ArtDivider from '../components/ArtDivider.vue'
import ArticlesListSimple from '../components/ArticlesListSimple.vue'

export default {
    name: 'Archive',
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
            this.$http.get('/api/articles/archives').then(response => {
                console.log(response);
                this.articles = response.data.articles
            })
        },
        goToHome: function () {
            this.$root.goTo('home')
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
