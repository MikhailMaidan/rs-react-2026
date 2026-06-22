import { NextResponse } from 'next/server';
import type { CharacterResult } from '../../../types/character';

interface CsvRequestBody {
  items?: unknown;
}

const isCharacterResult = (item: unknown): item is CharacterResult => {
  if (typeof item !== 'object' || item === null) {
    return false;
  }

  const character = item as Partial<CharacterResult>;

  return (
    typeof character.name === 'string' &&
    typeof character.description === 'string' &&
    typeof character.url === 'string'
  );
};

const makeCsvValue = (value: string) => {
  return `"${value.replaceAll('"', '""')}"`;
};

const makeCsvText = (items: CharacterResult[]) => {
  const rows = [
    ['Name', 'Description', 'Details URL'].map(makeCsvValue).join(','),
    ...items.map((item) =>
      [item.name, item.description, item.url].map(makeCsvValue).join(',')
    ),
  ];

  return rows.join('\n');
};

const getItemsFromForm = async (request: Request) => {
  const formData = await request.formData();
  const itemsValue = formData.get('items');

  if (typeof itemsValue !== 'string') {
    return [];
  }

  try {
    const parsedItems = JSON.parse(itemsValue) as unknown;

    return Array.isArray(parsedItems)
      ? parsedItems.filter(isCharacterResult)
      : [];
  } catch {
    return [];
  }
};

const getItemsFromJson = async (request: Request) => {
  const body = (await request.json()) as CsvRequestBody;
  const items = body.items;

  return Array.isArray(items) ? items.filter(isCharacterResult) : [];
};

const getItemsFromRequest = async (request: Request) => {
  const contentType = request.headers.get('content-type') ?? '';

  if (contentType.includes('application/json')) {
    return getItemsFromJson(request);
  }

  return getItemsFromForm(request);
};

export const POST = async (request: Request) => {
  const items = await getItemsFromRequest(request);
  const csvText = makeCsvText(items);

  return new NextResponse(csvText, {
    headers: {
      'Content-Disposition': `attachment; filename="${items.length}_items.csv"`,
      'Content-Type': 'text/csv; charset=utf-8',
    },
  });
};
