'use client';
import { Button, Modal, Table, message } from 'antd';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { SetLoading } from '@/redux/loadersSlice';
import moment from 'moment';

function Applications({
  showApplications,
  setShowApplications,
  selectedJob,
}: {
  showApplications: boolean;
  setShowApplications: (showApplications: boolean) => void;
  selectedJob: any;
}) {
  const router = useRouter();
  const [applications, setApplications] = React.useState([]);
  const dispatch = useDispatch();

  const fetchApplications = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get(`/api/applications?job=${selectedJob._id}`);
      
      // test
      console.log(response.data.data);

      setApplications(response.data.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  const onStatusUpdate = async (applicationId: string, status: string) => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.put(`/api/applications/${applicationId}`, {
        status,
      });
      message.success(response.data.message);
      fetchApplications();
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  React.useEffect(() => {
    fetchApplications();
  }, []);

  const columns = [
    {
      title: 'Application ID',
      dataIndex: '_id',
    },
    {
      title: 'Applicant',
      dataIndex: 'user',
      render: (user: any) => user.name,
    },
    {
      title: 'Email',
      dataIndex: 'user',
      render: (user: any) => user.email,
    },
    {
      title: 'Applied On',
      dataIndex: 'createdAt',
      render: (createdAt: any) => moment(createdAt).format('DD/MM/YYYY'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status: string, record: any) => (
        <select value={status} onChange={(e) => onStatusUpdate(record._id, e.target.value)}>
          <option value='pending'>Pending</option>
          <option value='shortlisted'>Shortlisted</option>
          <option value='rejected'>Rejected</option>
        </select>
      ),
    },
    {
      title: 'Actions',
      dataIndex: '_id',
      render: (applicationId: string, application: any) => (
        <Button onClick={() => router.push(`/userinfo/${application.user._id}`)}>View</Button>
      ),
    },
  ];
  
  return (
    <Modal
      title={`Applications for ${selectedJob.title}`}
      open={showApplications}
      onCancel={() => setShowApplications(false)}
      width={1000}
    >
      <div className='my-3'>
        <Table columns={columns} dataSource={applications} />
      </div>
    </Modal>
  );
}

export default Applications;
