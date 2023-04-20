import React from "react";
import styled from "styled-components";
import { formatPrice } from "../utils/helpers";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

// const ListView = ({ products, images }) => {
//   const [main, setMain] = useState(images.length > 0 ? images[0] : null);

//   return (
//     <Wrapper>
      
//       {products.map((product, index ) => {
//         const { id, name, price, description } = product;
        
      
//         const image = images[index][0];

//         return (
//           <article key={id}>
//             <img src={image.url} alt={name} />
//             {/* {images.map((image) => (
//               <img key={image.id} src={image.url} alt={name} />
//             ))} */}
//             <div>
//               <h4>{name}</h4>
//               <h5 className="price">{formatPrice(price)}</h5>
//               <p>{description.substring(0, 150)}...</p>
//               <Link to={`/products/${id}`} className="btn">
//                 Details
//               </Link>
//             </div>
//           </article>
//         );
//       })}
//     </Wrapper>
//   );
// };

const ListView = ({ products, images }) => {
  const [main, setMain] = useState(null);

   useEffect(() => {
    if (images && images.length > 0) {
      setMain(images[0]);
    }
  }, [images]);


  return (
    <Wrapper>
      
      {products.map((product, index ) => {
        const { id, name, price, description } = product;

        const image = images && images[index] && images[index][0];

        return (
          <article key={id}>
            <img src={image ? image.url : ""} alt={name} />
            <div>
              <h4>{name}</h4>
              <h5 className="price">{formatPrice(price)}</h5>
              <p>{description.substring(0, 150)}...</p>
              <Link to={`/products/${id}`} className="btn">
                Details
              </Link>
            </div>
          </article>
        );
      })}
    </Wrapper>
  );
};


const Wrapper = styled.section`
  display: grid;
  row-gap: 3rem;

  img {
    width: 100%;
    display: block;
    width: 300px;
    height: 200px;
    object-fit: cover;
    border-radius: var(--radius);
    margin-bottom: 1rem;
  }
  h4 {
    margin-bottom: 0.5rem;
  }
  .price {
    color: var(--clr-primary-6);
    margin-bottom: 0.75rem;
  }
  p {
    max-width: 45em;
    margin-bottom: 1rem;
  }
  .btn {
    font-size: 0.5rem;
    padding: 0.25rem 0.5rem;
  }
  @media (min-width: 992px) {
    article {
      display: grid;
      grid-template-columns: auto 1fr;
      column-gap: 2rem;
      align-items: center;
    }
  }
`;

export default ListView;
