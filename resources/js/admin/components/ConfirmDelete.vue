<template>
<div class="confirm-delete-modal">
    <b-modal
        ref="modal"
        hide-header
        hide-footer
        centered
        content-class="confirm-delete"
        body-class="confirm-delete__body"
        no-close-on-backdrop
        size="lg"
        @shown="focusMyElement"
    >
        <div
            class="confirm-delete__content"
            ref="content"
        >
            Confermi di voler eliminare l'articolo?
        </div>
        <div class="confirm-delete__btns">
            <a-button
                ref="delBtn"
                title="Elimina"
                class="confirm-delete__btn"
                color="red"
                :has-margin="false"
                @click="deleteItem"
            />
            <a-button
                ref="undoBtn"
                title="Annulla"
                class="confirm-delete__btn"
                color="dark"
                :has-margin="false"
                @click="hide"
            />
        </div>
    </b-modal>
</div>
</template>

<script>
import {
    TimelineMax
}
from 'gsap'

export default {
    name: 'ConfirmDelete',
    props: {
        item: {
            type: Object,
            default: function () {
                return {}
            },
        },
    },
    methods: {
        init: function () {
            this.$root.$on('bv::modal::shown', (bvEvent, modalId) => {
                let duration = .6
                let scale = 3
                let invscale = 1 / scale
                let baseEase = Back.easeOut.config(1.2)


                let content = this.$refs.content
                let delBtn = this.$refs.delBtn.$el
                let undoBtn = this.$refs.undoBtn.$el


                let master = new TimelineMax({
                    paused: true,
                    yoyo: true,
                })

                master.addLabel('start', '+=.1')

                master.fromTo(content, duration, {
                    scaleY: .9,
                    scaleX: .9,
                    y: -15,
                    x: -10,
                }, {
                    scaleY: 1,
                    scaleX: 1,
                    y: 0,
                    x: 0,
                    ease: ExpoScaleEase.config(invscale, 1, Back.easeOut.config(1.1)),
                }, 'start')

                master.fromTo(content, .8, {
                    autoAlpha: 0,
                }, {
                    autoAlpha: 1,
                }, 'start')


                master.staggerFromTo([delBtn, undoBtn], duration, {
                    autoAlpha: 0,
                    scaleY: .8,
                    scaleX: .9,
                    y: 30,
                }, {
                    delay: duration * 0.25,
                    autoAlpha: 1,
                    scaleY: 1,
                    scaleX: 1,
                    y: 0,
                    ease: ExpoScaleEase.config(scale, 1, Back.easeOut.config(1.1)),
                }, .1, 'start')


                master.progress(1).progress(0)
                this.$nextTick(() => {
                    master.play()
                })

            })

        },
        show: function () {
            if (this.$refs.modal) {
                this.$refs.modal.show()
                this.init()
            }
        },
        hide: function () {
            if (this.$refs.modal) {
                this.$refs.modal.hide()
            }
        },
        deleteItem: function () {
            this.$emit('destroy', this.item.id)
        },
        focusMyElement: function (e) {
            console.log('focus');
        },
    },
    mounted: function () {
        this.$nextTick(() => {
            this.init()
        })
    },
}
</script>

<style lang="scss">
@import '~styles/admin-shared';

.confirm-delete {
    background-color: transparent !important;
    border: 0 solid transparent !important;

    &__content {
        padding: $spacer * 4;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: $font-size-lg;
        font-weight: $font-weight-bold;
        color: $white;
        text-shadow: 0 2px 5px rgba($black, .6);
        text-transform: uppercase;
        letter-spacing: 2px;
        @include border-radius($border-radius);
        @include gradient-directional(darken($red, 10), $red, 125deg);
        @include box-shadows($black);

        visibility: hidden;
        opacity: 0;
        transform-origin: top;
    }

    &__body {}

    &__btns {
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-top: $spacer * 2 * 1.618;
    }

    &__btn {
        margin-left: $spacer;
        margin-right: $spacer;
        @include box-shadows($black);

        visibility: hidden;
        opacity: 0;
        transform-origin: bottom;
    }
}

.modal-backdrop {
    background-color: rgba($black, .7) !important;
    @include gradient-radial(rgba(lighten($black, 10), .75), rgba($black, .75));
}
</style>
