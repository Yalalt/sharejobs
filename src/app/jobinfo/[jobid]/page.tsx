'use client';
import Divider from '@/components/Divider';
import PageTitle from '@/components/PageTitle';
import { SetLoading } from '@/redux/loadersSlice';
import { Button, Col, Row, message } from 'antd';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const JobInfo = () => {
  const { currentUser } = useSelector((state: any) => state.users);
  const [jobData, setJobData] = React.useState<any>(null);
  const [applications = [], setApplications] = React.useState<any[]>([]);
  const router = useRouter();
  const { jobid } = useParams();
  const dispatch = useDispatch();

  const fetchJob = async () => {
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

  const fetchApplication = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get(`/api/applications?job=${jobid}&user=${currentUser._id}`);
      setApplications(response.data.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  useEffect(() => {
    fetchJob();
    fetchApplication();
  }, []);

  const onApply = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.post(`/api/applications`, {
        job: jobData._id,
        user: currentUser._id,
        status: 'pending',
      });
      message.success(response.data.message);
      // router.push('/applications');
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  return (
    jobData && (
      <div>
        <PageTitle title={jobData.title} />

        <Row gutter={[16, 16]} className='gap-3'>
          <Col span={12} className='flex flex-col gap-2'>
            <div className='flex justify-between'>
              <span>Company</span>
              <span>{jobData?.user.name}</span>
            </div>

            <div className='flex justify-between'>
              <span>Location</span>
              <span>{jobData.location}</span>
            </div>

            <div className='flex justify-between'>
              <span>Salary</span>
              <span>
                {jobData.salaryFromRange} LPA - {jobData.salaryToRange} LPA
              </span>
            </div>

            <div className='flex justify-between'>
              <span>Work Mode</span>
              <span>{jobData.workMode}</span>
            </div>
            <div className='flex justify-between'>
              <span>Job Type</span>
              <span>{jobData.jobType}</span>
            </div>
            <div className='flex justify-between'>
              <span>Experience Required</span>
              <span>{jobData.experience}</span>
            </div>
          </Col>

          <Col span={24} className='flex flex-co gap-2'>
            <h1 className='text-md'>Job Description</h1>
            <Divider />
            <span>{jobData.description}</span>
            {applications.length > 0 && (
              <span className='my-3 card p-3'>
                You have already applied for this job. Please wait for the employer to accept your application.
              </span>
            )}
            <div className='flex justify-end gap-3'>
              <Button type='default' onClick={() => router.back()}>
                Cancel
              </Button>
              <Button
                type='primary'
                onClick={() => onApply()}
                disabled={currentUser.userType === 'employer' || applications.length > 0}
              >
                Apply
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    )
  );
};

export default JobInfo;
