<template>
<div class="icinn">
    <articles-list-simple :articles="articles">
    </articles-list-simple>
    <!-- <div class="footer-nav">
        <a
            href="#"
            class="footer-nav__link btn btn-link"
            @click.prevent="$root.goTo('archive')"
        >
            Archive
        </a>
    </div> -->
</div>
</template>

<script>
import ArticlesListSimple from '../components/ArticlesListSimple.vue'
export default {
    name: 'Home',
    components: {
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
    mounted: function () {
        console.log('cioa');
    },
}
</script>

<style lang="scss" scoped>
@import '~styles/shared';

.icinn {
    background-color: $primary;
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
