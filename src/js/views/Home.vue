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
                @click="createArticle"
            />
            <a-input
                placeholder="cerca..."
                :is-simple="true"
                class="admin-top-bar__search"
                @update="updateFilter"
            />
        </div>
    </a-container>
    <a-container :has-gradient="true">
        <b-table
            striped
            hover
            :fields="fields"
            :items="items"
        ></b-table>
        <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="center"
        />
    </a-container>
</div>
</template>

<script>
export default {
    name: 'Home',
    data: function () {
        return {
            currentPage: 0,
            perPage: 10,
            totalRows: 0,
            items: [{
                id: 1,
                title: 'titolo',
                content: '',
                img: '/img/img.jpg'
            }],
            fields: [{
                key: 'title',
                label: 'Titolo',
                sortable: true
            }, {
                key: 'tools',
                label: '',
                sortable: false
            }]
        }
    },
    methods: {
        updateFilter: function (value) {
            this.filter = value
        }
    },
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