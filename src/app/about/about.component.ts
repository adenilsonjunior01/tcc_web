import { Component, OnInit, ViewChild } from '@angular/core';

import { environment } from '@env/environment';
import { CalendarOptions, DateSelectArg, EventApi, EventClickArg } from '@fullcalendar/common';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import { ModalAnimationComponent } from '../@shared/modal-animation/modal-animation.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  @ViewChild(ModalAnimationComponent) modal: any;

  public detailsConsulta: any;

  constructor() {}

  version: string | null = environment.version;
  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    initialEvents: INITIAL_EVENTS,
    weekends: true,
    locale: 'pt-br',
    editable: true,
    selectable: true,
    droppable: true,
    selectMirror: true,
    dayMaxEvents: true,
    dayMaxEventRows: true,

    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    businessHours: {
      daysOfWeek: [ 1, 2, 3, 4, 5 ],
      hours: true,
      startTime: '10:00',
      endTime: '18:00',
    },
  };
  currentEvents: EventApi[] = [];

  ngOnInit() {}

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    // let title = prompt('Please enter a new title for your event');
    // this.modal.show('full-calendar');
    this.modal.show('agendar-consulta');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    // if (title) {
    //   let editTitle = `${title}`
    //   console.log(editTitle);
    //   calendarApi.addEvent({
    //     id: createEventId(),
    //     title: editTitle,
    //     subtitle: editTitle,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay
    //   });
    // }
  }

  /**
   *
   * @param clickInfo Recebe o dados após selecionar o campo de consulta
   * @description Apresenta modal com os detalhes da Consulta
   */
  handleEventClick(clickInfo: EventClickArg) {
    console.log(clickInfo.event._def.extendedProps);
    this.detailsConsulta = clickInfo.event._def.extendedProps;
    Object.assign(this.detailsConsulta.consulta, {
      inicio: clickInfo.event.start,
      termino: clickInfo.event.end
    });
    this.modal.show('full-calendar')
    // if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    //   clickInfo.event.remove();
    // }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

  public novaConsulta() {

  }

  public cancelarConsulta() {
    Swal.fire({
      icon: 'info',
      title: 'Deseja continuar?',
      text: 'Ao continuar, essa consulta será cancelada.',
      showCancelButton: true,
      confirmButtonText: `Sim`,
      cancelButtonText: `Não`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.modal.close('full-calendar')
      }
    });
  }
}
