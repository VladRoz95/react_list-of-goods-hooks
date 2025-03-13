import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

type SortStatus = {
  sortedGoods: SortType;
  reversed: boolean;
};

enum SortType {
  Alphabet,
  Length,
  Default,
}

function isSortedGoods(goods: string[], { sortedGoods, reversed }: SortStatus) {
  const visibleGoods = [...goods];

  if (sortedGoods === SortType.Alphabet) {
    visibleGoods.sort();
  } else if (sortedGoods === SortType.Length) {
    visibleGoods.sort((a, b) => a.length - b.length);
  }

  if (reversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortedGoods, setSortedGoods] = useState(SortType.Default);
  const [reversed, setReversed] = useState(false);

  const goods = isSortedGoods(goodsFromServer, { sortedGoods, reversed });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortedGoods === SortType.Alphabet ? '' : 'is-light'}`}
          onClick={() => setSortedGoods(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortedGoods === SortType.Length ? '' : 'is-light'}`}
          onClick={() => setSortedGoods(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-success ${reversed ? '' : 'is-light'}`}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(sortedGoods !==SortType.Default || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortedGoods(SortType.Default);
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
