import React from 'react';
// import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector } from "react-redux";
import { allPages , visibleUsers, numPage, setNumPage, fromUser, toUser } from '../../Store/store';
import { v4 as uuidv4 } from 'uuid';
import './styleForPagination.css';

export const Pagination = () => {
const allPage = useSelector(allPages);
const countVisibleUsers = useSelector(visibleUsers);
const numberPage = useSelector(numPage);
const fromUsers = useSelector(fromUser);
const toUsers = useSelector(toUser);


  const paginationPages = Math.ceil(allPage / countVisibleUsers);
  const paginationArr = getPaginationControls(numberPage, paginationPages);

  function getPaginationControls(active, last) {
    if (last > 5) {
      if (active === 1) {
        return [active, active + 1, active + 2, '...', last];
      }

      if (active > 1 && active < 3) {
        return [active - 1, active, active + 1, '...', last];
      }

      if (active > 2 && active < 4) {
        return [active - 2, active - 1, active, active + 1, '...', last];
      }

      if (active > 3 && active < last - 2) {
        return [1, '...', active - 1, active, active + 1, '...', last];
      }

      if (active > last - 3 && active < last - 1) {
        return [1, '...', active - 1, active, active + 1, active + 2];
      }

      if (active > last - 2 && active < last) {
        return [1, '...', active - 1, active, active + 1];
      }

      if (active === last) {
        return [1, '...', active - 2, active - 1, active];
      }
    }

    const arr = [];

    for (let i = 1; i <= last; i += 1) {
      arr.push(i);
    }

    return arr;
  }

  return (
    <>
      <div className="active-items">
        {`Post ${fromUsers}-${toUsers} of ${allPage}`}
      </div>
      <nav>
        <ul className="pagination justify-content-center">
          <li
            className={classNames(
              'page-item',
              { disabled: numberPage === 1 },
            )}
          >
            <button
              type="button"
              className="page-link"
              onClick={() => setNumPage(numberPage - 1)}
            >
              Previous
            </button>
          </li>

          {paginationArr.map(pagination => (
            pagination !== '...'
              ? (
                <li
                  key={uuidv4()}
                  className={classNames(
                    'page-item',
                    { active: pagination === numberPage },
                  )}
                >
                  <button
                    type="button"
                    className="page-link"
                    onClick={() => setNumPage(pagination)}
                  >
                    {pagination}
                  </button>
                </li>
              )
              : (
                <li
                  key={uuidv4()}
                  className="page-item page-link ellipsis"
                >
                  {pagination}
                </li>
              )
          ))}

          <li
            className={classNames(
              'page-item',
              { disabled: numberPage === Math.ceil(allPage / countVisibleUsers) },
            )}
          >
            <button
              type="button"
              className="page-link"
              onClick={() => setNumPage(numberPage + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

// Pagination.propTypes = {
//   visibleUsers: PropTypes.number.isRequired,
//   page: PropTypes.number.isRequired,
//   setNumPage: PropTypes.func.isRequired,
// };
