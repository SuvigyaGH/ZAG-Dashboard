"use client"
// Dashboard.jsx
import { useState } from 'react';
import { Layout, Menu, Row, Col, Card, Progress, Input, Select, Table, Pagination } from 'antd';
import {
  MenuOutlined,
  HomeOutlined,
  FileTextOutlined,
  ApartmentOutlined,
  SettingOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import styles from './Dashboard.module.scss'; // Make sure to import the SASS module

const { Header, Sider, Content } = Layout;
const { Option } = Select;

const Dashboard = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState('workspaces');
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 6;

  // Data for the customers and their details
  const customersData = require('./customersData.json'); // Import the JSON data

  // Columns for the customer table
  const columns = [
    { title: 'Customer Name', dataIndex: 'name', key: 'name' },
    { title: 'Company', dataIndex: 'company', key: 'company' },
    { title: 'Phone Number', dataIndex: 'phone', key: 'phone' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Country', dataIndex: 'country', key: 'country' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
  ];

  // Calculate the index range for the current page
  const startIdx = (currentPage - 1) * entriesPerPage;
  const endIdx = startIdx + entriesPerPage;

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <Layout className={styles.layoutWrapper}>
      {/* Hamburger Menu */}
      <Sider breakpoint="lg" collapsedWidth="0" theme="light">
        {/* Company logo here (replace this with your company logo) */}
        <div className={styles.companyLogo}></div>

        {/* Menu */}
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[selectedMenuItem]}
          onSelect={({ key }) => setSelectedMenuItem(key)}
        >
          <Menu.Item key="reports" icon={<FileTextOutlined />}>
            Reports
          </Menu.Item>
          <Menu.Item key="workspaces" icon={<ApartmentOutlined />}>
            Workspaces
          </Menu.Item>
          <Menu.Item key="settings" icon={<SettingOutlined />}>
            Settings
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout className={styles.layoutWrapper2}>
        {/* Main Content */}
        <Content className={styles.mainContent}>
          <div className={styles.ordersHeader}>
            <h2 className={styles.ordersHeading}>Orders</h2>
            <button className={styles.addButton}>+ Add Order</button>
          </div>
          <div className={styles.ordersSeparator}></div>

          <Row gutter={[24, 24]}>
            {/* All Customers */}
            <Col span={12}>
              <Card className={styles.cardSection}>
                <h3 className={styles.cardSectionHeading}>All Customers</h3>
                <div className={styles.circularProgressSection}>
                  {/* Circles with percentages */}
                  <div className={styles.circularProgress}>
                    <Progress type="circle" percent={75} width={80} format={() => '75%'} />
                    <div className={styles.progressLabel}>Customer Success</div>
                  </div>
                  <div className={styles.circularProgress}>
                    <Progress type="circle" percent={50} width={80} format={() => '50%'} />
                    <div className={styles.progressLabel}>New Customer</div>
                  </div>
                  <div className={styles.circularProgress}>
                    <Progress type="circle" percent={30} width={80} format={() => '30%'} />
                    <div className={styles.progressLabel}>Target Customer</div>
                  </div>
                  <div className={styles.circularProgress}>
                    <Progress type="circle" percent={20} width={80} format={() => '20%'} />
                    <div className={styles.progressLabel}>Retarget Customer</div>
                  </div>
                </div>
              </Card>
            </Col>

            {/* Status Overview */}
            <Col span={12}>
              <Card className={styles.cardSection}>
                <h3 className={styles.cardSectionHeading}>Status Overview</h3>
                <div className={styles.progressBarSection}>
                  {/* Progress bars */}
                  <div className={styles.progressBar}>
                    <div className={styles.progressBarLabel}>Active</div>
                    <Progress percent={80} status="active" />
                  </div>
                  <div className={styles.progressBar}>
                    <div className={styles.progressBarLabel}>Inactive</div>
                    <Progress percent={20} status="exception" />
                  </div>
                </div>
              </Card>
            </Col>
          </Row>

          {/* Customer Details */}
          <div className={styles.customerDetails}>
            {/* Navbar */}
            <div className={styles.navbar}>
              <h2 className={styles.activeMembersHeading}>Active Members</h2>
              <div className={styles.searchBar}>
                <Input placeholder="Search..." prefix={<SearchOutlined />} className={styles.searchInput} />
                <Select defaultValue="Sort By" className={styles.sortBySelect}>
                  <Option value="name">Name</Option>
                  <Option value="company">Company</Option>
                  {/* Add other options as needed */}
                </Select>
              </div>
            </div>

            {/* Customer List */}
            <Table dataSource={customersData.slice(startIdx, endIdx)} columns={columns} pagination={false} />

            {/* Pagination */}
            <div className={styles.pagination}>
              <div className={styles.data}>
                {`Showing data ${startIdx + 1} to ${
                  endIdx < customersData.length ? endIdx : customersData.length
                } of ${customersData.length} entries`}
              </div>
              <Pagination
                total={customersData.length}
                pageSize={entriesPerPage}
                current={currentPage}
                onChange={handleChangePage}
              />
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;





