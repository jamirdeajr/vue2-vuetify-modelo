import {Pie, mixins } from "vue-chartjs";

export default {
  extends:Pie,
  mixins: [mixins.reactiveProp], //Torna ChartJS ReativoS
  
  props: ['chartData', 'options'],

  mounted() {
    this.renderChart(this.chartData, this.options);
  },
};