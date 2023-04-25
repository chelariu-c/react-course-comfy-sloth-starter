import React from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from '../utils/usePagination';
import styled from "styled-components";

const Pagination = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
 
  return (
     <Wrapper>
    <ul
      className={classnames('pagination-container', { [className]: className })}
    >
       {/* Left navigation arrow */}
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === 1
        })}
        onClick={onPrevious}
      >
        <div className="arrow left" />
      </li>
      {paginationRange.map(pageNumber => {
         
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return <li className="pagination-item dots">&#8230;</li>;
        }
		
        // Render our Page Pills
        return (
          <li
            className={classnames('pagination-item', {
              selected: pageNumber === currentPage
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      {/*  Right Navigation arrow */}
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === lastPage
        })}
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
      </ul>
       </Wrapper>
    );
 
};

const Wrapper = styled.section`

 display: flex;
  justify-content: center; /* centers the container horizontally */
  align-items: center; /* centers the container vertically */

 .pagination-container {
	 display: flex;
	 list-style-type: none;
}
 .pagination-container .pagination-item {
	 padding: 0 12px;
	 height: 32px;
	 text-align: center;
	 margin: auto 4px;
	 color: rgba(0, 0, 0, 0.87);
	 display: flex;
	 box-sizing: border-box;
	 align-items: center;
	 letter-spacing: 0.01071em;
	 border-radius: 16px;
	 line-height: 1.43;
	 font-size: 23px;
	 min-width: 32px;
}
 .pagination-container .pagination-item.dots:hover {
	 background-color: transparent;
	 cursor: default;
}
 .pagination-container .pagination-item:hover {
	 background-color: rgba(0, 0, 0, 0.04);
	 cursor: pointer;
}
 .pagination-container .pagination-item.selected {
	 background-color: rgba(0, 0, 0, 0.08);
}
 .pagination-container .pagination-item .arrow::before {
	 position: relative;
	/* top: 3pt;
	 Uncomment this to lower the icons as requested in comments*/
	 content: '';
	/* By using an em scale, the arrows will size with the font */
	 display: inline-block;
	 width: 0.4em;
	 height: 0.4em;
	 border-right: 0.12em solid rgba(0, 0, 0, 0.87);
	 border-top: 0.12em solid rgba(0, 0, 0, 0.87);
}
 .pagination-container .pagination-item .arrow.left {
	 transform: rotate(-135deg) translate(-50%);
}
 .pagination-container .pagination-item .arrow.right {
	 transform: rotate(45deg);
}
 .pagination-container .pagination-item.disabled {
	 pointer-events: none;
}
 .pagination-container .pagination-item.disabled .arrow::before {
	 border-right: 0.12em solid rgba(0, 0, 0, 0.43);
	 border-top: 0.12em solid rgba(0, 0, 0, 0.43);
}
 .pagination-container .pagination-item.disabled:hover {
	 background-color: transparent;
	 cursor: default;
}
`;

export default Pagination;