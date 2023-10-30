'use client';
import { SetLoading } from '@/redux/loadersSlice';
import { Col, Divider, Row, message } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default async function Home() {
  const router = useRouter();
  const [jobs = [], setJobs] = useState([]);
  const { currentUser } = useSelector((state: any) => state.users);
  const dispatch = useDispatch();

  const fetchJobs = async () => {
    try {
      dispatch(SetLoading(true));

      const response = await axios.get(`/api/jobs`);

      setJobs(response.data.data);

      console.log(response.data.data);
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
    <div>
      <Row gutter={[16, 16]}
      className='gap-3'
      >
        {jobs.map((job: any) => {
          return (
            <Col
            span={8}
            className='card flex flex-col gap-2 py-3 cursor-pointer'
            key={job._id}
            onClick={() => router.push(`/jobinfo/${job._id}`)}
          >
            <h1 className='text-md'>{job.title}</h1>
            <Divider />

            <div className='flex justify-between'>
              <span>Company</span>
              <span>{job.user.name}</span>
            </div>

            <div className='flex justify-between'>
              <span>Location</span>
              <span>{job.location}</span>
            </div>

            <div className='flex justify-between'>
              <span>Salary</span>
              <span>
                {job.salaryFromRange} LPA - {job.salaryToRange} LPA
              </span>
            </div>

            <div className='flex justify-between'>
              <span>Work Mode</span>
              <span>{job.workMode}</span>
            </div>
          </Col>
          )
        })
        }
      </Row>
    </div>
  );
}
