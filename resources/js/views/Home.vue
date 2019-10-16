<template>
<div class="icinn">
    <div class="art-divider container">
        <art-divider />
    </div>
    <articles-list-simple :articles="articles" />
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
