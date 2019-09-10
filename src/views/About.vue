<template>
  <div class="about">
    <h1>Твой список дел на сегодня</h1>
    <div class="todoList">
      <div class="el-input">
        <ElInput  type="text" v-model="newTodo" placeholder="Запиши свои планы на сегодня" @keyup.enter.native="addTodo">
        </ElInput>
        <ElButton circle type="success" icon="el-icon-plus" @click="addTodo" v-on:click="show" v-show="newTodo.length > 0"></ElButton>
      </div>
      <transition-group name="fade">
      <div class="todoItem" v-for="(todo, index) in todos" :key="todo.id">

          <div class="todoItemLeft" v-if="show">
            <div class="todoItemLabel" v-if="!todo.editing" @dblclick="editTodo(todo)" :class="{ completed : todo.completed }">{{todo.text}}</div>
            <ElInput v-else class="todoItemEdit" type="text" v-model="todo.text" @blur="doneEdit(todo)" @keyup.enter.native="doneEdit(todo)" @keyup.esc.native="cancelEdit(todo)" v-focus></ElInput>
          </div>
          <div class="removeItem">
            <ElButton size="medium" plain type="danger" icon="el-icon-delete" circle @click="removeTodo(index)"></ElButton>
          </div>


      </div>
      </transition-group>
    </div>
    <div class="checkbox">
      <div class="form">
        <input type="checkbox" id="check"/>
        <label for="check" style="--d: 14px;">
          <svg viewBox="0,0,50,90">
            <path d="M5 25 L 15 45 L 40 10"></path>
          </svg>
        </label>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    name: 'about',
    data() {
      return {
        show: true,
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
  .fade-enter-active {
    transition: opacity .9s;
  }
  .fade-leave-active {
    transition: opacity .3s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
  }
  .about {
    margin-top: 30px;
  }
  .todoList {
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
  /*checkbox*/
  input#check {
    position: absolute;
    opacity: 0;
  }
  input#check:checked + label svg path {
    stroke-dashoffset: 0;
  }
  input#check:focus + label {
    transform: scale(1.03);
  }

  #check + label {
    display: block;
    border: 1px solid #333;
    width: var(--d);
    height: var(--d);
    border-radius: 2px;
    cursor: pointer;
    transition: all 0.7s ease;
  }
  #check + label:active {
    transform: scale(1.05);
    border-radius: 5px;
  }
  #check + label svg {
    pointer-events: none;
  }
  #check + label svg path {
    fill: none;
    stroke: #333;
    stroke-width: 8px;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 100;
    stroke-dashoffset: 100;
    transition: all 450ms cubic-bezier(1, 0, 0.37, 0.91);
  }

</style>