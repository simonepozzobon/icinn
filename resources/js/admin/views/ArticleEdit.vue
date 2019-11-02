<template>
<div class="admin-article-edit">
    <a-container
        :has-gradient="true"
        class="article-panel"
    >
        <div class="article-panel__top">
            <div class="article-panel__title">
                <a-title
                    :title="panelTitle"
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
                    @click="undo"
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
            <a-datepicker
                placeholder="Seleziona una data"
                :initial="initialDate"
                @update="setDate"
            />
            <a-panel-title
                title="Titolo"
                color="lightest-gray"
                font-weight="300"
                :has-margin="false"
                :has-padding="false"
            />
            <a-input
                placeholder="Inserisci un titolo"
                :initial="initial.title"
                @update="setTitle"
            />

            <a-panel-title
                title="Autore"
                color="lightest-gray"
                font-weight="300"
                :has-margin="false"
                :has-padding="false"
            />
            <a-input
                placeholder="Autore"
                :initial="initial.author"
                @update="setAuthor"
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
                class="article-text-editor"
                @update="setContent"
            />
            <a-panel-title
                title="Files"
                color="lightest-gray"
                font-weight="300"
                :has-margin="false"
                :has-padding="false"
            />
            <article-uploads
                :initial="initialFiles"
                @removed="removeFile"
                @uploaded="setFiles"
            />
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
                @click="undo"
            />
        </div>
    </a-container>
</div>
</template>

<script>
import ArticleUploads from '../components/ArticleUploads.vue'
import Test from '../components/Test.vue'
import Utility from '../Utilities'
import mime from 'mime-types'
import moment from 'moment'

export default {
    name: 'ArticleEdit',
    components: {
        ArticleUploads,
    },
    data: function () {
        return {
            initial: {
                title: null,
                author: null,
                date: null,
                content: null,
                files: [],
            },
            form: {
                date: null,
                title: null,
                author: null,
                content: null,
                files: [],
            },
            json: null,
            isSaving: false,
            initialDate: null,
            initialFiles: [],
        }
    },
    watch: {
        initial: function (obj) {
            this.setInitialEditor().then(() => {
                this.setInitialDate().then(() => {
                    this.setInitialFiles()
                })
            })
        },
    },
    computed: {
        isEdit: function () {
            if (this.$route.params && this.$route.params.hasOwnProperty('id')) {
                return true
            }
            return false
        },
        articleId: function () {
            if (this.isEdit) {
                return Number(this.$route.params.id)
            }
            return null
        },
        editor: function () {
            if (this.$refs.editor) {
                return this.$refs.editor.editor
            }
            return null
        },
        panelTitle: function () {
            if (this.isEdit) {
                return 'Modifica Articolo'
            }
            return 'Crea Articolo'
        },
    },
    methods: {
        debug: function () {
            this.form.files = [1, 2, 3, 5]
        },
        getInitialData: function () {
            let url = '/api/admin/articles/' + this.articleId
            this.$http.get(url).then(response => {
                if (response.data.success) {
                    let article = response.data.article
                    this.initial = article
                    this.form = {
                        ...this.form,
                        ...article
                    }

                    console.log(this.form.files);
                }

                // this.debug()
            }).catch(err => {
                this.$root.goTo('articoli')
            })
        },
        setInitialFiles: function () {
            return new Promise((resolve, reject) => {
                if (this.isEdit) {
                    let files = this.initial.files
                    for (let i = 0; i < files.length; i++) {
                        let uuid = Utility.uuid()
                        let newFile = {
                            ...files[i],
                            uuid: uuid,
                            mime: 'application/pdf',
                            src: files[i].url
                        }
                        this.initialFiles.push(newFile)
                    }
                    resolve()
                }
                else {
                    resolve()
                }
            })
        },
        setInitialEditor: function () {
            return new Promise((resolve, reject) => {
                if (this.isEdit) {
                    this.editor.setContent(this.initial.content, true)
                    this.$nextTick(() => {
                        this.$root.objectsLoaded++
                        resolve()
                    })
                }
                else {
                    resolve()
                }
            })
        },
        setInitialDate: function () {
            return new Promise((resolve, reject) => {
                if (this.isEdit) {
                    this.initialDate = new Date(this.initial.date)
                    this.$root.objectsLoaded++
                    resolve()
                }
                else {
                    resolve()
                }
            })
        },
        setDate: function (date) {
            this.form.date = date
        },
        setTitle: function (title) {
            this.form.title = title
        },
        setAuthor: function (author) {
            this.form.author = author
        },
        setContent: function (json, html) {
            this.form.content = html
            this.json = json
        },
        setFiles: function (uploadedFile) {
            this.form.files.push(uploadedFile)
        },
        removeFile: function (removedFile) {
            let idx = this.form.files.findIndex(file => file.id == removedFile)
            if (idx > -1) {
                let cache = Object.assign([], this.form.files)
                cache.splice(idx, 1)
                this.form.files = cache
                // console.log('cahce', idx, cache);
            }

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

            this.$root.objectsToLoad = 2

            // verifica se ci sono immagini nel contenuto
            if (this.json) {
                let editor = this.$refs.editor.editor
                let formattedJson = await this.checkForImages(this.json)
                this.$root.objectsLoaded++
                editor.setContent(formattedJson, true)

                this.$nextTick(() => {
                    this.sendRequest()
                })
            }
            else {
                this.$root.objectsLoaded++
                this.sendRequest()
            }
        },
        sendRequest: function () {
            let data = new FormData()
            for (let key in this.form) {
                if (this.form.hasOwnProperty(key)) {
                    if (key == 'files') {
                        let fileIds = this.form[key].map(file => {
                            return file.id
                        })
                        data.append('attacched', JSON.stringify(fileIds))
                    }
                    else {
                        data.append(key, this.form[key])
                    }
                }
            }

            this.$http.post('/api/admin/articles/update', data).then(response => {
                this.$root.objectsLoaded++
                this.$nextTick(() => {
                    this.isSaving = false
                })
            }).catch(errs => {
                this.$root.objectsLoaded++
                this.$nextTick(() => {
                    this.isSaving = false
                })
            })
        },
        undo: function () {
            this.$root.goTo('articoli')
        },
    },
    created: function () {
        if (this.isEdit) {
            this.$root.objectsToLoad = 2
            this.getInitialData()
        }
    },
}
</script>

<style lang="scss" scoped>
@import '~styles/admin-shared';

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

<style lang="scss">
@import '~styles/admin-shared';
.article-text-editor {
    p {
        font-size: $font-size-base !important;
    }
}
</style>
