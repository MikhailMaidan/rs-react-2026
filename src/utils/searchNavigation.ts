interface SearchHrefOptions {
  detailsId?: string | null;
  page: number;
  searchTerm: string;
}

export const getCharacterId = (url: string) => {
  const parts = url.split('/').filter(Boolean);

  return parts[parts.length - 1];
};

export const makeSearchHref = ({
  detailsId = null,
  page,
  searchTerm,
}: SearchHrefOptions) => {
  const params = new URLSearchParams();

  params.set('page', String(page));

  if (searchTerm) {
    params.set('search', searchTerm);
  }

  if (detailsId) {
    params.set('details', detailsId);
  }

  return `/?${params.toString()}`;
};
