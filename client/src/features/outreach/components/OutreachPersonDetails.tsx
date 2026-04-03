import { useState } from 'react';
import { OutreachEvent, OutreachPerson } from 'jobhuntr-shared';
import Button from '../../../shared/components/Button';
import TextArea from '../../../shared/components/TextArea';
import CheckBox from '../../../shared/components/CheckBox';
import { formatDateWith } from '../../../shared/services/util';
import { usePopup } from '../../popup/hooks/usePopup';

type OutreachPersonDetailsProps = {
	person: OutreachPerson;
	eventAdded?: (event: OutreachEvent) => Promise<void>;
	eventRemoved?: (eventId: string) => Promise<void>;
};

export default function OutreachPersonDetails({ person, eventAdded, eventRemoved }: OutreachPersonDetailsProps) {
	const [newEventText, setNewEventText] = useState('');
	const [newEventIsResponse, setNewEventIsResponse] = useState(false);

	const { confirm } = usePopup();

	async function handleAddEvent() {
		if (!eventAdded) return;
		const newEvent: OutreachEvent = {
			id: Math.random().toString(36).substring(2, 9), // temporary id, should be generated server-side
			at: new Date(), // overridden server-side
			text: newEventText,
			isResponse: newEventIsResponse,
		};
		await eventAdded(newEvent);
		setNewEventText('');
	}

	async function handleRemoveEvent(id: string) {
		if (!eventRemoved) return;

		const result = await confirm({ message: 'Are you sure you want to remove this event?' });
		if (!result) return;

		await eventRemoved(id);
	}

	return (
		<>
			<h3>
				{person.name} {person.role && `(${person.role})`}
			</h3>
			<div className="card max-h-50vh overflow-y-auto">
				{person.events.length === 0 && <p>No events recorded for this person.</p>}
				{person.events.map((event, index) => (
					<div key={index} className={`mt-4 outreach-event-message ${event.isResponse ? 'incoming' : 'outgoing'}`}>
						<div className={`card ${event.isResponse ? '' : 'bg-elevated'}`}>{event.text}</div>
						<div className="mt-2 font-size-sm opacity-50">
							on {formatDateWith(event.at, 'full')}
							<Button variant="plain" className="ml-2" onClick={() => handleRemoveEvent(event.id)} aria-label="remove">
								🗑️
							</Button>
						</div>
					</div>
				))}
			</div>
			{eventAdded && (
				<>
					<div className="flex gap-2 my-2">
						<TextArea
							value={newEventText}
							onChange={setNewEventText}
							placeholder="Add new event..."
							className="block"
							fluid
						/>
						<Button onClick={handleAddEvent} disabled={!newEventText.trim()}>
							Add
						</Button>
					</div>
					<CheckBox label="Is Response" checked={newEventIsResponse} onChange={setNewEventIsResponse} />
				</>
			)}
		</>
	);
}
