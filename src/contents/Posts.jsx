import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Table from '../components/Table';
import * as postsBusiness from '../stores/business/postsBusiness';

const mapDispatchToProps = (dispatch) => ({
  fetchPosts: bindActionCreators(postsBusiness.fetchPosts, dispatch),
  fetchComments: bindActionCreators(postsBusiness.fetchComments, dispatch),
});

const Posts = ({ fetchPosts, fetchComments }) => {
  const [postsData, setPostsData] = useState([]);
  const [commentsData, setCommentsData] = useState([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  useEffect(() => {
    const init = async () => {
      const data = await fetchPosts();

      setPostsData(data);
    };

    init();
  }, [fetchPosts]);

  const onRowClick = async (index) => {
    setSelectedRowIndex(index);

    const postId = postsData[index].id;

    const data = await fetchComments(postId);

    setCommentsData(data);
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
        <Table
          columns={[
            { label: 'User ID', key: 'userId' },
            { label: 'Post ID', key: 'id' },
            { label: 'Title', key: 'title' },
          ]}
          data={postsData}
          selectedIndex={selectedRowIndex}
          onRowClick={onRowClick}
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
