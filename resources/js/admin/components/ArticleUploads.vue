<template>
<div class="article-uploads mb-5">
    <div class="article-uploads__files">
        <div
            class="article-uploads__single"
            v-for="(file, i) in files"
            :key="file.uuid"
        >
            <files-container
                :file-obj="file"
                :delay="i"
                @update="updateFileObj"
                @remove="removeFileObj"
                @show-btn="showBtn"
                @uploaded="uploaded"
            />
        </div>
    </div>
    <div class="article-uploads__add">
        <a-button
            v-if="hasBtn"
            title="Aggiungi un altro file"
            color="teal"
            size="sm"
            align="center"
            @click="addFile"
        />
    </div>
</div>
</template>

<script>
import {
    TimelineMax
}
from 'gsap'
import FilesContainer from './FilesContainer.vue'
import Utility from '../Utilities'

export default {
    name: 'ArticleUploads',
    components: {
        FilesContainer,
    },
    props: {
        initial: {
            type: Array,
            default: function () {
                return []
            },
        },
    },
    data: function () {
        return {
            files: [],
            hasBtn: false,
        }
    },
    watch: {
        files: function (files) {
            if (files.length > 0) {
                this.hasBtn = false
            }
        },
        initial: function (arr) {
            this.files = arr
        },
    },
    methods: {
        debug: function (uuid) {
            this.updateFileObj({
                    name: 'gianni.pdf',
                    type: 'application/pdf'
                },
                '',
                uuid
            )
        },
        addFile: function () {
            let uuid = Utility.uuid()
            // console.log('adding file', uuid);
            this.files.push({
                uuid: uuid,
                file: null,
                mime: null,
                src: '',
            })

            this.$nextTick(() => {
                this.hasBtn = false
            })
            // setTimeout(() => {
            //     this.debug(uuid)
            // }, 1500)
        },
        updateFileObj: function (file, src, uuid) {
            let idx = this.files.findIndex(file => file.uuid === uuid)
            if (idx > -1) {
                let newFile = {
                    ...this.files[idx],
                    file: file,
                    mime: file.type,
                    src: src,
                }
                this.files.splice(idx, 1, newFile)
            }
        },
        removeFileObj: function (uuid) {
            let idx = this.files.findIndex(file => file.uuid === uuid)
            if (idx > -1) {
                // console.log(idx);
                this.$emit('removed', this.files[idx].id)
                this.files.splice(idx, 1)

                if (this.files.length == 0) {
                    this.addFile()
                }
            }
        },
        showBtn: function () {
            this.hasBtn = true
        },
        uploaded: function (uploadedFile) {
            this.$emit('uploaded', uploadedFile)
        },
    },
    created: function () {},
    mounted: function () {
        this.addFile()
    },
}
</script>

<style lang="scss" scoped>
@import '~styles/admin-shared';

.file-loader {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    &__progress {
        width: 100%;
        height: $spacer * 1.618;
    }

    &__bar {
        color: $light-gray;
        padding: $spacer / 2;
        @include gradient-directional(lighten($teal, 30), lighten($teal, 20), 125deg);
    }
}
</style>
