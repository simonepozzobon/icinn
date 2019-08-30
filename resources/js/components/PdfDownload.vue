<template>
<div class="pdf-download">
    <button
        class="btn btn-outline-white"
        target="_blank"
        @click.prevent="download"
    >
        Download pdf
    </button>
</div>
</template>

<script>
export default {
    name: 'PdfDownload',
    props: {
        url: {
            type: String,
            default: null,
        },
        title: {
            type: String,
            default: null,
        },
    },
    methods: {
        download: function () {
            if (this.url) {
                alert('download')
            }
        },
    },
}
</script>

<style lang="scss" scoped>
@import '~styles/shared';
</style>
