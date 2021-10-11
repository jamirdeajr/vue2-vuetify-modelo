import { Bar, mixins } from "vue-chartjs";

export default {
  extends: Bar,
  mixins: [mixins.reactiveProp], //Torna ChartJS ReativoS
  //name: "MyChartJS",

  props: ['chartData', 'options'],

  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart(this.chartData, this.options);
  },
};
