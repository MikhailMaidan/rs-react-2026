import { useDispatch, useSelector } from 'react-redux';
import { clearSelectedItems } from '../../store/selectedItemsSlice';
import type { AppDispatch, RootState } from '../../store/store';

const makeCsvValue = (value: string) => {
  return `"${value.replaceAll('"', '""')}"`;
};

export function SelectedItemsFlyout() {
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

  const handleDownload = () => {
    const csvRows = [
      ['Name', 'Description', 'Details URL'].map(makeCsvValue).join(','),
      ...selectedItems.map((item) =>
        [item.name, item.description, item.url].map(makeCsvValue).join(',')
      ),
    ];
    const csvText = csvRows.join('\n');
    const blob = new Blob([csvText], { type: 'text/csv' });
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = downloadUrl;
    link.download = `${selectedItems.length}_items.csv`;
    link.click();
    URL.revokeObjectURL(downloadUrl);
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 z-30 mx-auto max-w-[1700px] rounded-lg border border-yellow-400 bg-zinc-950 px-5 py-4 shadow-[0_0_30px_rgba(250,204,21,0.18)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-lg font-bold text-white">
          Selected: {selectedItems.length}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            className="rounded-md border border-yellow-400 px-5 py-3 font-semibold text-white transition hover:bg-yellow-400/10"
            onClick={handleUnselectAll}
          >
            Unselect all
          </button>
          <button
            type="button"
            className="rounded-md bg-yellow-400 px-5 py-3 font-bold text-black transition hover:bg-yellow-300"
            onClick={handleDownload}
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
}
