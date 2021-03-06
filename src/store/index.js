import Vue  from 'vue';
import Vuex from 'vuex';

import * as actions from './actions';
import * as getters from './getters';

import app           from './modules/app';
import changes       from './modules/changes';
import notifications from './modules/notifications';

Vue.use(Vuex);

export default new Vuex.Store({
    actions,
    getters,
    modules: {
        app,
        changes,
        notifications
    }
});
