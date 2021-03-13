import { EventInput } from '@fullcalendar/angular';

let eventGuid = 0;
const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: `Consulta - Pediatra`,
    // start: TODAY_STR + 'T09:00:00',
    start: '2021-03-12T10:00:00',
    // end: TODAY_STR + 'T09:30:00',
    end: '2021-03-12T10:30:00',
    paciente: {
      name: 'João',
      sobrenome: 'Silva'
    },
    medico: {
      nome: 'Alex Pedrosa',
      crm: '41526'
    },
    consulta: {
      inicio: '08:00',
      termino: '09:00',
      data: '2021-05-18'
    }
  },
  {
    id: createEventId(),
    title: 'Consulta',
    start: TODAY_STR + 'T12:00:00',
    end: TODAY_STR + 'T12:30:00',
    paciente: {
      name: 'Augusto',
      sobrenome: 'Souza'
    },
    medico: {
      nome: 'Alex Pedrosa',
      crm: '41526'
    },
    // Ou enviar TimeZone
    consulta: {
      tipoConsulta: 'Lorem Ipsum',
      inicio: '09:00',
      termino: '09:30',
      data: '2021-03-15'
    }
  },
  {
    id: createEventId(),
    title: 'Timed event',
    subtitle: 'Nome',
    start: TODAY_STR + 'T12:00:00',
    end: TODAY_STR + 'T12:30:00',
    paciente: {
      name: 'João',
      sobrenome: 'Silva'
    },
    medico: {
      nome: 'Augusto Santos',
      crm: '998855'
    }
  }
];

export function createEventId() {
  console.log('>>', TODAY_STR);
  return String(eventGuid++);
}
