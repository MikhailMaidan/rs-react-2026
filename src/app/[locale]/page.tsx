import { Suspense } from 'react';
import App from '../../App';
import {
  fetchCharacterDetails,
  fetchCharacters,
  type CharactersData,
} from '../../api/charactersApi';
import type { Character } from '../../types/character';

interface HomePageProps {
  searchParams: Promise<{
    details?: string | string[];
    page?: string | string[];
  }>;
}

export const dynamic = 'force-dynamic';

const getFirstParam = (value: string | string[] | undefined) => {
  return Array.isArray(value) ? value[0] : value;
};

const getPage = (value: string | undefined) => {
  const page = Number(value);

  return Number.isInteger(page) && page > 0 ? page : 1;
};

const loadInitialCharacters = async (page: number) => {
  try {
    return await fetchCharacters('', page);
  } catch {
    return null;
  }
};

const loadInitialCharacter = async (detailsId: string | null) => {
  if (!detailsId) {
    return null;
  }

  try {
    return await fetchCharacterDetails(detailsId);
  } catch {
    return null;
  }
};

const HomePage = async ({ searchParams }: HomePageProps) => {
  const params = await searchParams;
  const page = getPage(getFirstParam(params.page));
  const detailsId = getFirstParam(params.details) ?? null;
  const [initialCharactersData, initialCharacter]: [
    CharactersData | null,
    Character | null,
  ] = await Promise.all([
    loadInitialCharacters(page),
    loadInitialCharacter(detailsId),
  ]);

  return (
    <Suspense fallback={null}>
      <App
        initialCharactersData={initialCharactersData}
        initialCharactersPage={page}
        initialDetailsId={detailsId}
        initialCharacter={initialCharacter}
      />
    </Suspense>
  );
};

export default HomePage;
