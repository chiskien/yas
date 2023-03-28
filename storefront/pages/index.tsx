import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import ReactPaginate from 'react-paginate';
import BreadcrumbComponent from '../common/components/BreadcrumbComponent';
import ProductItems from '../common/items/ProductItems';
import { BreadcrumbModel } from '../modules/breadcrumb/model/BreadcrumbModel';
import type { ProductThumbnail } from '../modules/catalog/models/ProductThumbnail';
import { getFeaturedProducts } from '../modules/catalog/services/ProductService';
import Category from '../modules/category/component/Category';

const Home: NextPage = () => {
  const [products, setProduct] = useState<ProductThumbnail[]>([]);
  const [pageNo, setPageNo] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);

  useEffect(() => {
    getFeaturedProducts(pageNo).then((res) => {
      setProduct(res.productList);
      setTotalPage(res.totalPage);
    });
  }, [pageNo]);

  const changePage = ({ selected }: any) => {
    setPageNo(selected);
  };
  const crumb: BreadcrumbModel[] = [
    {
      pageName: 'Home',
      url: '/',
    },
  ];

  return (
    <>
      <BreadcrumbComponent props={crumb} />
      <Category />
      <h2>Featured products</h2>
      <Row xs={1} sm={1} md={2} lg={4} className="g-4">
        <ProductItems products={products} />
      </Row>
      <ReactPaginate
        forcePage={pageNo}
        previousLabel={'Previous'}
        nextLabel={'Next'}
        pageCount={totalPage}
        onPageChange={changePage}
        containerClassName={'paginationBtns'}
        previousLinkClassName={'previousBtn'}
        nextClassName={'nextBtn'}
        disabledClassName={'paginationDisabled'}
        activeClassName={'paginationActive'}
      />
    </>
  );
};
export default Home;
