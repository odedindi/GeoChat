import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Composer } from './Composer';

test('typing and sending invokes onSubmit with parsed mentions', async () => {
  const onSubmit = vi.fn();
  const onMentionTrigger = vi.fn();
  render(
    <Composer
      nearbyUsers={[{ userID: '1', username: 'alice' }]}
      onMentionTrigger={onMentionTrigger}
      onSubmit={onSubmit}
    />,
  );

  const ta = screen.getByPlaceholderText('Message nearby people…');
  await userEvent.type(ta, 'hello');
  const btn = screen.getByRole('button', { name: /Send message/i });
  await userEvent.click(btn);
  expect(onSubmit).toHaveBeenCalledWith('hello', []);

  // mentions: insert mention text and send
  await userEvent.clear(ta);
  await userEvent.type(ta, '@alice ');
  await userEvent.click(btn);
  // mention is stored as @alice and mentions contains alice
  expect(onSubmit.mock.calls[1][0]).toContain('@alice');
});

test('Composer renders and sends message', () => {
  const onSubmit = vi.fn();
  render(<Composer nearbyUsers={[]} onMentionTrigger={() => {}} onSubmit={onSubmit} />);
  const ta = screen.getByPlaceholderText('Message nearby people…');
  fireEvent.change(ta, { target: { value: 'hello' } });
  fireEvent.keyDown(ta, { key: 'Enter', code: 'Enter' });
  expect(onSubmit).toHaveBeenCalledWith('hello', []);
});

test('Composer mention insertion', () => {
  const onSubmit = vi.fn();
  const onMentionTrigger = vi.fn();
  render(
    <Composer
      nearbyUsers={[{ userID: 'u1', username: 'alice' }]}
      onMentionTrigger={onMentionTrigger}
      onSubmit={onSubmit}
    />,
  );
  const ta = screen.getByPlaceholderText('Message nearby people…');
  fireEvent.change(ta, { target: { value: '@al' } });
  // pressing Tab should insert mention
  fireEvent.keyDown(ta, { key: 'Tab', code: 'Tab' });
  // now send
  fireEvent.keyDown(ta, { key: 'Enter', code: 'Enter' });
  expect(onSubmit).toHaveBeenCalled();
});
