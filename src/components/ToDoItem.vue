<template>
    <div class="todoItem">
        <li >
            <div class="todoItemLeft">
                <input type="checkbox"
                       v-model="completed"
                       @change="doneEdit"
                >
                <div v-if="!editing"
                     @dblclick="editTodo"
                     :class="{ completed : completed }"
                     class="todoItemLabel">
                    {{text}}
                </div>
                <ElInput v-else
                         class="todoItemEdit"
                         type="text"
                         v-model="text"
                         @blur="doneEdit"
                         @keyup.enter.native="doneEdit"
                         @keyup.esc.native="cancelEdit"
                         v-focus></ElInput>
            </div>
            <div class="removeItem">
                <ElButton size="medium"
                          plain type="danger"
                          icon="el-icon-delete"
                          circle @click="removeTodo(index)"></ElButton>
            </div>
        </li>
    </div>
</template>
<script>
    export default {
        name: 'ToDoItem',
        props: {
            todo: {
                type: Object,
                required: true,
            },
            index: {
                type: Number,
                required: true
            },
            checkAll: {
                type: Boolean,
                required: true,
            }
        },
        data() {
            return {
                id: this.todo.id,
                text: this.todo.text,
                completed: this.todo.completed,
                editing: this.todo.editing,
                beforeEditCache: '',
            }
        },
        watch: {
          checkAll() {
              if (this.checkAll) {
                  this.completed = true
              } else {
                  this.completed = this.todo.completed
              }
              // this.completed = this.checkAll ? true : this.completed
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
            removeTodo(index) {
                // eslint-disable-next-line no-undef
              eventBus.$emit('removedTodo', index)
            },
            editTodo() {
                this.beforeEditCache = this.text;
                this.editing = true
            },
            doneEdit: function () {
                if (this.text.trim() == '') {
                    this.text = this.beforeEditCache
                }

                this.editing = false;
                // eslint-disable-next-line no-undef
                eventBus.$emit('finishedEdit', {
                    index: this.index,
                    todo: {
                        id: this.id,
                        text: this.text,
                        completed: this.completed,
                        editing: this.editing
                    }
                })
            },
            cancelEdit() {
                this.text = this.beforeEditCache;
                this.editing = false
            },
        }
    }


</script>
<style>
    ul {
        list-style-type: none;
        padding: 0;

    }
    li {
        word-break: break-all;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 9px 0;

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
        margin-right: 10px;
        text-align: left;
    }
    .completed {
        text-decoration: line-through;
        color: grey;
    }
</style>