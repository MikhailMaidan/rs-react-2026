import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../Modal';
import { ReactHookBasicForm } from './ReactHookBasicForm';
import { UncontrolledBasicForm } from './UncontrolledBasicForm';
import { useCountries } from '../../hooks/useCountries';
import { clearRecentSubmission } from '../../store/formsSlice';
import type { AppDispatch, RootState } from '../../store';
import type { FormType } from '../../types/forms';

export const FormsSection = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [openedForm, setOpenedForm] = useState<FormType | null>(null);
  const { countries, countriesError, isLoadingCountries } = useCountries();
  const submissions = useSelector(
    (state: RootState) => state.forms.submissions
  );
  const recentSubmissionId = useSelector(
    (state: RootState) => state.forms.recentSubmissionId
  );

  useEffect(() => {
    if (!recentSubmissionId) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      dispatch(clearRecentSubmission());
    }, 3500);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [dispatch, recentSubmissionId]);

  const closeModal = () => {
    setOpenedForm(null);
  };

  return (
    <section className="mx-auto max-w-[1500px] px-4 sm:px-6">
      <div className="forms-section">
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
            <p className="forms-empty md:col-span-3">
              No form submissions yet.
            </p>
          ) : (
            submissions.map((submission) => (
              <article
                className={`forms-submission-card ${
                  recentSubmissionId === submission.id
                    ? 'forms-submission-card-new'
                    : ''
                }`}
                key={submission.id}
              >
                <p className="text-xs font-bold uppercase text-yellow-300">
                  {submission.formType}
                </p>
                <h2 className="mt-2 text-lg font-bold text-white">
                  {submission.name}
                </h2>
                <p className="text-sm text-zinc-300">Age: {submission.age}</p>
                <p className="text-sm text-zinc-300">
                  Email: {submission.email}
                </p>
                <p className="text-sm text-zinc-300">
                  Gender: {submission.gender}
                </p>
                <p className="text-sm text-zinc-300">
                  Country: {submission.country}
                </p>
                {submission.avatar && (
                  <img
                    className="forms-card-avatar"
                    src={submission.avatar}
                    alt=""
                  />
                )}
              </article>
            ))
          )}
        </div>
      </div>

      {openedForm && (
        <Modal title={`${openedForm} profile form`} onClose={closeModal}>
          <datalist id="countries-list">
            {countries.map((country) => (
              <option key={country} value={country} />
            ))}
          </datalist>
          {openedForm === 'Uncontrolled' ? (
            <UncontrolledBasicForm
              countries={countries}
              countriesError={countriesError}
              isLoadingCountries={isLoadingCountries}
              onSuccess={closeModal}
            />
          ) : (
            <ReactHookBasicForm
              countries={countries}
              countriesError={countriesError}
              isLoadingCountries={isLoadingCountries}
              onSuccess={closeModal}
            />
          )}
        </Modal>
      )}
    </section>
  );
};
