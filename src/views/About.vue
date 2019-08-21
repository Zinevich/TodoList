<template>
  <div class="about">
    <h1>Твой список дел на сегодня</h1>
    <div class="todoList">
      <div class="el-input">
        <ElInput  type="text" v-model="newTodo" placeholder="Запиши свои планы на сегодня" @keyup.enter.native="addTodo">
        </ElInput>
        <ElButton circle type="success" icon="el-icon-plus" @click="addTodo" v-show="newTodo.length > 0"></ElButton>
      </div>
      <div class="todoItem" v-for="(todo, index) in todos" :key="todo.id">
        <div class="todoItemLeft">
          <input type="checkbox" v-model="todo.completed">
          <div class="todoItemLabel" v-if="!todo.editing" @dblclick="editTodo(todo)" :class="{ completed : todo.completed }">{{todo.text}}</div>
          <ElInput v-else class="todoItemEdit" type="text" v-model="todo.text" @blur="doneEdit(todo)" @keyup.enter.native="doneEdit(todo)" @keyup.esc.native="cancelEdit(todo)" v-focus></ElInput>
        </div>
        <div class="removeItem">
          <ElButton size="medium" plain type="danger" icon="el-icon-delete" circle @click="removeTodo(index)"></ElButton>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    name: 'about',
    data() {
      return {
        newTodo: '',
        idForTodo: 3,
        beforeEditCache: '',
        todos: [{
          id: '1',
          text: 'HEllo todo',
          completed: false,
          editing: false
        }, {
          id: '2',
          text: 'HEllo todo',
          completed: false,
          editing: false
        }],
      }
    },
    directives: {
      focus: {
        inserted: function (el) {
          el.focus()
        }
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
        this.idForTodo++
      },
      removeTodo(index) {
        this.todos.splice(index, 1)
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
      }
    },
  }
</script>
<style>
  .about {
    margin-top: 30px;
  }
  .todoList {
    max-width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .el-input {
    display: flex;
    font-size: 20px;
  }
  .todoItem {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;

  }

  .todoItemEdit {
    font-size: 20px;
    color: #2c3e50;
    margin-left: 12px;
    width: 100%;


  }
  .todoItemLeft {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .todoItemLabel {
    margin-left: 10px;
  }
  .completed {
    text-decoration: line-through;
    color: grey;
  }
</style>