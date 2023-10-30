'use client';
import JobPostForm from '@/components/JobPostForm';
import PageTitle from '@/components/PageTitle';
import { SetLoading } from '@/redux/loadersSlice';
import { Button, Form, message } from 'antd';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const EditJob = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { jobid } = useParams();
  const [jobData, setJobData] = React.useState<any>(null);

  const onFinish = async (values: any) => {
    try {
      values._id = jobid;
      dispatch(SetLoading(true));
      const response = await axios.put(`/api/jobs/${jobid}`, values);

      message.success(response.data.message);
      router.push('/jobs');
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  const fetchJobs = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get(`/api/jobs/${jobid}`);

      setJobData(response.data.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    jobData && (
      <div>
        <div className='flex justify-between items-center'>
          <PageTitle title='Edit Job Post' />
          <Button type='default' onClick={() => router.back()}>
            Back
          </Button>
        </div>

        <Form layout='vertical' onFinish={onFinish} initialValues={jobData}>
          <JobPostForm />

          <div className='flex justify-end items-center gap-3 my-3'>
            <Button type='default' onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type='primary' htmlType='submit'>
              Update Job
            </Button>
          </div>
        </Form>
      </div>
    )
  );
};

export default EditJob;
