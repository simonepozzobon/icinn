<template>
<div class="login">
    <a-container
        :has-gradient="true"
        class="login-panel"
    >
        <a-title
            title="Login"
            tag="h3"
            font-size="h3"
            :has-container="false"
        />

        <a-input
            label="Username"
            name="username"
            :is-simple="false"
            :initial="this.username"
            @update="update($event, 'username')"
        />

        <a-input
            label="Password"
            name="password"
            type="password"
            :is-simple="false"
            :initial="this.password"
            @update="update($event, 'password')"
        />

        <a-button
            title="Login"
            color="teal"
            :has-margin="true"
            @click="login"
        />
    </a-container>
</div>
</template>

<script>
export default {
    name: 'Login',
    data: function () {
        return {
            username: null,
            password: null,
        }
    },
    methods: {
        update: function (event, key) {
            this[key] = event
        },
        login: function () {
            let data = new FormData()
            data.append('email', this.username)
            data.append('password', this.password)

            this.$http.post('/api/login', data).then(response => {
                console.log('attempt login', response);
                if (response.data.success) {
                    this.$root.user = response.data.user
                    this.$root.token = response.data.token
                    this.$root.login()
                    this.$root.goTo('articoli')
                }
                else {
                    console.log('error login');
                }
            })
        },
    },
}
</script>

<style lang="scss">
@import '~styles/shared';

.login {
    display: flex;
    height: 100%;
    min-height: 100vh;
    justify-content: center;
    @include gradient-directional(darken($gray-100, 10), $gray-100, 125deg);

    @include media-breakpoint-up('md') {
        align-items: center;
    };
}

.login-panel {
    max-width: 80%;
    flex: 1 1 80%;
    margin-top: $spacer * 2;

    @include media-breakpoint-up('md') {
        margin-top: 0;
        max-width: 40%;
        flex: 1 1 40%;

        .row {
            display: block;

            .col-md-10,
            .col-md-2 {
                flex: 1 1 100%;
                max-width: 100%;
            }
        }
    };
}
</style>
