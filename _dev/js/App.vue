<template>
<div id="app">
    <classic-layout ref="layout">
        <template slot="logo">
            Pannello
        </template>
        <template slot="menu">
            <ui-button
                title="logout"
                :has-container="false"
                :has-margin="false"
                color="primary"
            />
        </template>
        <template slot="sidebar">
            Gianni
        </template>
        <template slot="content">
            <container :has-gradient="true">
                ciao
            </container>
        </template>
    </classic-layout>
</div>
</template>

<script>
import {
    ClassicLayout,
    Container,
    UiButton,
}
from '@esserun/admin-ui/packages/admin-ui'



export default {
    name: 'Init',
    components: {
        ClassicLayout,
        Container,
        UiButton,
    },
    mounted: function () {
        this.$nextTick(() => {
            this.$refs.layout.randomColor()
        })
    },
}
</script>

<style lang="scss" scoped>
@import '~styles/shared';
</style>