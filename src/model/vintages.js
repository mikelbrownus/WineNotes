import range from 'ramda/src/range';

const Vintages = () => {
  const yMinusX = y => x => y - x;
  const thisYearMinusX = yMinusX(new Date().getFullYear());
  const vintages = range(0, 100)
    .map(thisYearMinusX)
    .map(x => `${x}`);
  return {
    getVintages: () => vintages,
  };
};

export default Vintages;
