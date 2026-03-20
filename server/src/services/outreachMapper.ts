import { OutreachEvent, OutreachPerson, optionalString } from 'jobhuntr-shared';
import { InferSchemaType } from 'mongoose';
import { outreachEventSchema, outreachPersonSchema } from '../models/outreachPersonSchema';

type OutreachPersonDb = InferSchemaType<typeof outreachPersonSchema>;
type OutreachEventDb = InferSchemaType<typeof outreachEventSchema>;

export function toOutreachPersonDto(person: OutreachPersonDb): OutreachPerson {
	return {
		name: person.name,
		email: optionalString(person.email),
		role: optionalString(person.role),
		url: optionalString(person.url),
		events: person.events.map((e) => toOutreachEvent(e)),
	};
}

function toOutreachEvent(event: OutreachEventDb): OutreachEvent {
	return {
		at: event.at,
		isResponse: event.isResponse,
		text: optionalString(event.text),
	};
}
