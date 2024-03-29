import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useProductsContext } from "../context/products_context";
import { single_product_url as url } from "../utils/constants";
import { formatPrice } from "../utils/helpers";
import {
    Loading,
    Error,
    ProductImages,
    AddToCart,
    Stars,
    PageHero,
} from "../components";
import styled from "styled-components";

const SingleProductPage = () => {
    const { id } = useParams();
    const history = useNavigate();

    const {
        single_product_loading: loading,
        single_product_error: error,
        single_product: product,
        single_product_images: images,
        product_stock: stock,
        fetchSingleProduct,
        fetchProductImages,
        fetchProductQuantity,
    } = useProductsContext();

    useEffect(() => {
        fetchSingleProduct(`${url}${id}`)
            .then(() => fetchProductImages(`${id}`))
            .catch(() => {
                setTimeout(() => {}, 3000);
                history.push("/");
            });
    }, [id]);

    useEffect(() => {
        fetchProductQuantity(`${id}`);
    }, [id]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <Error />;
    }

    const {
        name,
        price,
        description,
        stars,
        reviews,
        id: sku,
        companyDto,
    } = product;

    return (
        <Wrapper>
            <PageHero title={name} product />
            <div className="section section-center page">
                <Link to="/products" className="btn">
                    Back to products
                </Link>
                <div className="product-center">
                    <ProductImages images={images} />
                    <section className="content">
                        <h2>{name}</h2>
                        <Stars stars={stars} reviews={reviews} />
                        <h5 className="price">{formatPrice(price)}</h5>
                        <p className="desc">{description}</p>
                        <p className="info">
                            <span>Available :</span>

                            {stock && stock.quantityOnHand > 0
                                ? `In stock (${stock.quantityOnHand} available)`
                                : "Out of stock"}
                        </p>
                        <p className="info">
                            <span>SKU :</span>
                            {sku}
                        </p>
                        <p className="info">
                            <span>Brand :</span>
                            {companyDto}
                        </p>
                        <hr />
                        {stock && stock.quantityOnHand > 0 ? (
                            <AddToCart
                                product={product}
                                quantityOnHand={stock.quantityOnHand}
                            />
                        ) : (
                            ""
                        )}
                    </section>
                </div>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.main`
    .product-center {
        display: grid;
        gap: 4rem;
        margin-top: 2rem;
    }
    .price {
        color: var(--clr-primary-5);
    }
    .desc {
        line-height: 2;
        max-width: 45em;
    }
    .info {
        text-transform: capitalize;
        width: 300px;
        display: grid;
        grid-template-columns: 125px 1fr;
        span {
            font-weight: 700;
        }
    }

    @media (min-width: 992px) {
        .product-center {
            grid-template-columns: 1fr 1fr;
            align-items: center;
        }
        .price {
            font-size: 1.25rem;
        }
    }
`;

export default SingleProductPage;
