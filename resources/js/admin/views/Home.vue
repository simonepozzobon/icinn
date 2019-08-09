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
                @click="$root.goTo('article-create')"
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
            sortable
            :fields="fields"
            :items="items"
            :filter="filter"
            :current-page="currentPage"
            :per-page="perPage"
            @filtered="onFiltered"
        >
            <template
                slot="tools"
                slot-scope="data"
            >
                <div class="admin-table-tools">
                    <a-button
                        class="admin-table-tool"
                        title="Modifica"
                        theme="outline"
                        size="sm"
                        color="orange"
                        :has-container="false"
                        :has-margin="false"
                        @click="editArticle(data.item)"
                    />
                    <a-button
                        title="Elimina"
                        theme="outline"
                        size="sm"
                        color="red"
                        :has-container="false"
                        :has-margin="false"
                    />
                </div>
            </template>
        </b-table>
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
            filter: null,
            currentPage: 1,
            perPage: 10,
            totalRows: 0,
            items: [{
                id: 1,
                title: 'titolo',
                content: '',
                img: '/img/img.jpg'
            }],
            fields: [{
                    key: 'id',
                    label: 'ID',
                    sortable: true,
                },
                {
                    key: 'title',
                    label: 'Titolo',
                    sortable: true
                }, {
                    key: 'tools',
                    label: '',
                    sortable: false
                }
            ]
        }
    },
    methods: {
        getData: function () {
            this.$http.get('/api/admin/articles').then(response => {
                if (response.data.success) {
                    this.items = response.data.articles
                }
            })
        },
        updateFilter: function (value) {
            this.filter = value
        },
        createArticle: function () {
            console.log('create');
        },
        editArticle: function (article) {
            this.$root.goToWithParams('article-edit', {
                id: article.id
            })
        },
        onFiltered: function (filteredItems) {
            this.totalRows = filteredItems.length
            this.currentPage = 1
        },
    },
    created: function () {
        this.getData()
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

.admin-table-tools {
    display: flex;
    width: 100%;
    justify-content: flex-end;
}

.admin-table-tool {
    margin-right: $spacer;
}
</style>
