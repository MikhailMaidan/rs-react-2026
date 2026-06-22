import {
  fetchCharacterDetails,
  fetchCharacters,
  type CharactersData,
} from '../../api/charactersApi';
import { SearchPage } from '../../components/SearchPage';
import { notFound } from 'next/navigation';
import type { Locale } from '../../i18n/routing';
import type { Character } from '../../types/character';

type PageSearchParams = Record<string, string | string[] | undefined>;

interface HomePageProps {
  params: Promise<{
    locale: Locale;
  }>;
  searchParams: Promise<PageSearchParams>;
}

export const dynamic = 'force-dynamic';

const emptyCharactersData: CharactersData = {
  hasNextPage: false,
  hasPreviousPage: false,
  items: [],
  totalItems: 0,
};

const allowedSearchParams = ['details', 'page', 'search'];

const getFirstParam = (value: string | string[] | undefined) => {
  return Array.isArray(value) ? value[0] : value;
};

const getPage = (value: string | undefined) => {
  const page = Number(value);

  return Number.isInteger(page) && page > 0 ? page : 1;
};

const getSearchTerm = (value: string | undefined) => {
  return value?.trim() ?? '';
};

const getErrorMessage = (error: unknown) => {
  return error instanceof Error ? error.message : '';
};

const loadCharacters = async (searchTerm: string, page: number) => {
  try {
    return {
      data: await fetchCharacters(searchTerm, page),
      errorMessage: '',
    };
  } catch (error) {
    return {
      data: emptyCharactersData,
      errorMessage: getErrorMessage(error),
    };
  }
};

const loadCharacter = async (detailsId: string | null) => {
  if (!detailsId) {
    return {
      data: null,
      errorMessage: '',
    };
  }

  try {
    return {
      data: await fetchCharacterDetails(detailsId),
      errorMessage: '',
    };
  } catch (error) {
    return {
      data: null,
      errorMessage: getErrorMessage(error),
    };
  }
};

const hasUnknownSearchParam = (searchParams: PageSearchParams) => {
  return Object.keys(searchParams).some(
    (key) => !allowedSearchParams.includes(key)
  );
};

const HomePage = async ({ params, searchParams }: HomePageProps) => {
  const [{ locale }, searchParamsValue] = await Promise.all([
    params,
    searchParams,
  ]);

  if (hasUnknownSearchParam(searchParamsValue)) {
    notFound();
  }

  const page = getPage(getFirstParam(searchParamsValue.page));
  const searchTerm = getSearchTerm(getFirstParam(searchParamsValue.search));
  const detailsId = getFirstParam(searchParamsValue.details) ?? null;
  const [characters, character]: [
    { data: CharactersData; errorMessage: string },
    { data: Character | null; errorMessage: string },
  ] = await Promise.all([
    loadCharacters(searchTerm, page),
    loadCharacter(detailsId),
  ]);

  return (
    <SearchPage
      character={character.data}
      charactersData={characters.data}
      currentPage={page}
      detailsErrorMessage={character.errorMessage}
      detailsId={detailsId}
      locale={locale}
      resultsErrorMessage={characters.errorMessage}
      searchTerm={searchTerm}
    />
  );
};

export default HomePage;
