import { ENDPOINTS } from '../configs/endpoints';
import Blazy from 'blazy';
import { BLAZY } from '../configs/blazy';

export default function windowUpdater(result = {}) {
  const comparatorState= (() => {
    const res = {};
    for (const pointName in ENDPOINTS) {
      if (Object.hasOwnProperty.call(ENDPOINTS, pointName)) {
        res[pointName] = false;
      }
    }
    return res;
  })();

  const comparator = (fn, pointName) => {
    if (comparatorState[pointName] === true)
      return false;

    for (const innerPointName in comparatorState) {
      if (Object.hasOwnProperty.call(comparatorState, innerPointName)) {
        comparatorState[innerPointName] = false;
      }
    }

    fn();
    comparatorState[pointName] = true;
  };

  const windowInit = result => {
    const width = window.innerWidth;

    if (width <= ENDPOINTS.sm && width > ENDPOINTS.xs)
      comparator(()=>smUpdater(result), 'sm');
    if (width <= ENDPOINTS.md && width > ENDPOINTS.sm)
      comparator(()=>mdUpdater(result), 'md');
  }

  window.onresize = ()=>windowInit(result);
  windowInit(result);
}

function smUpdater(result) {
  new Blazy(BLAZY);
}

function mdUpdater(result) {
  new Blazy(BLAZY);
}