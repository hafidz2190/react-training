import { useState, useEffect, useCallback, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import ReusableTable from '../components/ReusableTable/ReusableTable';
import Table from '../components/Table';
import * as postsBusiness from '../stores/business/postsBusiness';

const mapDispatchToProps = (dispatch) => ({
  fetchPosts: bindActionCreators(postsBusiness.fetchPosts, dispatch),
  fetchComments: bindActionCreators(postsBusiness.fetchComments, dispatch),
});

const Posts = ({ fetchPosts, fetchComments }) => {
  const pageSize = 30;

  const [commentsData, setCommentsData] = useState([]);

  const [postsData, setPostsData] = useState([]);
  const [selectedRowIds, setSelectedRowIds] = useState({});
  const [sortValue, setSortValue] = useState(null);
  const [sortType, setSortType] = useState(null);
  const [pageIndex, setPageIndex] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const itemsTotalRef = useRef(0);

  const simulateLoading = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);

      const data = await fetchPosts();

      setPostsData(data.map((e) => ({
        ...e,
        userId: e.userId.toString(),
        id: e.id.toString(),
        title: e.title.toString(),
      })));

      setIsLoading(false);
    };

    init();
  }, [fetchPosts]);

  useEffect(() => {
    simulateLoading();
    setSelectedRowIds({});
    setPageIndex(1);
    setCommentsData([]);
  }, [sortValue, sortType]);

  useEffect(() => {
    const process = async () => {
      const index = Object.keys(selectedRowIds).filter((e) => e)[0];

      if (index === null || index === undefined) {
        setCommentsData([]);

        return;
      }
      const postId = postsData[index].id;

      const data = await fetchComments(postId);

      setCommentsData(data);
    };

    process();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchComments, selectedRowIds]);

  const setPageIndexHandler = (e) => {
    simulateLoading();
    setSelectedRowIds({});
    setPageIndex(e);
    setCommentsData([]);
  };

  const getFilteredPostData = useCallback(() => {
    let filteredData = [...postsData];

    const startIndex = (pageIndex - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // sorting
    if (sortValue && sortType) {
      filteredData = filteredData.sort((a, b) => {
        if (a[sortValue] > b[sortValue]) {
          return 1;
        }

        if (b[sortValue] > a[sortValue]) {
          return -1;
        }

        return 0;
      });

      if (sortType === ReusableTable.SortType.DESC) {
        filteredData = filteredData.reverse();
      }
    }

    itemsTotalRef.current = filteredData.length;

    return filteredData.slice(startIndex, endIndex);
  }, [pageIndex, postsData, sortType, sortValue]);

  const onInlineEditingChangeHandler = (columnId, rowIndex, value) => {
    const filteredData = getFilteredPostData();
    const rowId = filteredData[rowIndex].id;

    setPostsData(postsData.map((e) => e.id === rowId ? { ...e, [columnId]: value } : e));
  };

  return (
    <div
      style={{
        display: 'flex',
        height: 'calc(100vh - 80px)',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: '50%',
          height: '100%',
        }}
      >
        <ReusableTable
          columns={[
            { Header: 'User ID', accessor: 'userId', editable: true, headerStyle: { width: 80, minWidth: 80, maxWidth: 80 } },
            { Header: 'Post ID', accessor: 'id', headerStyle: { width: 80, minWidth: 80, maxWidth: 80 } },
            { Header: 'Title', accessor: 'title' },
          ]}
          data={getFilteredPostData()}
          selectable
          selectedRowIds={selectedRowIds}
          onSelectedRowIdsChange={setSelectedRowIds}
          sortValue={sortValue}
          setSortValue={setSortValue}
          sortType={sortType}
          setSortType={setSortType}
          showPagination
          pageIndex={pageIndex}
          setPageIndex={setPageIndexHandler}
          pageSize={pageSize}
          itemsTotal={itemsTotalRef.current}
          isLoading={isLoading}
          onInlineEditingChange={onInlineEditingChangeHandler}
        />
      </div>
      <div
        style={{
          display: 'flex',
          width: '50%',
          height: '100%',
        }}
      >
        <Table
          columns={[
            { label: 'Comment ID', key: 'id' },
            { label: 'User ID', key: 'userId' },
            { label: 'Email', key: 'email' },
            { label: 'Comment', key: 'body' },
          ]}
          data={commentsData}
        />
      </div>
    </div>
  );
};

Posts.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  fetchComments: PropTypes.func.isRequired,
};

Posts.defaultProps = {
};

export default connect(null, mapDispatchToProps)(Posts);
