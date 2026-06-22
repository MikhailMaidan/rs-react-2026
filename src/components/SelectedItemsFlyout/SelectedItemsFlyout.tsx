import { useTranslations } from 'next-intl';
import { useDispatch, useSelector } from 'react-redux';
import { clearSelectedItems } from '../../store/selectedItemsSlice';
import type { AppDispatch, RootState } from '../../store';

export const SelectedItemsFlyout = () => {
  const t = useTranslations('Selected');
  const dispatch = useDispatch<AppDispatch>();
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.items
  );

  if (selectedItems.length === 0) {
    return null;
  }

  const handleUnselectAll = () => {
    dispatch(clearSelectedItems());
  };

  return (
    <div className="selected-flyout">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-lg font-bold text-white">
          {t('selected', { count: selectedItems.length })}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            className="cursor-pointer rounded-md border border-yellow-400 px-5 py-3 font-semibold text-white transition hover:bg-yellow-400/10"
            onClick={handleUnselectAll}
          >
            {t('unselectAll')}
          </button>
          <form
            action="/api/export-csv"
            method="post"
            aria-label={t('download')}
          >
            <input
              type="hidden"
              name="items"
              value={JSON.stringify(selectedItems)}
            />
            <button
              type="submit"
              className="w-full cursor-pointer rounded-md bg-yellow-400 px-5 py-3 font-bold text-black transition hover:bg-yellow-300"
            >
              {t('download')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
