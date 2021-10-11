<template>
  <v-container fluid grid-list-xl>
    <canvas ref="icanvas" height="0"></canvas>
    <div id="app">

    </div>

    <v-overlay :opacity="0.2" :value="carregando">
      <v-progress-circular indeterminate size="64" color="info">
        Carregando
      </v-progress-circular>
    </v-overlay>

    <v-layout row wrap col="12">
      <!-- Widgets-->
      <v-flex lg3 sm6 xs12>
        <widget
          icon="domain"
          title="39"
          :subTitle="$t('widgetHigherYesterday', ['13%'])"
          :supTitle="$t('widgetTodaysVisit')"
          color="#00b297"
        />
      </v-flex>
      <v-flex lg3 sm6 xs12>
        <widget
          icon="money_off"
          title="R$ 14,291"
          :subTitle="$t('widgetBeforeTax', ['R$ 11,212'])"
          :supTitle="$t('widgetTodaysSale')"
          color="#dc3545"
        />
      </v-flex>
      <v-flex lg3 sm6 xs12>
        <widget
          icon="computer"
          title="33.45%"
          :subTitle="$t('widgetAverageDuration', ['13%'])"
          :supTitle="$t('widgetUniqueVisits')"
          color="#0866C6"
        />
      </v-flex>
      <v-flex lg3 sm6 xs12>
        <widget
          icon="watch_later"
          title="13.00%"
          :subTitle="$t('widgetAverageTime', ['17.25%'])"
          :supTitle="$t('widgetBounceRate')"
          color="#1D2939"
        />
      </v-flex>
      <!-- Widgets fim -->

      <v-flex lg6 sm6 xs12>
        <v-card class="card">
          <v-card-text class="pa-2">
            <v-card-text class="title"
              >Número de Fechamentos (6 meses)</v-card-text
            >
            <my-pie-chart
              v-if="finalizado"
              :chartData="hpp1chartjs"
              :options="{
                responsive: true,
                maintainAspectRatio: false,
                legend: { position: 'right' },
              }"
            />
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex lg6 sm6 xs12>
        <v-card class="card">
          <v-card-text class="pa-2">
            <v-card-text class="title">Transações Mensais</v-card-text>
            <my-line-chart
              v-if="finalizado"
              :chartData="hpp2chartjs"
              :options="{ responsive: true, maintainAspectRatio: false }"
            />
          </v-card-text>
        </v-card>
      </v-flex>

      <!-- Statistics -->
      <!--
      <v-flex lg4 sm6 xs12>
        <site-view-statistic/>
      </v-flex>
      <v-flex lg4 sm6 xs12>
        <location-statistic/>
      </v-flex>
      <v-flex lg4 sm6 xs12>
        <total-earnings-statistic/>
      </v-flex>-->

      <!-- Statistics Ends -->

      <!-- DataTable&TimeLine Starts -->
      <!--
      <v-flex d-flex lg8 sm6 xs12>
        <data-table/>
      </v-flex>
      <v-flex d-flex lg4 sm6 xs12>
        <time-line />
      </v-flex>
      -->
      <!-- DataTable&TimeLine Ends -->

      <!--v-flex d-flex lg6 sm6 xs12>
        <stepper/>
      </v-flex>
      <v-flex d-flex lg6 sm6 xs12>
        <user-tree-view />
      </v-flex-->
    </v-layout>
  </v-container>
</template>

<script>
//import MyBarChartJS from "@/components/MyBarChartJS";
import MyPieChartJS from "@/components/MyPieChartJS";
import MyLineChartJS from "@/components/MyLineChartJS";



