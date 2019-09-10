<template>
  <div class="hello container">
    <h1>{{ msg }}</h1>
    <div class="el-input">
      <ElInput prefix-icon="el-icon-edit"
               type="text"
               v-model="newTodo"
               placeholder="Запиши свои планы на сегодня"
               @keyup.enter.native="addTodo">
      </ElInput>
      <el-button class="filterButton"
                 type="success"
                 icon="el-icon-plus"
                 @click="addTodo"
                 v-show="newTodo.length > 0"></el-button>
    </div>
    <div class="filterContainerTop">
      <ToDoCheckAll :anyRemaining="anyRemanining" />
    </div>
    <div class="todoList">
      <ul class="todoItem" >
            <ToDoItem ref="ToDoItem"
                      :todo="todo"
                      :index="index"
                      v-for="(todo, index) in todosFiltered"
                      :key="todo.id"
                      :checkAll="!anyRemanining"

            />
      </ul>
    </div>

    <div class="filterContainerBottom">
      <ToDoItemsRemaining :remaining="remaining" />
      <ToDoFiltered ref="ToDoFiltered"></ToDoFiltered>

    </div>
  </div>
</template>

<script>
  import ToDoItem from '../components/ToDoItem';
  import ToDoItemsRemaining from '../components/ToDoItemsRemaining';
  import ToDoCheckAll from '../components/ToDoCheckAll';
  import ToDoFiltered from '../components/ToDoFiltered';
  // eslint-disable-next-line no-unused-vars


  export default {
  name: 'ToDoList',
  components: {
    ToDoItem,
    ToDoItemsRemaining,
    ToDoCheckAll,
    ToDoFiltered,


  },
  props: {
    msg: String
  },
  data() {
    return {
      show: true,
      filter: 'all',
      newTodo: '',
      idForTodo: 1,
      beforeEditCache: '',
      todos: [{
        id: '0',
        text: 'HEllo todo',
        completed: false,
        editing: false
      }],
    }
  },

  created() {
    // eslint-disable-next-line no-undef
    eventBus.$on('removedTodo', (index) => this.removeTodo(index));
    // eslint-disable-next-line no-undef
    eventBus.$on('finishedEdit', (index) => this.finishedEdit(index));
    // eslint-disable-next-line no-undef
    eventBus.$on('checkAllChanged', (checked) => this.checkAllTodos(checked));
    // eslint-disable-next-line no-undef
    eventBus.$on('filterChange', (filter) => this.filter = filter)
  },
  beforeDestroy() {
    // eslint-disable-next-line no-undef
    eventBus.$off('removedTodo');
    // eslint-disable-next-line no-undef
    eventBus.$off('finishedEdit');
    // eslint-disable-next-line no-undef
    eventBus.$off('checkAllChanged');
    // eslint-disable-next-line no-undef
    eventBus.$off('filterChange')
  },
  computed: {
    remaining() {
      return this.$store.getters.remaining
    },
    anyRemanining() {
      return this.$store.getters.anyRemaining
    },
    // eslint-disable-next-line vue/return-in-computed-property
    todosFiltered() {
      return this.$store.getters.todosFiltered
    }
  },

  methods: {
    addTodo() {
      if (this.newTodo.trim().length == 0) {
        return
      }

      this.todos.push({
        id: this.idForTodo,
        text: this.newTodo,
        completed: false,
        editing: false
      });

      this.newTodo = '';
      this.idForTodo++;


    },
    removeTodo(index) {
      this.todos.splice(index, 1);


    },
    editTodo(todo) {
      this.beforeEditCache = todo.text;
      todo.editing = true
    },
    doneEdit(todo) {
      if (todo.text.trim() == '') {
        todo.text = this.beforeEditCache
      }

      todo.editing = false
    },
    cancelEdit(todo) {
      todo.text = this.beforeEditCache;
      todo.editing = false
    },
    checkAllTodos() {
      this.todos.forEach((todo) => todo.completed = event.target.checked)
    },
      finishedEdit(data) {
        this.todos.splice(data.index, 1, data.todo)
      }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /* как поменять цвет кнопики Element UI */
  .filterButton {
    color: #000;
    border: 1px solid #6c52ff;
    background: rgba(108, 82, 255, 0.2);

  }
  .filterButton:hover {
    background: #6c52ff;
    color: #fff;
    border: 1px solid #6c52ff;
  }
    .filterButton:focus {
      background: #6c52ff;
      color: #fff;
      border: 1px solid #6c52ff;
    }
    /*End*/
  .fade-enter-active {
    transition: opacity .9s;
  }
  .fade-leave-active {
    transition: opacity .3s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
  }
  .container {
    max-width: 600px;
    margin: 0 auto;
  }
  h3 {
  margin: 40px 0 0;
}

a {
  color: #42b983;
}
  .el-input {
    display: flex;
    font-size: 20px;
    flex-direction: row;
  }
  .el-input .filterButton {
    margin-left: 15px;
  }
  .todoList {
    display: flex;
    justify-content: space-between;
    flex-direction: column;


  }
  .todoItem {

    display: flex;
    flex-direction: column;
  }

.filterContainerTop {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  font-size: 18px;
  border-bottom: 2px solid lightgrey;
  padding-top: 20px;
  padding-bottom: 10px;
}

  .filterContainerBottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    border-top: 2px solid lightgrey;
    padding-top: 14px;
    margin-bottom: 16px;
  }



</style>
