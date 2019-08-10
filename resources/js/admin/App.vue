<template>
<div id="app">
    <!-- <full-loader v-if="$root.objectsToLoad > 0" /> -->
    <!-- <full-loader /> -->
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
                color="dark"
            />
        </template>
        <template slot="sidebar">
            <a-sidebar-item
                title="Articoli"
                @click="$root.goTo('articoli')"
            />
        </template>
        <template slot="content">
            <div class="admin-padding container">
                <router-view />
            </div>
        </template>
    </classic-layout>
</div>
</template>

<script>
import FullLoader from './components/FullLoader.vue'
export default {
    name: 'Init',
    components: {
        FullLoader,
    },
    mounted: function () {},
}
</script>

<style lang="scss">
@import '~styles/shared';

.admin-padding {
    padding: $spacer;
}
</style>
