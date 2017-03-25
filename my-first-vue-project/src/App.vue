<template>
  <div id="app">
    <h1 v-text="title"></h1>
    <input v-model="newItem" v-on:keyup.enter="addNew">
    <ul>
      <li v-for="item in items" v-bind:class="{ Finised: item.isFinished}" v-on:click="checked(item)">
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>

<script>
import Store from './components/store';

export default {
  data: function() {
    return {
      title: 'This is a todo list',
      items: [
        {
          label: 'coding',
          isFinished: false
        },
        {
          label: 'reading',
          isFinished: true
        }
      ],
      items: Store.fetch() == null ? [] : Store.fetch(),
      newItem: ''
    }
  },
  methods: {
    checked: function(item) {
      item.isFinished = !item.isFinished
    },
    addNew: function(){
      this.items.push({
        label: this.newItem,
        isFinished: false
      })
    }
  },
  watch: {
    items: {
      handler: function(items) {
        Store.save(items);
      },
      deep: true
    }
  }
}
</script>

<style>
html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
#app {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
}
.Finised {
  text-decoration: underline;
}
</style>
