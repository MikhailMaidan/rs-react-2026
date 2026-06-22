export const getAssetUrl = (assetPath: string) => {
  if (assetPath.startsWith('/')) {
    return assetPath;
  }

  return `/${assetPath}`;
};
