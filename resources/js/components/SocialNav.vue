<template>
<div class="icinn-social">
    <div class="icinn-social__single">
        <a
            href="https://www.facebook.com/icinn.eu"
            target="_blank"
        >
            <facebook
                width="48px"
                color="white"
                :hoverable="true"
                hover-color="light"
            />
        </a>
    </div>
    <div class="icinn-social__single">
        <a
            href="https://twitter.com/icinnovazione"
            target="_blank"
        >
            <twitter
                width="48px"
                color="white"
                :hoverable="true"
                hover-color="light"
            />
        </a>
    </div>
    <div class="icinn-social__single">
        <a
            href="https://www.linkedin.com/company/19015796"
            target="_blank"
        >
            <linked-in
                width="48px"
                color="white"
                :hoverable="true"
                hover-color="light"
            />
        </a>
    </div>
</div>
</template>

<script>
import Facebook from './Facebook.vue'
import LinkedIn from './LinkedIn.vue'
import Twitter from './Twitter.vue'

export default {
    name: 'SocialNav',
    components: {
        Facebook,
        LinkedIn,
        Twitter,
    },
}
</script>

<style lang="scss" scoped>
@import '~styles/shared';

.icinn-social {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    &__single {
        padding: $spacer;
    }
}
</style>
