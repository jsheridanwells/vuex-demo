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
            state.todos[i].completed = !state.todos[i].completed;
        },
        deleteTodo: (state, id) => {
            let i = state.todos.findIndex(todo => todo.id === id);
            state.todos.splice(i, 1);
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
                    @dblclick="deleteTodo(t.id)"
                    :class="{ completed: t.completed }"
                >{{ t.task }}</li>
            </ul>
        </div>
    `,
    methods: {
        toggleCompleted: function(id) {
            this.$store.commit('toggleCompleted', id);
        },
        deleteTodo: function(id) {
            this.$store.commit('deleteTodo', id);
        }
    }
};

const App = new Vue({
    components: { 'todo-list': TodoList},
    template: `
        <div>
            <div><p>these are your todos<br> click to mark completed,<br> double-click to delete</p></div>
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