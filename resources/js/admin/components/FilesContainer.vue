<template>
<div class="file-container">
    <a-file-input
        ref="input"
        class="file-container__input"
        accept="application/pdf"
        @update="update"
    />
    <div
        ref="preview"
        class="file-container__preview"
    >
        <div class="preview">
            <div class="preview__name">
                {{ filename }}
            </div>
            <div class="preview__remove">
                <button
                    class="btn btn-link btn-sm"
                    @click.prevent="remove"
                >
                    x rimuovi
                </button>
            </div>
        </div>
    </div>
    <div
        class="file-container__loader file-loader"
        ref="loader"
    >
        <div
            class="progress file-loader__progress"
            ref="progress"
        >
            <div
                class="progress-bar file-loader__bar"
                role="progressbar"
                :aria-valuenow="progressValue"
                aria-valuemin="0"
                aria-valuemax="100"
                :style="progress"
            >
                {{ percent }}
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    TimelineMax
}
from 'gsap'
require('gsap/CSSPlugin')

export default {
    name: 'FilesContainer',
    props: {
        fileObj: {
            type: Object,
            default: function () {
                return {}
            },
        },
        delay: {
            type: Number,
            default: 0,
        },
    },
    data: function () {
        return {
            progressValue: 0,
        }
    },
    watch: {
        fileObj: {
            handler: function () {
                this.$emit('fileUpdated')
            },
            deep: true
        },
        progressValue: function (percent) {
            if (percent >= 100) {
                this.hideLoader()
            }
        },
    },
    computed: {
        filename: function () {
            if (!this.isEdit && this.fileObj.file) {
                return this.fileObj.file.name
            }

            if (this.isEdit) {
                return this.fileObj.title
            }

            return null
        },
        progress: function () {
            return 'width: ' + this.progressValue + '%;'
        },
        percent: function () {
            return this.progressValue + '%'
        },
        isEdit: function () {
            if (this.fileObj && this.fileObj.hasOwnProperty('url') || this.fileObj.hasOwnProperty('id')) {
                return true
            }
            return false
        }
    },
    methods: {
        update: function (file, src) {
            this.$emit('update', file, src, this.fileObj.uuid)
            if (file) {
                this.$nextTick(() => {
                    this.upload(file)
                })
            }
        },
        setInitial: function () {
            if (this.fileObj && this.fileObj.src && this.isEdit) {
                this.hideLoader(true)
            }
        },
        remove: function () {
            let scale = 2
            let invscale = 1 / scale
            let baseEase = Power4.easeInOut

            let input = this.$refs.input.$el
            let preview = this.$refs.preview
            let loader = this.$refs.loader
            let progress = this.$refs.progress

            let master = new TimelineMax({
                paused: true,
                yoyo: true,
            })

            master.addLabel('start', '+=0')

            master.fromTo(preview, .7, {
                autoAlpha: 1,
                scaleY: 1,
                x: 0,
            }, {
                autoAlpha: 0,
                scaleY: 0,
                x: 30,
                ease: ExpoScaleEase.config(scale, 1, baseEase),
            }, 'start')


            master.progress(1).progress(0)

            master.eventCallback('onComplete', () => {
                master.kill()
                this.$emit('remove', this.fileObj.uuid)
            })

            this.$nextTick(() => {
                master.play()
            })
        },
        hideLoader: function (onlyPreview = false) {
            let scale = 2
            let invscale = 1 / scale
            let baseEase = Power4.easeInOut

            let input = this.$refs.input.$el
            let preview = this.$refs.preview
            let loader = this.$refs.loader
            let progress = this.$refs.progress

            let master = new TimelineMax({
                paused: true,
                yoyo: true,
            })

            if (!onlyPreview) {
                master.addLabel('start', '+=0')

                master.fromTo(loader, .5, {
                    autoAlpha: 1,
                    css: {
                        marginBottom: '1rem',
                    },
                }, {
                    autoAlpha: 0,
                    css: {
                        marginBottom: '0',
                    },
                    ease: ExpoScaleEase.config(invscale, 1, baseEase),
                }, 'start')

                master.fromTo(progress, .6, {
                    css: {
                        height: '1.618rem',
                    },
                }, {
                    css: {
                        height: 0,
                    },
                    ease: ExpoScaleEase.config(invscale, 1, baseEase),
                }, 'start')

                master.addLabel('loader', '+=0')

                master.fromTo(input, .4, {
                    transformOrigin: 'right',
                    autoAlpha: 1,
                    scaleY: 1,
                    scaleX: 1,
                    x: 0,
                }, {
                    transformOrigin: 'right',
                    autoAlpha: 0,
                    scaleY: .6,
                    scaleX: .8,
                    x: 30,
                    ease: ExpoScaleEase.config(scale, 1, baseEase),
                }, 'loader')
            }
            else {
                master.set(input, {
                    transformOrigin: 'right',
                    autoAlpha: 0,
                    scaleY: .6,
                    scaleX: .8,
                    x: 30,
                })
            }

            master.fromTo(preview, .7, {
                autoAlpha: 0,
                scaleY: 0,
                x: -30,
            }, {
                autoAlpha: 1,
                scaleY: 1,
                x: 0,
                ease: ExpoScaleEase.config(scale, 1, baseEase),
            }, 'loader')

            master.progress(1).progress(0)

            master.eventCallback('onComplete', () => {
                TweenMax.set([loader, progress], {
                    height: 0,
                })
            })

            this.$nextTick(() => {
                if (onlyPreview) {
                    let delay = this.delay * 100
                    setTimeout(() => {
                        master.play()
                    }, delay)
                }
                else {
                    master.play()
                }
            })
        },
        showLoader: function () {
            let loader = this.$refs.loader
            let progress = this.$refs.progress
            let scale = 2
            let baseEase = Power4.easeInOut

            let master = new TimelineMax({
                paused: true,
                yoyo: true,
            })

            master.addLabel('start', '+=0')

            master.fromTo(loader, .3, {
                autoAlpha: 0,
            }, {
                autoAlpha: 1,
                ease: ExpoScaleEase.config(scale, 1, baseEase),
            }, 'start')

            master.fromTo(progress, .7, {
                css: {
                    height: 0,
                },
            }, {
                css: {
                    height: '1.618rem',
                },
                ease: ExpoScaleEase.config(scale, 1, baseEase),
            }, 'start')

            master.progress(1).progress(0)

            this.$nextTick(() => {
                master.play()
            })
        },
        upload: function (file) {
            let formdata = new FormData()
            formdata.append('file', file)

            let request = new XMLHttpRequest()

            request.upload.addEventListener('loadstart', () => {
                this.showLoader()
            }, false)

            request.upload.addEventListener('progress', event => {
                this.progressValue = (event.loaded / event.total) * 90
            }, false)

            request.responseType = 'json'
            request.open('POST', '/api/admin/files/upload')
            request.onload = () => {
                let response = request.response
                if (response.success) {
                    this.updateDB()
                }
            }
            request.send(formdata)
        },
        updateDB: function () {
            let request = new XMLHttpRequest()


            request.responseType = 'json'
            request.open('POST', '/api/admin/files/update')

            request.onprogress = () => {
                this.progressValue = 95
            }

            request.onload = () => {
                let response = request.response
                // console.log('risposta', response);
                if (response.success) {
                    this.progressValue = 100
                    this.$emit('show-btn')
                    this.$emit('uploaded', response.file)
                }
            }
            request.send()
        },
    },
    mounted: function () {
        // setTimeout(() => {
        //     this.showLoader()
        // }, 2000)
        this.$nextTick(() => {
            this.setInitial()
        })
    },
}
</script>

<style lang="scss">
@import '~styles/shared';

.file-container {
    position: relative;

    &__input .form-group {
        margin-bottom: 0 !important;
    }

    &__input .input-group.mb-3 {
        margin-bottom: $spacer !important;
    }

    &__input {}

    &__preview {
        visibility: hidden;
        opacity: 0;

        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        transform-origin: left;

        .preview {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;

            &__remove {
                margin-left: auto;
            }
        }
    }
}

.file-loader {
    visibility: hidden;
    opacity: 0;

    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: $spacer;

    &__progress {
        width: 100%;
        transform-origin: bottom;
        height: 0;
        // height: $spacer * 1.618 !important;
    }

    &__bar {
        color: $light-gray;
        padding: $spacer / 2;
        @include gradient-directional(lighten($teal, 30), lighten($teal, 20), 125deg);
    }
}
</style>
