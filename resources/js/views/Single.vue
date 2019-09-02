<template>

</template>

<script>
export default {
    name: 'Single',
    data: function () {
        return {
            articleID: 0,
        }
    },
    methods: {
        getData: function () {
            if (this.articleID != 0) {
                let url = '/api/articles/' + this.articleID
                this.$http.get(url).then(response => {
                    console.log(response.data);
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

<style lang="scss" scoped>
@import '~styles/shared';
</style>
