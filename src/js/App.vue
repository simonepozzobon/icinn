<template>
<div id="app">
    <classic-layout ref="layout">
        <template slot="logo">
            Pannello di amministrazione
        </template>
        <template slot="menu">
            <a-button
                title="logout"
                size="sm"
                :has-container="false"
                :has-margin="false"
                color="light"
            />
        </template>
        <template slot="sidebar">
            <a-sidebar-item
                title="Articoli"
                @click="$root.goTo('articoli')"
            />
        </template>
        <template slot="content">
            <router-view />
        </template>
    </classic-layout>
</div>
</template>

<script>
export default {
    name: 'Init',
    mounted: function () {},
}
</script>

<style lang="scss">
@import '~styles/shared';
</style>