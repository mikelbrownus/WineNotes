const Varietals = () => {
  const varietals = [
    'Cabernet Sauvignon', 'Pinot Noir', 'Merlot',
    'Syrah', 'Shiraz', 'Malbec', 'Zinfandel', 'Tempranillo',
    'Sangiovese', 'Nebbiolo', 'Cabernet Franc', 'Petit Verdot',
    'Petite Sirah', 'Mourvèdre', 'Chardonnay', 'Sauvignon Blanc',
    'Chenin Blanc', 'Riesling', 'Viognier', 'Gewürztraminer',
    'Pinot Grigio', 'Pinot Gris', 'Pinot Blanc', 'Moscato',
    'Sémillon', 'Grüner Veltliner', 'Müller-Thurgau',
  ].sort();
  return {
    getVarietals: () => varietals,
  };
};

export default Varietals;
