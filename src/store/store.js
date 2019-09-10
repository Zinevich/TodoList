import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        filter: 'all',
        todos: [{
            id: '1',
            text: 'HEllo todo',
            completed: false,
            editing: false
        }],
    },
    getters: {
        remaining(state) {
            return state.todos.filter(todo => !todo.completed).length
        },
        anyRemanining(state, getters) {
            return getters.remaining != 0
        },
        // eslint-disable-next-line vue/return-in-computed-property
        todosFiltered(state) {
            if (state.filter == 'all') {
                return state.todos
            } else if (state.filter == 'active') {
                return state.todos.filter(todo =>  !todo.completed)
            } else if (state.filter == 'completed') {
                return state.todos.filter(todo =>  todo.completed)
            }

            return this.state.todos;
        }
    }
})