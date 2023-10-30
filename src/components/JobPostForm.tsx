'use client';
import React from 'react';
import { Col, Form, Row } from 'antd';

const JobPostForm = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Form.Item label='Title' 
        name='title' 
        rules={[{ required: true, message: 'Please input a job title' }]} >
          <input type='text' />
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item
          label='Description'
          name='description'
          rules={[{ required: true, message: 'Please input a job description' }]}
        >
          <textarea />
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item label='Type' name='jobType'>
          <select>
            <option value='full-time' selected>Full Time</option>
            <option value='part-time'>Part Time</option>
            <option value='contract'>Contract</option>
          </select>
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item label='Location' name='location'>
          <input type='text' />
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item label='Experience' name='experience'>
          <input type='number' />
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item label='Work Mode' name='workMode'>
          <select>
            <option value='remote'>Remote</option>
            <option value='office' selected>Office</option>
          </select>
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item label='Salary From Range' name='salaryFromRange'>
          <input type='number' />
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item label='Salary To Range' name='salaryToRange'>
          <input type='number' />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default JobPostForm;
