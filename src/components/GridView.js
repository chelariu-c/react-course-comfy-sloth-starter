import React from "react";
import { useState, useMemo  } from 'react';
import styled from "styled-components";
import Product from "./Product";
import Pagination from './Pagination';

let PageSize = 10;

const GridView = ({ products }) => {

  const [currentPage, setCurrentPage] = useState(1);
  
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return products.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  return (
    <Wrapper>
      <div className="products-container">
        {currentTableData.map((product) => {
          return <Product key={product.id} {...product} />;
        })}
      </div>
       <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={products.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
      />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  img {
    height: 175px;
  }

  .products-container {
    display: grid;
    gap: 2rem 1.5rem;
  }

  @media (min-width: 992px) {
    .products-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (min-width: 1170px) {
    .products-container {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;

export default GridView;
