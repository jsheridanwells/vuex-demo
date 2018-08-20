'use strict';

const myStore = new Vuex.Store({
    state: {
        todos: [{
                id: 1,
                task: 'Code',
                completed: false
            },
            {
                id: 2,
                task: 'Take a Break',
                completed: false
            },
            {
                id: 3,
                task: 'Sit',
                completed: false
            },
            {
                id: 4,
                task: 'Stay',
                completed: false
            },
            {
                id: 5,
                task: 'Roll Over',
                completed: true
            }
        ]
    },
    getters: {
        todos: state => state.todos
    },
    mutations: {
        addTodo: (state, newTask) => {
            let task = {
                task: newTask,
                completed: false,
                id: state.todos[state.todos.length - 1].id + 1
            };
            state.todos.push(task);
        },
        toggleCompleted: (state, id) => {
            let i = state.todos.findIndex(todo => todo.id === id);
            console.log(i);
            state.todos[i].completed = !state.todos[i].completed;
        }
    }
});

const TodoList = {
    props: ['todos'],
    template: `
        <div>            
            <ul>
                <li
                    v-for="(t, i) in todos"
                    :key="i"
                    @click="toggleCompleted(t.id)"
                    :class="{ completed: t.completed }"
                >{{ t.task }}</li>
            </ul>
        </div>
    `,
    methods: {
        toggleCompleted: function(id) {
            console.log(id);
            this.$store.commit('toggleCompleted', id);
        }
    }
};

const App = new Vue({
    components: { 'todo-list': TodoList},
    template: `
        <div>
            <form @submit.prevent="addTodo">
                <input type=text v-model="task" />
            </form>
            <todo-list :todos="todos" />        
        </div>
    `,
    store: myStore,
    created: {},
    data() {
        return { task: '' };
    },
    computed: {
        todos: function() {
            return this.$store.getters.todos;
        }
    },
    methods: {
        addTodo: function() {
            this.$store.commit('addTodo', this.task);
            this.task = '';
        }
    }
});

App.$mount('#app');