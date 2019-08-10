<template>
<div>
    <div class="row no-gutters p-4">
        <div class="col d-flex justify-content-center">
            <img
                src="images/logo.svg"
                alt="Istituto per la Cultura e l'Innovazione"
                class="custom-img"
            />
        </div>
    </div>
    <articles-list>
    </articles-list>
    <footer class="bg-blue text-white pb-5 w-100">
        <div class="container bg-blue">
            <div class="row no-gutters bg-blue">
                <div
                    class="col"
                    align="center"
                >
                    <p style="font-size: 1.265rem;">
                        Istituto per la Cultura dell’Innovazione (I.C.I.) - Via Reno 21, 00198 Roma - C.F. 97988320582 - <a href="mailto:info@icinn.eu">info@icinn.eu</a>
                    </p>
                </div>
            </div>
        </div>
    </footer>
</div>
</template>

<script>
import ArticlesList from './components/ArticlesList.vue'

export default {
    name: 'App',
    components: {
        ArticlesList,
    },
}
</script>

<style lang="scss" scoped>
@import '~styles/shared';
</style>
