// Componentes acessíveis em qualquer lugar 
//- Obs se for uso pontual recomendado declarar na pagina específica e não aqui
//  Ex.   import Xxxxxx from '../components/xxxxxx.vue';
//  export default {
// 
//   components: {
//    "x-xxxxx":Xxxxxx, <-- padrão kebab case!
//   },
//
// Do nosso framework

import Breadcrumbs from '../components/Breadcrumbs.vue';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";


//Modelos
import Widget from '../components/modelos/Widget.vue';
/*import SocialWidget from '../components/modelos/SocialWidget.vue';
import DataTable from '../components/modelos/DataTable.vue';
import TimeLine from '../components/modelos/TimeLine.vue';
import UserTreeView from '../components/modelos/UserTreeView.vue';
import Stepper from '../components/modelos/Stepper.vue';
import LocationStatistic from '../components/modelos/LocationStatistic.vue';
import SiteViewStatistic from '../components/modelos/SiteViewStatistic.vue';
import TotalEarningsStatistic from '../components/modelos/TotalEarningsStatistic.vue';*/
//import MyChartJS from "@/components/MyChartJS.js";


function setupComponents(Vue){

  //Obs aqui o registro é global, se o uso é pontual melhor registrar só na página que usa

   //Do nosso framework
  Vue.component('breadcrumbs', Breadcrumbs);
  Vue.component('q-header', Header);
  Vue.component('q-sidebar', Sidebar);
  
  //Modelos
  Vue.component('widget', Widget);
  /*Vue.component('social-widget', SocialWidget);
  Vue.component('data-table', DataTable);
  Vue.component('time-line', TimeLine);
  Vue.component('user-tree-view', UserTreeView);
  Vue.component('stepper', Stepper);

  Vue.component('location-statistic', LocationStatistic);
  Vue.component('site-view-statistic', SiteViewStatistic);
  Vue.component('total-earnings-statistic', TotalEarningsStatistic);
*/
  

  //Outros - Não usado ainda
  //Vue.component('full-calendar', fullCalendar);
  //Vue.component('swatches', swatches);

  

}


export {
  setupComponents
}
