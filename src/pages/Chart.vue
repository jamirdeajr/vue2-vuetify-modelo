/* eslint-disable no-unused-vars */
<template>
  <v-container fluid grid-list-xl>
    <canvas ref="icanvas" height="0"></canvas>

    <v-overlay :opacity="0.2" :value="carregando">
      <v-progress-circular indeterminate size="64" color="info">
        Carregando
      </v-progress-circular>
    </v-overlay>

    <v-layout row wrap>
      <!--v-flex lg4 sm6 xs12>
        <my-bar-chart :chartData="dadosChartJS" />
      </v-flex>

      <v-flex lg4 sm6 xs12>
        <my-pie-chart :chartData="dadosPie" />
      </v-flex-->

      <!-- Statistics -->
      <v-flex d-flex lg4 sm6 xs12>
        <pie-chart :data="data" legend="bottom"></pie-chart>
      </v-flex>
      <v-flex d-flex lg4 sm6 xs12>
        <column-chart
          :data="data"
          :colors="['#b00']"
          label="Population"
          ytitle="Population"
        ></column-chart>
      </v-flex>
      <v-flex lg4 sm6 xs12>
        <bar-chart
          :data="data"
          :colors="['#75e569']"
          xtitle="Population"
        ></bar-chart>
      </v-flex>

      <v-flex d-flex lg4 sm6 xs12>
        <area-chart
          :data="areaStatisticData"
          xtitle="Time"
          ytitle="Population"
          :dataset="{ borderWidth: 3 }"
        ></area-chart>
      </v-flex>
      <v-flex d-flex lg4 sm6 xs12>
        <scatter-chart
          :data="scatterStatisticData"
          xtitle="Size"
          :colors="['#107250']"
          ytitle="Population"
        ></scatter-chart>
      </v-flex>
      <v-flex d-flex lg4 sm6 xs12>
        <line-chart
          :data="lineChartData"
          :colors="['#8b47d8']"
          xtitle="Time"
          ytitle="Population"
          :dataset="{ borderWidth: 3 }"
        ></line-chart>
      </v-flex>

      <v-flex d-flex lg4 sm6 xs12>
        <line-chart
          :data="lineChartData"
          :colors="['#47d8a5']"
          :curve="false"
          xtitle="Time"
          ytitle="Population"
          :dataset="{ borderWidth: 3 }"
        ></line-chart>
      </v-flex>
      <v-flex d-flex lg4 sm6 xs12>
        <pie-chart :data="data" legend="bottom" :donut="true"></pie-chart>
      </v-flex>
      <v-flex d-flex lg4 sm6 xs12>
        <line-chart :data="linearMultipleChartdata" />
      </v-flex>
      <!-- Statistics Ends -->
    </v-layout>
  </v-container>
</template>

<script>
//VUE-CHARTJS! 
//import MyBarChartJS from "@/components/MyBarChartJS";
//import MyPieChartJS from "@/components/MyPieChartJS";
//import MyLineChartJS from "@/components/MyLineChartJS";

