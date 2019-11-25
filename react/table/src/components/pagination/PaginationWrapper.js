import React from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import { withTranslation } from 'react-i18next';
import TablePagination from '@material-ui/core/TablePagination';

import TablePaginationActions from 'components/pagination/TablePaginationActions';

import conferenceType from 'components/__types__/conference';

const PaginationWrapper = ({
  children,
  pagination,
  paginationMode,
  onLoadMore,
  items,
  changePage,
  changeItemsPerPage,
  t,
}) => {
  if (paginationMode === 'infinite-scroll') {
    return (
      <InfiniteScroll
        dataLength={items.length}
        next={onLoadMore}
        hasMore={items.length < pagination.itemCount}
        loader={<div>{t('common.loadingMore')}</div>}
      >
        {children}
      </InfiniteScroll>
    );
  }
  if (paginationMode === 'pagination') {
    return (
      <>
        {children}
        <TablePagination
          component="div"
          rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
          count={pagination.itemCount}
          rowsPerPage={pagination.rowsPerPage}
          page={pagination.page}
          SelectProps={{
            native: true,
          }}
          onChangePage={changePage}
          onChangeRowsPerPage={changeItemsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      </>
    );
  }
  return children;
};

PaginationWrapper.propTypes = {
  children: PropTypes.node,
  pagination: PropTypes.shape({
    rowsPerPage: PropTypes.number,
    itemCount: PropTypes.number,
    page: PropTypes.number,
  }),
  paginationMode: PropTypes.string,
  onLoadMore: PropTypes.func,
  items: PropTypes.arrayOf(conferenceType).isRequired,
  changeItemsPerPage: PropTypes.func,
  changePage: PropTypes.func,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(PaginationWrapper);
