const PageDailyHighLow = {
    template: `
        <div class="row">
            <loader v-if="!dailyHighLow"></loader>
            <div id="chartdiv"
                style="width: 100%; height: 440px;"
                v-show="dailyHighLow"></div>
        </div>
    `,
    data: function () {
        return {
            dailyHighLow: null
        }
    },
    created: function () {
        this.showDailyHighLow();
    },
    methods: {
        showDailyHighLow: function () {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://coinmate-test.f-app.it/api/data/daily-high-low');
            xhr.onload = () => {
                this.dailyHighLow = JSON.parse(xhr.responseText);

                AmCharts.makeChart("chartdiv",
                    {
                        "type": "serial",
                        "dataDateFormat": "YYYY-MM-DD",
                        "categoryAxis": {
                            "parseDates": true,
                        },
                        "categoryField": "date",
                        "graphs": [{
                                "id": "g1",
                                "bullet": "round",
                                "valueField": "high",
                                "balloonText": "high:[[value]]"
                            }, {
                                "id": "g2",
                                "bullet": "round",
                                "valueField": "low",
                                "balloonText": "low:[[value]]"
                            }, {
                                "id": "g3",
                                "bullet": "round",
                                "valueField": "average",
                                "balloonText": "average:[[value]]"
                            }],
                        "dataProvider": this.dailyHighLow
                    }
                );

            };
            xhr.send();
        }
    }
};
