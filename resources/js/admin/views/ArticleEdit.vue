<template>
<div class="admin-article-edit">
    <full-loader />
    <a-container
        :has-gradient="true"
        class="article-panel"
    >
        <div class="article-panel__top">
            <div class="article-panel__title">
                <a-title
                    title="Nuovo Articolo"
                    tag="h2"
                    font-size="h3"
                    :has-padding="false"
                    :has-margin="false"
                />
            </div>
            <div class="article-panel__top-actions">
                <a-button
                    title="Salva Articolo"
                    size="sm"
                    color="teal"
                    :has-margin="false"
                    class="top-action"
                    @click="save"
                />
                <a-button
                    title="Annulla"
                    size="sm"
                    color="secondary"
                    :has-margin="false"
                />
            </div>
        </div>
        <div class="article-panel__center">
            <a-panel-title
                title="Data"
                color="lightest-gray"
                font-weight="300"
                :has-margin="false"
                :has-padding="false"
            />
            <a-datepicker @update="setDate" />
            <a-panel-title
                title="Titolo"
                color="lightest-gray"
                font-weight="300"
                :has-margin="false"
                :has-padding="false"
            />
            <a-input
                placeholder="Titolo..."
                @update="setTitle"
            />

            <a-panel-title
                title="Contenuto"
                color="lightest-gray"
                font-weight="300"
                :has-margin="false"
                :has-padding="false"
            />
            <a-text-editor @update="setContent" />
            <a-panel-title
                title="Files"
                color="lightest-gray"
                font-weight="300"
                :has-margin="false"
                :has-padding="false"
            />
            <article-uploads @uploaded="setFiles" />
        </div>
        <div class="article-panel__actions">
            <a-button
                title="Salva Articolo"
                size="sm"
                color="teal"
                :has-margin="false"
                @click="save"
            />
            <a-button
                title="Annulla"
                size="sm"
                color="secondary"
                :has-margin="false"
            />
        </div>
    </a-container>
</div>
</template>

<script>
import ArticleUploads from '../components/ArticleUploads.vue'
import FullLoader from '../components/FullLoader.vue'
import Test from '../components/Test.vue'

export default {
    name: 'ArticleEdit',
    components: {
        ArticleUploads,
        FullLoader,
    },
    data: function () {
        return {
            form: {
                date: null,
                title: null,
                content: null,
                files: [],
            }
        }
    },
    methods: {
        setDate: function (date) {
            this.form.date = title
        },
        setTitle: function (title) {
            this.form.title = title
        },
        setContent: function (json, html) {
            this.form.content = html
        },
        setFiles: function (uploadedFile) {
            this.form.files.push(uploadedFile.id)
        },
        save: function () {
            let data = new FormData()
            for (let key in this.form) {
                if (this.form.hasOwnProperty(key)) {
                    if (key == 'files') {
                        data.append(key, JSON.stringify(this.form[key]))
                    }
                    else {
                        data.append(key, this.form[key])
                    }
                }
            }

            this.$http.post('/api/admin/save-article', data).then(response => {
                console.log(response);
            })
        },
    },
}
</script>

<style lang="scss" scoped>
@import '~styles/shared';

.article-panel {
    &__top {
        display: flex;
        align-items: center;
    }

    &__top-actions {
        margin-left: auto;
        display: flex;
        justify-content: flex-end;
    }

    &__actions {
        display: flex;
        justify-content: space-around;
    }

    .top-action {
        margin-right: $spacer;
    }

}
</style>
