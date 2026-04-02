import { OutreachPerson } from 'jobhuntr-shared';
import Input from '../../../shared/components/Input';
import { useState } from 'react';
import Button from '../../../shared/components/Button';
import TextArea from '../../../shared/components/TextArea';
import CheckBox from '../../../shared/components/CheckBox';

type OutreachPersonDetailsProps = {
	person: OutreachPerson;
};

export default function OutreachPersonDetails({ person }: OutreachPersonDetailsProps) {
	const [newEventText, setNewEventText] = useState('');
	const [newEventIsResponse, setNewEventIsResponse] = useState(false);

	function addNewEvent() {
		console.log('Adding new event:', newEventText);
		setNewEventText('');
	}

	return (
		<>
			<h3>
				{person.name} {person.role && `(${person.role})`}
			</h3>
			<div className="card">
				{person.events.length === 0 && <p>No events recorded for this person.</p>}
				{person.events.map((event, index) => (
					<div key={index}>
						<p>on {new Date(event.at).toLocaleDateString()}</p>
					</div>
				))}
			</div>
			<div className="flex gap-2 my-2">
				<TextArea
					value={newEventText}
					onChange={setNewEventText}
					placeholder="Add new event..."
					className="block"
					fluid
				/>
				<Button onClick={addNewEvent} disabled={!newEventText.trim()}>
					Add
				</Button>
			</div>
			<CheckBox label="Is Response" checked={newEventIsResponse} onChange={setNewEventIsResponse} />
		</>
	);
}
