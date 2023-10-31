'use client';
import { Button, Col, Form, Row } from 'antd';
import React from 'react';

const EmployeeForm = () => {
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Form.Item label='Name' name='name' rules={[{ required: true, message: 'Please input your name!' }]}>
            <input type='text' />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label='Email' name='email' rules={[{ required: true, message: 'Please input your email!' }]}>
            <input type='email' />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label='Phone' name='phone' rules={[{ required: true, message: 'Please input your phone!' }]}>
            <input type='text' />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            label='Carrier Objective'
            name='carrierObjective'
            rules={[{ required: true, message: 'Please input your Carrier Objective!' }]}
          >
            <textarea />
          </Form.Item>
        </Col>
      </Row>

      {/* Education */}
      <div style={{
        marginTop: 35,
      }}>
        <h1 className='text-md'>
          Education
        </h1>
        <Form.List name='education'>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Row key={key} gutter={[16, 16]} align='bottom'>
                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      name={[name, 'qualification']}
                      rules={[
                        {
                          required: true,
                          message: 'Required',
                        },
                      ]}
                      label='Qualification'
                    >
                      <input type='text' />
                    </Form.Item>
                  </Col>

                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      name={[name, 'institute']}
                      rules={[
                        {
                          required: true,
                          message: 'Required',
                        },
                      ]}
                      label='Institute'
                    >
                      <input type='text' />
                    </Form.Item>
                  </Col>

                  <Col span={4}>
                    <Form.Item
                      {...restField}
                      name={[name, 'percentage']}
                      rules={[
                        {
                          required: true,
                          message: 'Required',
                        },
                      ]}
                      label='Percentage'
                    >
                      <input type='text' />
                    </Form.Item>
                  </Col>

                  <i className='ri-delete-bin-line' onClick={() => remove(name)}></i>
                </Row>
              ))}
              <Form.Item
              className='my-2'>
                <Button type='dashed' onClick={() => add()} block>
                  Add Education
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </div>
      {/* Education */}


      {/* Skills */}
      <div style={{
        marginTop: 35,
      }}>
        <h1 className='text-md'>
          Skills
        </h1>
        <Form.List name='skills'>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Row key={key} gutter={[16, 16]} align='bottom'>
                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      name={[name, 'technology']}
                      rules={[
                        {
                          required: true,
                          message: 'Required',
                        },
                      ]}
                      label='Technology'
                    >
                      <input type='text' />
                    </Form.Item>
                  </Col>

                  <Col span={4}>
                    <Form.Item
                      {...restField}
                      name={[name, 'rating']}
                      rules={[
                        {
                          required: true,
                          message: 'Required',
                        },
                      ]}
                      label='Rating'
                    >
                      <input type='text' />
                    </Form.Item>
                  </Col>

                  <i className='ri-delete-bin-line' onClick={() => remove(name)}></i>
                </Row>
              ))}
              <Form.Item
              className='my-2'>
                <Button type='dashed' onClick={() => add()} block>
                  Add Skill
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </div>
      {/* Skills */}


      {/* Experience */}
      <div style={{
        marginTop: 35,
      }}>
        <h1 className='text-md'>
          Experience
        </h1>
        <Form.List name='experience'>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Row key={key} gutter={[16, 16]} align='bottom'>
                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      name={[name, 'company']}
                      rules={[
                        {
                          required: true,
                          message: 'Required',
                        },
                      ]}
                      label='Company'
                    >
                      <input type='text' />
                    </Form.Item>
                  </Col>

                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      name={[name, 'role']}
                      rules={[
                        {
                          required: true,
                          message: 'Required',
                        },
                      ]}
                      label='Role'
                    >
                      <input type='text' />
                    </Form.Item>
                  </Col>

                  <Col span={4}>
                    <Form.Item
                      {...restField}
                      name={[name, 'period']}
                      rules={[
                        {
                          required: true,
                          message: 'Required',
                        },
                      ]}
                      label='Period of Work'
                    >
                      <input type='text' />
                    </Form.Item>
                  </Col>

                  <i className='ri-delete-bin-line' onClick={() => remove(name)}></i>
                </Row>
              ))}
              <Form.Item
              className='my-2'>
                <Button type='dashed' onClick={() => add()} block>
                  Add Experience
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </div>
      {/* Experience */}
    </>
  );
};

export default EmployeeForm;
