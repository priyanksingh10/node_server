const app = new Vue({
  el: '#vueApp',
  data: {
    message: 'Hello Vue!',
    message2: 'This is awesome'
  },
  methods: {
    showPopUp: () => {
      console.log('Hi');
    }
  }
})();
