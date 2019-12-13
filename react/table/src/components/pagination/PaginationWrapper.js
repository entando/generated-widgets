import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import { withTranslation } from 'react-i18next';
import TablePagination from '@material-ui/core/TablePagination';

import { withPagination, itemsPerPageOptions } from 'components/pagination/PaginationContext';
import TablePaginationActions from 'components/pagination/TablePaginationActions';

import conferenceType from 'components/__types__/conference';

class PaginationWrapper extends Component {
  componentDidMount() {
    const { count, pagination } = this.props;
    pagination.onChangeTotalItemCount(count);
  }

  componentDidUpdate(prevProps) {
    const { count, pagination } = this.props;
    if (count !== prevProps.count) {
      pagination.onChangeTotalItemCount(count);
    }
  }

  render() {
    const { children, pagination, paginationMode, items, count, t } = this.props;
    if (paginationMode === 'infinite-scroll') {
      return (
        <InfiniteScroll
          dataLength={items.length}
          next={() => pagination.onChangeCurrentPage(pagination.currentPage + 1)}
          hasMore={items.length < count}
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
          {count > 0 && (
            <TablePagination
              component="div"
              rowsPerPageOptions={itemsPerPageOptions}
              count={count}
              rowsPerPage={pagination.itemsPerPage}
              page={pagination.currentPage}
              SelectProps={{
                native: true,
              }}
              onChangePage={pagination.onChangeCurrentPage}
              onChangeRowsPerPage={pagination.onChangeItemsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          )}
        </>
      );
    }
    return children;
  }
}

PaginationWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  pagination: PropTypes.shape({
    itemsPerPage: PropTypes.number,
    currentPage: PropTypes.number,
    onChangeItemsPerPage: PropTypes.func.isRequired,
    onChangeCurrentPage: PropTypes.func.isRequired,
    onChangeTotalItemCount: PropTypes.func.isRequired,
  }).isRequired,
  paginationMode: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(conferenceType).isRequired,
  count: PropTypes.number.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(withPagination(PaginationWrapper));
