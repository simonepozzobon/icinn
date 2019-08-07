<template>
<div class="admin-home">
    <a-container :has-gradient="true">
        <div class="admin-top-bar">
            <a-button
                title="Crea Articolo"
                theme="outline"
                size="sm"
                color="primary"
                :has-container="false"
                :has-margin="false"
            />
            <a-input
                placeholder="cerca..."
                :is-simple="true"
                class="admin-top-bar__search"
            />
        </div>
    </a-container>
    <a-container :has-gradient="true">

    </a-container>
</div>
</template>

<script>
export default {
    name: 'Home',
}
</script>

<style lang="scss">
@import '~styles/shared';

.admin-top-bar {
    display: flex;
    width: 100%;

    &__search {
        margin-left: auto;
        max-width: 200px;
    }
}
</style>