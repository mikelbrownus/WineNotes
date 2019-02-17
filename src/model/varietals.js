const Varietals = () => {
  const varietals = [
    'Arneis', 'Barbera', 'Brunello', 'Cabernet Franc',
    'Cabernet Sauvignon', 'Carignan', 'Charbono',
    'Chardonnay', 'Chenin Blanc', 'Dolcetto', 'Gamay',
    'Gewürztraminer', 'Grenache', 'Grüner Veltliner', 'Malbec',
    'Marsanne', 'Merlot', 'Moscato', 'Mourvèdre', 'Muscat',
    'Müller-Thurgau', 'Nebbiolo', 'Petit Verdot', 'Petite Sirah',
    'Pinot Blanc', 'Pinot Grigio', 'Pinot Gris', 'Pinot Noir',
    'Primitivo', 'Riesling', 'Sangiovese', 'Sauvignon Blanc',
    'Shiraz', 'Syrah', 'Sémillon', 'Tempranillo', 'Trebbiano',
    'Ugni Blanc', 'Viognier', 'Zinfandel',
  ].sort();
  return {
    getVarietals: () => varietals,
  };
};

export default Varietals;
