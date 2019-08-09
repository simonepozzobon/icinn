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
                    :disable="isSaving"
                    :has-spinner="isSaving"
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
            <a-text-editor
                ref="editor"
                @update="setContent"
            />
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
                :disable="isSaving"
                :has-spinner="isSaving"
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
import Utility from '../Utilities'
import mime from 'mime-types'

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
            },
            json: null,
            isSaving: false,
        }
    },
    methods: {
        setDate: function (date) {
            this.form.date = date
        },
        setTitle: function (title) {
            this.form.title = title
        },
        setContent: function (json, html) {
            this.form.content = html
            this.json = json
        },
        setFiles: function (uploadedFile) {
            this.form.files.push(uploadedFile.id)
        },
        checkForImages: async function (Obj) {
            let buf
            if (Obj instanceof Array) {
                buf = [] // create an empty array
                let i = Obj.length
                while (i--) {
                    buf[i] = await this.checkForImages(Obj[i]) // recursively clone the elements
                }
                return buf
            }
            else if (Obj instanceof Object) {
                buf = {} // create an empty object
                for (let k in Obj) {
                    if (k == 'type' && Obj[k] == 'image') {
                        let id = Utility.uuid()
                        Obj = await this.saveImage(Obj, id)
                    }
                    buf[k] = await this.checkForImages(Obj[k]) // recursively clone the value
                }
                return buf
            }
            else {
                return Obj
            }
        },
        saveImage: async function (obj, id = null) {
            let ext, filename, file
            let attrs = obj.attrs
            let dataUri = attrs.src

            let isDataURL = Utility.isDataURL(dataUri)
            if (isDataURL) {
                let blob = Utility.createBlobFromData(dataUri)
                ext = mime.extension(blob.type)
                filename = Utility.uuid() + '.' + ext
                file = new File([blob], filename)

                // formo la richiesta
                let data = new FormData()
                data.append('file', file)
                const request = await this.waitUpload(data, id)

                // Formo il nuovo oggetto
                const newObj = Object.assign({}, obj)
                newObj.attrs.src = request.data.image

                return newObj
            }
            else {
                return obj

            }
        },
        waitUpload: async function (fileData, id) {
            const request = await this.$http.post('/api/admin/images/upload', fileData).then(response => {
                return response
            })
            return request
        },
        save: async function () {
            this.isSaving = true

            // verifica se ci sono immagini nel contenuto
            if (this.json) {
                let editor = this.$refs.editor.editor
                let formattedJson = await this.checkForImages(this.json)
                editor.setContent(formattedJson, true)

                this.$nextTick(() => {
                    this.sendRequest()
                })
            }
            else {
                this.sendRequest()
            }
        },
        sendRequest: function () {
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

            this.$http.post('/api/admin/articles/update', data).then(response => {
                console.log(response.data);
                this.$nextTick(() => {
                    this.isSaving = false
                })
            }).catch(errs => {
                this.$nextTick(() => {
                    this.isSaving = false
                })
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
