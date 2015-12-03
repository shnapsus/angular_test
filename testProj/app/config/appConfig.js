function AppConfig() {
    this.host = '';
    this.appConfig = {
        name: 'App',
        messageTimeout: 1000,
        isUseMock: false, // if set to true, replace mock.js data with data from mock.js.sample
        debug: true,
        states: {
            index: {
                url: this.host,
                state: 'index'
            }
        },
        templates: {
            index: this.host + '/app/modules/index/index.tpl.html'
        }
    };
};