import { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

export default function DateTimePickerComponent() {
  const [value, onChange] = useState(new Date());
  return (
    <div>
      <DateTimePicker onChange={onChange} value={value} />
    </div>
  );
}