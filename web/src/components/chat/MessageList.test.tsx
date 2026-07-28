import { render } from '@testing-library/react';
import { MessageList } from './MessageList';

const now = Date.now().toString();

test('renders empty state and messages', () => {
  const { container, rerender } = render(<MessageList messages={[]} currentUser="me" />);
  expect(container).toHaveTextContent('No messages here yet.');

  const msgs = [
    { messageID: '1', fromuser: 'alice', content: 'hello', createdat: now },
    { messageID: '2', fromuser: 'me', content: 'hi', createdat: now },
  ];
  rerender(<MessageList messages={msgs as any} currentUser="me" />);
  expect(container).toHaveTextContent('hello');
  expect(container).toHaveTextContent('hi');
});
import { render, screen } from '@testing-library/react';
import { MessageList } from './MessageList';

const sample = [
  { messageID: 'm1', fromuser: 'alice', content: 'hi' },
  { messageID: 'm2', fromuser: 'bob', content: 'hey' },
];

test('MessageList shows empty state', () => {
  const { container } = render(<MessageList messages={[]} currentUser={''} />);
  expect(container).toHaveTextContent('No messages here yet.');
});

test('MessageList renders messages', () => {
  render(<MessageList messages={sample as any} currentUser={'alice'} />);
  expect(screen.getByText('hi')).toBeInTheDocument();
  expect(screen.getByText('hey')).toBeInTheDocument();
});
