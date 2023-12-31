import React from 'react';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useParams } from 'react-router-dom';
import {Row, Col} from 'react-bootstrap';
import Product from '../components/Product' ;
import Paginate from '../components/Paginate';
import './HomeScreen.css';
import { useGetProductsQuery } from '../slices/productApiSlice';

const HomeScreen = () => {
  const {pageNumber} = useParams();
  const {data, isLoading, error} = useGetProductsQuery({pageNumber});
  return (
    <>
    {isLoading ? (<Loader />) : error? (<Message variant='danger'>{error?.data?.message ||error.error}</Message>) :(<>
    <h1 className='heading'>Latest products</h1>
    <Row>
            {data.products.map((product)=>(
                <Col key = {product._id} sm= {12} md ={6} lg={4} xl={3}>
                    <Product product={product}/>
                </Col>
            ))}
    </Row>
    <Paginate pages = {data.pages} page ={data.page} />
    </>)}
    </>
  )
} 

export default HomeScreen