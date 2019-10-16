<template>
<div
    ref="menu"
    class="loader-nav"
>
    <div class="progress loader-nav__progress">
        <div
            class="progress-bar loader-nav__bar"
            role="progressbar"
            :aria-valuenow="value"
            aria-valuemin="0"
            aria-valuemax="100"
            :style="progress"
        >
            {{ percent }}
        </div>
    </div>
</div>
</template>

<script>
import {
    TimelineMax
}
from 'gsap'

export default {
    name: 'LoaderNav',
    data: function () {
        return {
            value: 0,
        }
    },
    watch: {
        '$root.objectsLoaded': function (count) {
            let percent = Math.floor(count * 100 / (this.$root.objectsToLoad - 1))
            if (percent > 100) {
                this.value = 100
            }
            else if (percent < 0) {
                this.value = 0
            }
            else {
                this.value = percent
            }
        },
        value: function (value) {
            // console.log('counter', value);
            if (value >= 100) {
                this.$nextTick(() => {
                    this.destroyLoader()
                })
            }
        }
    },
    computed: {
        progress: function () {
            return 'width: ' + this.value + '%;'
        },
        percent: function () {
            return this.value + '%'
        },
    },
    methods: {
        init: function () {
            let el = this.$refs.menu
            let master = new TimelineMax({
                paused: true
            })
            master.fromTo(el, .7, {
                scaleX: 0,
            }, {
                scaleX: 1,
                ease: Sine.easeOut,
            }, 0)
            master.fromTo(el, .5, {
                scaleY: 0,
                autoAlpha: 0,
            }, {
                scaleY: 1,
                autoAlpha: 1,
                ease: Power4.easeIn,
            }, .2)
            master.progress(1).progress(0)
            master.play()
        },
        destroyLoader: function () {
            let master = TweenMax.fromTo(this.$refs.menu, .5, {
                autoAlpha: 1,
            }, {
                delay: 1,
                autoAlpha: 0,
                onComplete: () => {
                    this.$root.$emit('load-complete')
                    // console.log('completo', this.$refs.menu);
                }
            })
        }
    },
    mounted: function () {
        this.$nextTick(this.init)
    },
}
</script>

<style lang="scss" scoped>
@import '~styles/shared';

.loader-nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: $zindex-fixed - 3;
    display: flex;
    align-items: center;
    justify-content: center;
    @include gradient-radial(rgba($gray-500, .95), rgba($gray-600, .95));

    &__progress {
        width: 50%;
        height: $spacer * 1.618;
        @include box-shadows(lighten($gray-600, 10));
    }

    &__bar {
        color: $white;
        padding: $spacer / 2;
        @include gradient-directional(lighten($teal, 0), darken($teal, 5), 125deg);
    }
}
</style>
