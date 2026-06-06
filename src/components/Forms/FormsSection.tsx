import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from '../Modal';
import { UncontrolledBasicForm } from './UncontrolledBasicForm';
import type { RootState } from '../../store';
import type { FormType } from '../../types/forms';

export const FormsSection = () => {
  const [openedForm, setOpenedForm] = useState<FormType | null>(null);
  const submissions = useSelector(
    (state: RootState) => state.forms.submissions
  );

  const closeModal = () => {
    setOpenedForm(null);
  };

  return (
    <section className="forms-section">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Profile forms</h1>
          <p className="mt-1 text-sm text-zinc-300">
            First draft for the forms task.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            className="forms-primary-button"
            type="button"
            onClick={() => setOpenedForm('Uncontrolled')}
          >
            Open uncontrolled form
          </button>
          <button
            className="forms-secondary-button"
            type="button"
            onClick={() => setOpenedForm('React Hook Form')}
          >
            Open React Hook Form
          </button>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {submissions.length === 0 ? (
          <p className="forms-empty md:col-span-3">No form submissions yet.</p>
        ) : (
          submissions.map((submission) => (
            <article className="forms-submission-card" key={submission.id}>
              <p className="text-xs font-bold uppercase text-yellow-300">
                {submission.formType}
              </p>
              <h2 className="mt-2 text-lg font-bold text-white">
                {submission.name}
              </h2>
              <p className="text-sm text-zinc-300">Age: {submission.age}</p>
              <p className="text-sm text-zinc-300">Email: {submission.email}</p>
              <p className="text-sm text-zinc-300">
                Gender: {submission.gender}
              </p>
            </article>
          ))
        )}
      </div>

      {openedForm && (
        <Modal title={`${openedForm} profile form`} onClose={closeModal}>
          {openedForm === 'Uncontrolled' ? (
            <UncontrolledBasicForm onSuccess={closeModal} />
          ) : (
            <div className="rounded-md border border-yellow-400/60 bg-zinc-950/70 p-4 text-zinc-100">
              React Hook Form implementation will use this same modal next.
            </div>
          )}
        </Modal>
      )}
    </section>
  );
};