export default {
  components: {
    //"my-bar-chart": MyBarChartJS,
    "my-pie-chart": MyPieChartJS,
    "my-line-chart": MyLineChartJS,
  },

  data() {
    return {
      carregando: true,
      finalizado: false,
      gradients: [],

      cores: ["#FF0000","#00E7FF","#3366CC","#dc3912","#ff9900","#109618","#990099","#3b3eac"],

      //lorem: `Lorem ipsum dolor sit amet, mel at clita quando.`,
      lorem: this.$t("teste i18n"),


      //Formato ChartJS
      hpp1chartjs: {},
      hpp1options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: { position: "right" },
      },
      hpp2chartjs: {},
    };
  },

  methods: {
    async ChartHPP1() {
      var orderby = "";
      var data = new Date();

      var dataInicio = new Date(data.setMonth(data.getMonth() - 6));

      let queryAberto =
        " SELECT rtrim(a002titmpg) as tit,count(*) as num " +
        " FROM hs014f " +
        " LEFT JOIN nf003a on a003codfpg=f014codfpg " +
        " LEFT JOIN nf002a on a002codmpg=a003codmpg " +
        ` WHERE f014dtmcri > '${dataInicio
          .toISOString()
          .substr(0, 10)
          .replace(/-/g, "")}' ` +
        " GROUP BY a002titmpg " +
        " HAVING count(*)>0 " +
        " ORDER BY 2 desc";

      await this.$apiservice
        .getApiContentByQuery(queryAberto, orderby)
        .then(
          (response) => {
            this.hpp1chartjs.datasets = new Array(1);
            this.hpp1chartjs.datasets[0] = new Object();
            //this.hpp1chartjs.datasets[0].label = "Titulão";

            //alert(JSON.stringify(response));
            try {
              var pos = 0;
              var idx = response.data.itens.length;

              this.hpp1chartjs.datasets[0].data = new Array(idx).fill(0);
              this.hpp1chartjs.datasets[0].backgroundColor = new Array(
                idx
              ).fill(0);
              this.hpp1chartjs.labels = new Array(idx).fill("");

              response.data.itens.forEach((item) => {
                this.hpp1chartjs.labels[pos] = item[0];
                this.hpp1chartjs.datasets[0].data[pos] = item[1];
                this.hpp1chartjs.datasets[0].backgroundColor[
                  pos
                ] = this.gradients[pos+2];//gradients
                pos++;
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
    },

    async ChartHPP2() {
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
      this.hpp2chartjs.labels = new Array(12);
      this.hpp2chartjs.datasets = new Array(2);

      this.hpp2chartjs.datasets[0] = new Object();
      this.hpp2chartjs.datasets[0].label = "Previsto";
      this.hpp2chartjs.datasets[0].data = new Array(12).fill(0);
      this.hpp2chartjs.datasets[0].backgroundColor = this.gradients[6];

      this.hpp2chartjs.datasets[1] = new Object();
      this.hpp2chartjs.datasets[1].label = "Realizado";
      this.hpp2chartjs.datasets[1].data = new Array(12).fill(0);
      this.hpp2chartjs.datasets[1].backgroundColor = this.gradients[3]; 

      for (var mes = 1; mes <= 12; mes++) {
        this.hpp2chartjs.labels[mes - 1] = `${mes}/${ano}`;
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
                    this.hpp2chartjs.datasets[0].data[mm - 1] = item[1];
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
                    this.hpp2chartjs.datasets[1].data[mm - 1] = item[1];
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
    },
  },

  async mounted() {
    this.carregando = true;

    //Gera gradientes das cores
    this.gradients = new Array(this.cores.length);

    try {
      for (var i = 0; i < this.cores.length; i++) {
        this.gradients[i] = this.$refs.icanvas
          .getContext("2d")
          .createLinearGradient(0, 0, 0, 450);

        this.gradients[i].addColorStop(0.3, hexToRGBA(this.cores[i], 0.9));
        this.gradients[i].addColorStop(0.8, hexToRGBA(this.cores[i], 0.25));
        this.gradients[i].addColorStop(1, hexToRGBA(this.cores[i], 0));
      }

    } catch (e) {
      alert(e.message);
    }

    await this.ChartHPP1();
    await this.ChartHPP2();

    //Renderiza os gráficos - (lidos API)
    this.finalizado = true;
    this.carregando = false;
  },
};

function hexToRGBA(hex, opacity) {
  return (
    "rgba(" +
    (hex = hex.replace("#", ""))
      .match(new RegExp("(.{" + hex.length / 3 + "})", "g"))
      .map(function(l) {
        return parseInt(hex.length % 2 ? l + l : l, 16);
      })
      .concat(isFinite(opacity) ? opacity : 1)
      .join(",") +
    ")"
  );
}
</script>
