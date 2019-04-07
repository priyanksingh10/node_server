const app = new Vue({
  el: '#mainApp',
  data: {
    serverDate: new Date(),
    serverHour: '',
    serverMinute: '',
    serverSeconds: ''
  },
  mounted: function mounted() {
    this.setupEventSource();
  },
  methods: {
    setupEventSource: function setUpEventSource() {
      const eventSource = new EventSource('/server-date-stream');

      eventSource.addEventListener('newServerTime', (e) => {
        const serverDateInfo = new Date(Number(e.data));
        this.serverDate = ` ${serverDateInfo.getDay()}/${serverDateInfo.getMonth()}`;
        this.serverHour = serverDateInfo.getHours();
        this.serverMinute = serverDateInfo.getMinutes();
        this.serverSeconds = serverDateInfo.getSeconds();
      });

      eventSource.onmessage = (e) => {
        console.log('On Message', e.data);
      };
    }
  }
});
