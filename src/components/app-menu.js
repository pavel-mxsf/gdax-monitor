Vue.component('app-menu', {
    template: `
        <div class="row">
            <div class="btn-group" role="group">
                <router-link to="/" class="btn btn-secondary btn-sm">home</router-link>
                <router-link to="/gdax-price" class="btn btn-secondary btn-sm">price</router-link>
                <router-link to="/daily-high-low" class="btn btn-secondary btn-sm">graph</router-link>
            </div>
        </div>
    `,
    methods: {},
});
