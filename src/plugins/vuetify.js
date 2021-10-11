import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css"

//import '@fortawesome/fontawesome-free/css/all.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import "@/scss/variables.scss"

Vue.use(Vuetify);

const opts = {
  icons: {
    iconfont: 'md' || 'fa'  //|| "mdi",
  },
  theme: {
    themes: {
      /*light: {
        primary: colors.lightBlue,
        secondary: colors.grey.darken1,
        accent: colors.pink.darken1,
        error: colors.red.accent3,
        background: colors.indigo.lighten5,
        info: colors.teal.darken1,
      },
      dark: {
        //primary: colors.blue.darken4,
        background: colors.indigo.base,
        //info: colors.teal.lighten1,
        primary: '#648dae',
        secondary: '#aa647b',
        accent: '#82B1FF',
        error: '#d32f2f',
        info: '#1976d2',
        success: '#388e3c',
        warning: '#f57c00'
      },*/
      /* Fabio
      dark: {
        primary: '#648dae',
        secondary: '#aa647b',
        info: '#1976d2',
        warning: '#f57c00',
        error: '#d32f2f',
        success: '#388e3c'exit

      },
      light: {
        primary: '#90caf9',
        accent: colors.grey.darken3,
        secondary: '#f48fb1',
        info: '#2196f3',
        warning: '#ff9800',
        error: '#f44336',
        success: '#4caf50'
      }*/
      /* M-DASH
      light: {
				primary: "#607D8B",
				secondary: "#90A4AE",
				tertiary: "#ffc107",
				accent: "#26C6DA",
				error: "#f44336",
				warning: "#ff5722",
				danger: "#CE93D8",
				info: "#ff9800",
				success: "#8bc34a",
				general: "#2196F3",
				anchor: "#ffc107",
				background: "#78909C",
			},
			dark: {
				primary: "#424242",
				secondary: "#90A4AE",
				tertiary: "#82B1FF",
				accent: "#26C6DA",
				error: "#f55a4e",
				info: "#00d3ee",
				success: "#5cb860",
				warning: "#ffa21a",
				danger: "#CE93D8",
				general: "#2196F3",
				anchor: "#E0E0E0",
				background: "#757575",
			}*/

      dark: {
        primary: "#21CFF3",
        secondary: "#ffe18d",
        accent: "#FF4081",
        default: "#563dea",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FB8C00",
        error: "#FF5252",
      },
      light: {
        primary: "#1e88e5",
        secondary: "#30b1dc",
        accent: "#913d40",//"#fc4b6c",
        default: "#563dea",
        info: "#1e88e5",
        success: "#21c1d6",
        warning: "#FB8C00",
        error: "#FF5252",
      },

      /*
      // Palette 2

// Primary 1
$descriptor: blue;
$primary-1-050: #DCEEFB;
$primary-1-100: #B6E0FE;
$primary-1-200: #84C5F4;
$primary-1-300: #62B0E8;
$primary-1-400: #4098D7;
$primary-1-500: #2680C2;
$primary-1-600: #186FAF;
$primary-1-700: #0F609B;
$primary-1-800: #0A558C;
$primary-1-900: #003E6B;

// Primary 2
$descriptor: yellow-vivid;
$primary-2-050: #FFFBEA;
$primary-2-100: #FFF3C4;
$primary-2-200: #FCE588;
$primary-2-300: #FADB5F;
$primary-2-400: #F7C948;
$primary-2-500: #F0B429;
$primary-2-600: #DE911D;
$primary-2-700: #CB6E17;
$primary-2-800: #B44D12;
$primary-2-900: #8D2B0B;

// Neutral 1
$descriptor: blue-grey;
$neutral-1-050: #F0F4F8;
$neutral-1-100: #D9E2EC;
$neutral-1-200: #BCCCDC;
$neutral-1-300: #9FB3C8;
$neutral-1-400: #829AB1;
$neutral-1-500: #627D98;
$neutral-1-600: #486581;
$neutral-1-700: #334E68;
$neutral-1-800: #243B53;
$neutral-1-900: #102A43;

// Supporting 1
$descriptor: cyan;
$supporting-1-050: #E0FCFF;
$supporting-1-100: #BEF8FD;
$supporting-1-200: #87EAF2;
$supporting-1-300: #54D1DB;
$supporting-1-400: #38BEC9;
$supporting-1-500: #2CB1BC;
$supporting-1-600: #14919B;
$supporting-1-700: #0E7C86;
$supporting-1-800: #0A6C74;
$supporting-1-900: #044E54;

// Supporting 2
$descriptor: red;
$supporting-2-050: #FFEEEE;
$supporting-2-100: #FACDCD;
$supporting-2-200: #F29B9B;
$supporting-2-300: #E66A6A;
$supporting-2-400: #D64545;
$supporting-2-500: #BA2525;
$supporting-2-600: #A61B1B;
$supporting-2-700: #911111;
$supporting-2-800: #780A0A;
$supporting-2-900: #610404;

      /* CSS HEX 
--cordovan: #913d40 ff;
--light-cyan: #e9fff9 ff;
--powder-blue: #9ed8db ff;
--queen-blue: #467599 ff;
--prussian-blue: #1d3354 ff;


 SCSS Gradient 
$gradient-top: linear-gradient(0deg, #913d40ff, #e9fff9ff, #9ed8dbff, #467599ff, #1d3354ff);
$gradient-right: linear-gradient(90deg, #913d40ff, #e9fff9ff, #9ed8dbff, #467599ff, #1d3354ff);
$gradient-bottom: linear-gradient(180deg, #913d40ff, #e9fff9ff, #9ed8dbff, #467599ff, #1d3354ff);
$gradient-left: linear-gradient(270deg, #913d40ff, #e9fff9ff, #9ed8dbff, #467599ff, #1d3354ff);
$gradient-top-right: linear-gradient(45deg, #913d40ff, #e9fff9ff, #9ed8dbff, #467599ff, #1d3354ff);
$gradient-bottom-right: linear-gradient(135deg, #913d40ff, #e9fff9ff, #9ed8dbff, #467599ff, #1d3354ff);
$gradient-top-left: linear-gradient(225deg, #913d40ff, #e9fff9ff, #9ed8dbff, #467599ff, #1d3354ff);
$gradient-bottom-left: linear-gradient(315deg, #913d40ff, #e9fff9ff, #9ed8dbff, #467599ff, #1d3354ff);
$gradient-radial: radial-gradient(#913d40ff, #e9fff9ff, #9ed8dbff, #467599ff, #1d3354ff);

      */
    },
    dark: localStorage.getItem("theme") === "dark",
  },
};

export default new Vuetify(opts);
