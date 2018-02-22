const PageGdaxPrice = {
    template: `
        <div>
            <loader v-if="!loaded"></loader>
            <div class="row align-items-center" style="height:430px;" v-if="loaded">
                <div class="col-sm text-center">
                    <img src="assets/ethereum-logo.png" style="height:100px;" />
                    <h1 class="display-5">ETH</h1>
                    <h3 class="display-5"><small class="text-secondary">USD</small> <span id="ETH-USD"><loader style="display:inline"></loader></span></h3>
                    <h3 class="display-5"><small class="text-secondary">EUR</small> <span id="ETH-EUR"><loader style="display:inline"></loader></span></h3>
                </div>
                <div class="col-sm text-center">
                    <img src="assets/bitcoin-logo.png" style="height:100px;" />
                    <h1 class="display-5">BTC</h1>
                    <h3 class="display-5"><small class="text-secondary">USD</small> <span id="BTC-USD"><loader style="display:inline"></loader></span></h3>
                    <h3 class="display-5"><small class="text-secondary">EUR</small> <span id="BTC-EUR"><loader style="display:inline"></loader></span></h3>
                </div>
            </div>
        </div>
    `,
    data: function () {
        return {
            websocket: null,
            loaded: false
        }
    },
    created: function () {
        this.websocket = new WebSocket('wss://ws-feed.gdax.com');

        this.websocket.onopen = () => {
            this.websocket.send(JSON.stringify({
                "type": "subscribe",
                "channels": [
                    {
                        "name": "ticker",
                        "product_ids": [
                            "ETH-USD",
                            "ETH-EUR",
                            "BTC-USD",
                            "BTC-EUR",
                        ]
                    }
                ]
            }));
        };

        let cachedTargets = {};

        this.websocket.onmessage = message => {
            this.loaded = true;
            let parsed = JSON.parse(message.data);
            if (! parsed.product_id) {
                return;
            }
            if (! cachedTargets[parsed.product_id]) {
                let target = document.getElementById(parsed.product_id);
                if (target) {
                    cachedTargets[parsed.product_id] = target;
                }
            }
            if (cachedTargets[parsed.product_id]) {
                cachedTargets[parsed.product_id].innerHTML = parseFloat(parsed.price).toFixed(2);
            }
        };
        this.websocket.onerror = err => {
          console.log('error', err);
        };
        this.websocket.onclose = () => {
          console.log('closed');
        };
    },
    methods: {
    },
    beforeRouteLeave (to, from , next) {
        this.websocket.close();
        next();
    }
};
