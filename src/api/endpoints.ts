export const API_BASE_URL = 'https://swapi.info/api';

export const ENDPOINTS = {
  people: `${API_BASE_URL}/people`,
};

export const buildPersonUrl = (id: string) => `${ENDPOINTS.people}/${id}`;

export const buildPeopleUrl = (
  searchTerm: string,
  page: number,
  limit: number
) => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (searchTerm) {
    params.set('search', searchTerm);
  }

  return `${ENDPOINTS.people}?${params.toString()}`;
};
