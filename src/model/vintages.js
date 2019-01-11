const Vintages = () => {
  const yMinusX = y => x => y - x;
  const thisYearMinusX = yMinusX(new Date().getFullYear());
  const vintages = [...Array(100).keys()].map(thisYearMinusX).map(x => `${x}`);
  return {
    getVintages: () => vintages,
  };
};

export default Vintages;
