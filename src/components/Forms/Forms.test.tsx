import { Provider } from 'react-redux';
import type { ReactElement } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { createAppStore } from '../../store';
import { ReactHookBasicForm } from './ReactHookBasicForm';
import { UncontrolledBasicForm } from './UncontrolledBasicForm';

const countries = ['Serbia', 'Germany'];

const renderForm = (form: ReactElement) => {
  const store = createAppStore();

  render(<Provider store={store}>{form}</Provider>);

  return store;
};

const fillCommonFields = async () => {
  const user = userEvent.setup();
  const image = new File(['avatar'], 'avatar.png', { type: 'image/png' });

  await user.type(screen.getByLabelText(/^name$/i), 'Michael');
  await user.type(screen.getByLabelText(/^age$/i), '30');
  await user.type(screen.getByLabelText(/^email$/i), 'michael@test.com');
  await user.selectOptions(screen.getByLabelText(/^gender$/i), 'male');
  await user.type(screen.getByLabelText(/^country$/i), 'Serbia');
  await user.upload(screen.getByLabelText(/^profile image$/i), image);
  await user.type(screen.getByLabelText(/^password$/i), 'simple');
  await user.type(screen.getByLabelText(/^confirm password$/i), 'simple');
  await user.click(screen.getByLabelText(/terms and conditions/i));

  await waitFor(() => {
    expect(document.querySelector('.forms-image-upload-preview')).toBeTruthy();
  });

  return user;
};

describe('Forms', () => {
  it('shows uncontrolled form validation and submits valid data', async () => {
    const onSuccess = vi.fn();
    const store = renderForm(
      <UncontrolledBasicForm
        countries={countries}
        countriesError=""
        isLoadingCountries={false}
        onSuccess={onSuccess}
      />
    );
    const user = userEvent.setup();

    await user.click(
      screen.getByRole('button', { name: /submit uncontrolled form/i })
    );

    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();

    await fillCommonFields();
    await user.click(
      screen.getByRole('button', { name: /submit uncontrolled form/i })
    );

    expect(store.getState().forms.submissions).toHaveLength(1);
    expect(onSuccess).toHaveBeenCalledTimes(1);
  });

  it('keeps React Hook Form submit disabled until data is valid', async () => {
    const onSuccess = vi.fn();
    const store = renderForm(
      <ReactHookBasicForm
        countries={countries}
        countriesError=""
        isLoadingCountries={false}
        onSuccess={onSuccess}
      />
    );
    const submitButton = screen.getByRole('button', {
      name: /submit react hook form/i,
    });

    expect(submitButton).toBeDisabled();

    const user = await fillCommonFields();

    await waitFor(() => {
      expect(submitButton).toBeEnabled();
    });
    await user.click(submitButton);

    expect(store.getState().forms.submissions).toHaveLength(1);
    expect(onSuccess).toHaveBeenCalledTimes(1);
  });
});
