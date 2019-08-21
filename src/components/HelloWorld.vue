<template>
  <div class="hello container">
    <h1>{{ msg }}</h1>
    <div class="el-input">
      <ElInput  type="text" v-model="newTodo" placeholder="Запиши свои планы на сегодня" @keyup.enter.native="addTodo">
      </ElInput>
      <el-button circle type="success" icon="el-icon-plus" @click="addTodo" v-show="newTodo.length > 0"></el-button>
    </div>
    <div class="todoList">
      <ul class="todoItem" >
        <li v-for="(todo, index) in todos" :key="todo.id">

          <div class="todoItemLeft">
            <input type="checkbox" v-model="todo.completed">
            <div v-if="!todo.editing" @dblclick="editTodo(todo)" :class="{ completed : todo.completed }" class="todoItemLabel">
              {{todo.text}}
            </div>
            <ElInput v-else class="todoItemEdit" type="text" v-model="todo.text" @blur="doneEdit(todo)" @keyup.enter.native="doneEdit(todo)" @keyup.esc.native="cancelEdit(todo)" v-focus></ElInput>
          </div>
          <div class="removeItem">
            <ElButton size="medium" plain type="danger" icon="el-icon-delete" circle @click="removeTodo(index)"></ElButton>
          </div>
        </li>

      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    max-width: 600px;
    margin: 0 auto;
  }
  h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  position: relative;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 9px 0;
}
a {
  color: #42b983;
}
  .el-input {
    display: flex;
    font-size: 20px;
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
  .todoItemEdit {
    font-size: 20px;
    color: #2c3e50;
    margin-left: 12px;
    width: 100%;
    /*padding: 10px;*/

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
