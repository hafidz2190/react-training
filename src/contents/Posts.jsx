import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Table from '../components/Table';
import * as postsBusiness from '../stores/business/postsBusiness';

const Posts = () => {
  const dispatch = useDispatch();

  const [postsData, setPostsData] = useState([]);
  const [commentsData, setCommentsData] = useState([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  useEffect(() => {
    const init = async () => {
      const data = await dispatch(postsBusiness.fetchPosts());

      setPostsData(data);
    };

    init();
  }, [dispatch]);

  const onRowClick = async (index) => {
    setSelectedRowIndex(index);

    const postId = postsData[index].id;

    const data = await dispatch(postsBusiness.fetchComments(postId));

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

export default Posts;
