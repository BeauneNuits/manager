<template>
    <transition name="slide">
        <div class="b-sidebar mdl-layout__drawer" v-show="logged">
            <h1>{{ barName }}</h1>
            <span class="b-sidebar__credit" v-if="loggedUser">Solde: {{ loggedUser.credit | price(true) }}</span>
            <nav class="mdl-navigation">
                <router-link to="/history" class="mdl-button mdl-button--accent mdl-js-button mdl-js-ripple-effect">
                    <i class="material-icons">history</i>
                    Historique
                </router-link>
                <router-link to="/pin" class="mdl-button mdl-button--accent mdl-js-button mdl-js-ripple-effect">
                    <i class="material-icons">lock_ouline</i>
                    PIN
                </router-link>
                <router-link to="/transfer" class="mdl-button mdl-button--accent mdl-js-button mdl-js-ripple-effect">
                    <i class="material-icons">swap_horiz</i>
                    Virement
                </router-link>
                <router-link to="/logout" class="mdl-button mdl-button--accent mdl-js-button mdl-js-ripple-effect">
                    <i class="material-icons">power_settings_new</i>
                    Déconnexion
                </router-link>
            </nav>
        </div>
    </transition>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
    computed: {
        ...mapState({
            loggedUser: state => state.app.loggedUser
        }),
        ...mapGetters([
            'logged'
        ]),
        barName() {
            return config.name;
        }
    }
};
</script>

<style>
    .b-sidebar {
        background: #34495e;
        color: #fff;
        width: 200px;

        & > .b-sidebar__credit {
            margin-left: 20px;
        }

        & > h1 {
            color: #fff;
            background-color: #223648;
            font-size: 2.5rem;
            font-weight: 300;
            padding: 1rem 0;
            margin-top: 0px;
            margin-bottom: 10px;
            text-align: center;
        }

        & > nav {
            & > a {
                box-sizing: border-box;
                color: #fff !important;
                padding-left: 10px;
                text-align: left;

                & > i {
                    margin-right: 10px;
                }
            }
        }
    }

    .slide-enter-active, .slide-leave-active {
        transition: all .5s ease;
    }

    .slide-enter-active + .container, .slide-leave-active + .container {
        transition: all .5s ease;
    }

    .slide-enter, .slide-leave-active {
        margin-left: -200px;
    }

    .slide-enter + .container, .slide-leave-active + .container {
        margin-left: 0;
        width: 100%;
    }
</style>
