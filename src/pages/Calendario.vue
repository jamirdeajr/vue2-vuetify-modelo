<template>
  <div>
    <v-sheet tile class="d-flex wrap row ma-1">
      <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-select
        v-model="type"
        :items="types"
        dense
        outlined
        hide-details
        class="ma-2 d-flex xg3 lg4 sm6 xs12"
        label="Tipo"
      ></v-select>
      <v-select
        v-model="mode"
        :items="modes"
        dense
        outlined
        hide-details
        label="Modo sobreposição eventos"
        class="ma-2 d-flex xg3 lg4 sm6 xs12"
      ></v-select>
      <v-select
        v-model="weekday"
        :items="weekdays"
        dense
        outlined
        hide-details
        label="Dias da semana"
        class="ma-2 d-flex xg3 lg4 sm6 xs12"
      ></v-select>
      <v-spacer></v-spacer>
      <v-btn icon class="ma-2" @click="$refs.calendar.next()">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-sheet>
    <v-sheet height="600">
      <v-calendar
        ref="calendar"
        v-model="value"
        :weekdays="weekday"
        :type="type"
        :events="events"
        :event-overlap-mode="mode"
        :event-overlap-threshold="30"
        :event-color="getEventColor"
        locale="pt"
        @change="getEvents"
        @click:event="showEvent"
        @click:more="viewDay"
        @click:date="viewDay"
      ></v-calendar>

      <v-menu
        v-model="selectedOpen"
        :close-on-content-click="false"
        :activator="selectedElement"
        offset-x
      >
        <v-card color="grey lighten-4" min-width="350px" flat>
          <v-toolbar :color="selectedEvent.color" dark>
            <v-btn icon>
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
            <v-spacer></v-spacer>
            
            <v-btn icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <span v-html="selectedEvent.details"></span>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="secondary" @click="selectedOpen = false">
              Cancelar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-sheet>
  </div>
</template>

<script>
export default {
  data: () => ({
    type: "month",
    types: [
      { text: "Mensal", value: "month" },
      { text: "Semanal", value: "week" },
      { text: "Diário", value: "day" },
      { text: "4 dias", value: "4day" },
    ],
    mode: "stack",
    modes: [
      { text: "Pilha", value: "stack" },
      { text: "Coluna", value: "column" },
    ],
    weekday: [0, 1, 2, 3, 4, 5, 6],
    weekdays: [
      { text: "Dom - Sáb", value: [0, 1, 2, 3, 4, 5, 6] },
      { text: "Seg - Dom", value: [1, 2, 3, 4, 5, 6, 0] },
      { text: "Seg - Sex", value: [1, 2, 3, 4, 5] },
      { text: "Seg, Qua, Sex", value: [1, 3, 5] },
    ],
    value: "",
    events: [],
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1",
    ],
    names: [
      "Reunião",
      "Feriado",
      "Prospect",
      "Viagem",
      "Evento",
      "Aniversário",
      "Conferência",
      "Festa",
    ],
    focus: "",
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
  }),
  methods: {
    // eslint-disable-next-line no-unused-vars
    getEvents({ start, end }) {
      const events = [];
      /*
      events.push({
        name: "Estudos com VUE",
        start: new Date("2021-09-12T09:00:00"),
        end: new Date("2021-09-12T12:00:00"),
        color: "#FFDD01", //this.colors[this.rnd(0, this.colors.length - 1)],
        timed: true,
      });*/

      const min = new Date(`${start.date}T00:00:00`);
      const max = new Date(`${end.date}T23:59:59`);

      const days = (max.getTime() - min.getTime()) / 86400000;

      //const eventCount = days;

      for (let i = 0; i < days; i++) {
        let d1 = new Date(`${start.date}T08:30:00`);
        let d2 = new Date(`${start.date}T12:00:00`);
        let d3 = new Date(`${start.date}T13:00:00`);
        let d4 = new Date(`${start.date}T17:30:00`);

        d1.setDate(d1.getDate() + i);
        d2.setDate(d2.getDate() + i);
        d3.setDate(d3.getDate() + i);
        d4.setDate(d4.getDate() + i);

        //alert(`${d1} ${d2}`)

        //Fora sabados e domingos
        if (d1.getDay() != 0 && d1.getDay() != 6) {
          events.push({
            name: "QLA - Manhã",
            start: d1,
            end: d2,
            color: this.colors[2], //this.colors[this.rnd(0, this.colors.length - 1)],
            timed: true,
            details: `Calendário - Compromisso das ${d1} até ${d2} `
          });

          events.push({
            name: "QLA - Tarde",
            start: d3,
            end: d4,
            color: this.colors[1], //this.colors[this.rnd(0, this.colors.length - 1)],
            timed: true,
            details: `Calendário - Compromisso das ${d3} até ${d4} `
          });
        }
      }
      this.events = events;
    },

    showEvent({ nativeEvent, event }) {
      const open = () => {

        alert(JSON.stringify(event))
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        requestAnimationFrame(() =>
          requestAnimationFrame(() => (this.selectedOpen = true))
        );
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        requestAnimationFrame(() => requestAnimationFrame(() => open()));
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },

    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = "";
    },

    /*
      const min = new Date(`${start.date}T00:00:00`);
      const max = new Date(`${end.date}T23:59:59`);

      const days = (max.getTime() - min.getTime()) / 86400000;

      events.push({
          name: "Evento 1",
          start: min,
          end: max,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: true,
        });
      events.push({
          name: "Evento 2",
          start: min,
          end: max,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: false,
        });
    
      const eventCount = this.rnd(days, days + 20);
      for (let i = 0; i < eventCount; i++) {
        
        const allDay = this.rnd(0, 3) === 0;
        const firstTimestamp = this.rnd(min.getTime(), max.getTime());
        const first = new Date(firstTimestamp - (firstTimestamp % 900000));
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
        const second = new Date(first.getTime() + secondTimestamp);
        events.push({
          name: this.names[this.rnd(0, this.names.length - 1)],
          start: first,
          end: second,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: !allDay,
        });
        
      }
      */

    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
  },
};
</script>
