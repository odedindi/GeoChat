import { render, screen } from '@testing-library/react';
import { MessageList } from './MessageList';

const now = Date.now().toString();

test('renders empty state and messages', () => {
  const { container, rerender } = render(<MessageList messages={[]} currentUser="me" />);
  expect(container).toHaveTextContent('No messages here yet.');

  const msgs = [
    {
      messageID: '1',
      fromuser: 'alice',
      content: 'hello',
      createdat: now,
      geolocation_lat: 0,
      geolocation_lng: 0,
    },
    {
      messageID: '2',
      fromuser: 'me',
      content: 'hi',
      createdat: now,
      geolocation_lat: 0,
      geolocation_lng: 0,
    },
  ];
  rerender(<MessageList messages={msgs} currentUser="me" />);
  expect(container).toHaveTextContent('hello');
  expect(container).toHaveTextContent('hi');
});

const sample = [
  {
    messageID: 'm1',
    fromuser: 'alice',
    content: 'hi',
    createdat: now,
    geolocation_lat: 0,
    geolocation_lng: 0,
  },
  {
    messageID: 'm2',
    fromuser: 'bob',
    content: 'hey',
    createdat: now,
    geolocation_lat: 0,
    geolocation_lng: 0,
  },
];

test('MessageList shows empty state', () => {
  const { container } = render(<MessageList messages={[]} currentUser={''} />);
  expect(container).toHaveTextContent('No messages here yet.');
});

test('MessageList renders messages', () => {
  render(<MessageList messages={sample} currentUser={'alice'} />);
  expect(screen.getByText('hi')).toBeInTheDocument();
  expect(screen.getByText('hey')).toBeInTheDocument();
});