export default {
  components: {
    //"my-bar-chart": MyBarChartJS,
    //"my-pie-chart": MyPieChartJS,
    //"my-line-chart": MyLineChartJS,
  },

  data() {
    return {
      carregando: true,
      finalizado: false,
      gradient: null,
      gradient2: null,

      //Formato chartkick
      hpp1chartkick: [
        {
          name: "Realizado",
          data: {
            //"202106": 0.02,
          },

          backgroundColor: "rgb(255, 99, 132)",
        },
        {
          name: "Previsto",
          data: {
            "202101": 135.55022,
            "202102": 133.65222,
            "202103": 137.39822,
            "202104": 135.30022,
            "202105": 135.22022,
            "202106": 135.16022,
            "202107": 134.89022,
            "202108": 131.20722,
            "202109": 112.82822,
            "202110": 75.12622,
            "202111": 41.289,
            "202112": 26.683,
          },
        },
      ],
      //Formato ChartJS
      hpp1chartjs: {
        
        //labels: [],
        //datasets: [],
        /*labels: ["01/2021", "02/2021","03/2021","04/2021","05/2021","06/2021","07/2021","08/2021","09/2021","10/2021","11/2021","12/2021"],

        datasets: [
          {
            label: "Previsto",
            data: [135.55022,133.65222,137.39822,135.30022,135.22022,135.16022,134.89022, 131.20722, 112.82822,75.12622, 41.289, 26.683],
          },
          {
            label: "Realizado",
            data: [0,0,0,0,0,0.2,0,0,0,0,0,0],
            backgroundColor: "rgb(255, 99, 132)",
          },
        ],*/
      },

      hpp2: {
        labels: [
          "Jan 2021",
          "Fev 2021",
          "Mar 2021",
          "Abr 2021",
          "Mai 2021",
          "Jun 2021",
          "Jul 2021",
          "Ago 2021",
          "Set 2021",
          "Out 2021",
          "Nov 2021",
          "Dez 2021",
        ],

        datasets: [
          {
            name: "Realizado",
            data: {
              "202106": 0.02,
            },
            backgroundColor: "rgb(255, 99, 132)",
          },
          {
            name: "Previsto",
            data: {
              "202101": 135.55022,
              "202102": 133.65222,
              "202103": 137.39822,
              "202104": 135.30022,
              "202105": 135.22022,
              "202106": 135.16022,
              "202107": 134.89022,
              "202108": 131.20722,
              "202109": 112.82822,
              "202110": 75.12622,
              "202111": 41.289,
              "202112": 26.683,
            },
          },
        ],
      },

      data: {
        USA: 90,
        China: 70,
        Russia: 40,
        Germany: 30,
        "United Kingdom": 35,
        Turkey: 22,
      },

      lineChartData: {
        "2018-05-13": 640,
        "2018-05-14": 200,
        "2018-05-15": 250,
        "2018-05-16": 350,
        "2018-05-17": 200,
        "2018-05-18": 670,
        "2018-05-19": 600,
        "2018-05-20": 800,
      },

      areaStatisticData: {
        "2018-01-01 00:00:00 -0800": 250,
        "2018-01-02 00:00:00 -0800": 150,
        "2018-01-03 00:00:00 -0800": 450,
        "2018-01-04 00:00:00 -0800": 350,
        "2018-01-05 00:00:00 -0800": 700,
        "2018-01-06 00:00:00 -0800": 360,
      },
      scatterStatisticData: {
        "174.0": "30.0",
        "176.5": "79.3",
        "142.5": "68.3",
        "155.5": "37.3",
        "165.5": "54.3",
        "140.5": "15.3",
        "153.5": "24.3",
        "152.5": "75.3",
        "146.5": "98.3",
      },
      linearMultipleChartdata: [
        {
          name: "Workout",
          data: {
            "2017-01-01 00:00:00 -0800": 3,
            "2017-01-02 00:00:00 -0800": 9,
            "2017-01-03 00:00:00 -0800": 14,
            "2017-01-04 00:00:00 -0800": 7,
            "2017-01-05 00:00:00 -0800": 4,
          },
        },
        {
          name: "Go to concert",
          data: {
            "2017-01-01 00:00:00 -0800": 3,
            "2017-01-02 00:00:00 -0800": 2,
            "2017-01-03 00:00:00 -0800": 5,
            "2017-01-04 00:00:00 -0800": 9,
            "2017-01-05 00:00:00 -0800": 14,
          },
        },
        {
          name: "Call Parents",
          data: {
            "2017-01-01 00:00:00 -0800": 9,
            "2017-01-02 00:00:00 -0800": 13,
            "2017-01-03 00:00:00 -0800": 8,
            "2017-01-04 00:00:00 -0800": 4,
            "2017-01-05 00:00:00 -0800": 9,
          },
        },
        {
          name: "Eat Breakfast",
          data: {
            "2017-01-01 00:00:00 -0800": 5,
            "2017-01-02 00:00:00 -0800": 3,
            "2017-01-03 00:00:00 -0800": 5,
            "2017-01-04 00:00:00 -0800": 8,
            "2017-01-05 00:00:00 -0800": 5,
          },
        },
      ],

      dadosChartJS: {
        labels: [
          "Janeiro",
          "Fevereiro",
          "Março",
          "Abril",
          "Maio",
          "Junho",
          "Julho",
          "Agosto",
          "Setembro",
          "Outubro",
          "Novembro",
          "Dezembro",
        ],
        datasets: [
          {
            label: "Teste com vue-chart-js",
            backgroundColor: "#f87979",
            data: [40, 20, 12, 39, 11, 40, 39, 80, 40, 20, 12, 11],
          },
          {
            label: "Teste com vue-chart-js",
            backgroundColor: "#f80079",
            data: [20, 10, 12, 33, 15, 30, 29, 60, 30, 10, 18, 19],
          },
        ],
      },

      dadosPie: {
        labels: [
          "Janeiro",
          "Fevereiro",
          "Março",
          "Abril",
          "Maio",
          "Junho",
          "Julho",
          "Agosto",
          "Setembro",
          "Outubro",
          "Novembro",
          "Dezembro",
        ],
        datasets: [
          {
            labels: ["VueJs", "EmberJs", "ReactJs", "AngularJs"],
            backgroundColor: [
              "#41B883",
              "#E46651",
              "#00D8FF",
              "#DD1B16",
              "#61B803",
              "#F46601",
              "#20D80F",
              "#FD1B06",
              "#51B833",
              "#F46631",
              "#10D83F",
              "#ED1B36",
            ],
            data: [40, 20, 12, 39, 11, 40, 39, 80, 40, 20, 12, 11],
          },
        ],
      },
    };
  },

  async mounted() {
    this.carregando = true;
    
    try {
      this.gradient = this.$refs.icanvas
        .getContext("2d")
        .createLinearGradient(0, 0, 0, 450);
      this.gradient2 = this.$refs.icanvas
        .getContext("2d")
        .createLinearGradient(0, 0, 0, 450);

      this.gradient.addColorStop(0, "rgba(255, 0,0, 0.5)");
      this.gradient.addColorStop(0.5, "rgba(255, 0, 0, 0.25)");
      this.gradient.addColorStop(1, "rgba(255, 0, 0, 0)");

      this.gradient2.addColorStop(0, "rgba(0, 231, 255, 0.9)");
      this.gradient2.addColorStop(0.5, "rgba(0, 231, 255, 0.25)");
      this.gradient2.addColorStop(1, "rgba(0, 231, 255, 0)");
    } catch (e) {
      alert(e.message);
    }

    let orderby = "";

    // ABERTO
    //SELECT anomes,sum(valor/1000) as valor FROM
    //(
    //SELECT cast(a011datvct/100 as integer) as anomes, a011vlrtrf as valor
    //FROM nf011a WHERE a011datvct between 20210101 and 20211231
    //) as x
    //GROUP BY anomes ORDER BY anomes

    let ano = new Date().getFullYear();
    let inicio = ano * 10000 + 101;
    let fim = ano * 10000 + 1231;

    let queryAberto =
      "SELECT anomes,sum(valor/1000) as valor FROM (" +
      "SELECT cast(a011datvct/100 as integer) as anomes, a011vlrtrf as valor " +
      `FROM nf011a WHERE a011datvct between ${inicio} and ${fim} ` +
      ") as x " +
      "GROUP BY anomes ORDER BY anomes";

    //Inicializa
    this.hpp1chartjs.labels = new Array(12);
    this.hpp1chartjs.datasets = new Array(2);

    this.hpp1chartjs.datasets[0] = new Object();
    this.hpp1chartjs.datasets[0].label = "Previsto";
    this.hpp1chartjs.datasets[0].data = new Array(12).fill(0);
    this.hpp1chartjs.datasets[0].backgroundColor = this.gradient;

    this.hpp1chartjs.datasets[1] = new Object();
    this.hpp1chartjs.datasets[1].label = "Realizado";
    this.hpp1chartjs.datasets[1].data = new Array(12).fill(0);
    this.hpp1chartjs.datasets[1].backgroundColor = this.gradient2; //"rgb(255, 99, 132)";

    for (var mes = 1; mes <= 12; mes++) {
      this.hpp1chartjs.labels[mes - 1] = `${mes}/${ano}`;
    }

    //Previsto - Aberto
    await this.$apiservice
      .getApiContentByQuery(queryAberto, orderby)
      .then(
        (response) => {
          try {
            response.data.itens.forEach((item) => {
              try {
                var mm = item[0] - ano * 100;
                if (mm > 0) {
                  this.hpp1chartjs.datasets[0].data[mm - 1] = item[1];
                }
              } catch (e) {
                alert(e.message);
              }
            });
          } catch (e) {
            alert("Exceção:" + e.message);
          }
        },
        (error) => {
          this.content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      )
      .finally(() => {
        this.carregando = false;
      });

    // Realizado Fechado

    let queryFechado =
      "SELECT anomes,sum(valor/1000) as valor from (" +
      "SELECT cast(a011datvct/100 as integer) as anomes, a011vlrtrf as valor " +
      `FROM nf011a WHERE a011sittrf='T' and a011datvct between ${inicio} and ${fim} ` +
      ") as x " +
      "GROUP BY anomes ORDER BY anomes";

    this.carregando = true;
    await this.$apiservice
      .getApiContentByQuery(queryFechado, orderby)
      .then(
        (response) => {
          try {
            response.data.itens.forEach((item) => {
              try {
                var mm = item[0] - ano * 100;
                if (mm > 0) {
                  this.hpp1chartjs.datasets[1].data[mm - 1] = item[1];
                }
              } catch (e) {
                alert(e.message);
              }
            });
          } catch (e) {
            alert("Exceção:" + e.message);
          }
        },
        (error) => {
          this.content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      )
      .finally(() => {});

    //Renderiza os gráficos - (lidos API)
    this.finalizado = true;
    this.carregando = false;
  },
};
</script>

<style></style>
