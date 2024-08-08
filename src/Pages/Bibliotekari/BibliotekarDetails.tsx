import React, { useState, useEffect, useCallback, Fragment } from "react";
import { useParams } from "react-router";
import ApiService from "../../Shared/api";
import { Col, Row } from "antd";
import Layout from "../../Components/Layout/Layout";

interface User {
  id?: number;
  role?: string;
  jmbg?: string;
  photoPath?: string;
  username?: string;
  name?: string;
  surname?: string;
  email?: string;
}

const BibliotekarDetails: React.FC = () => {
  const [user, setUser] = useState<User>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams();

  const fetchData = useCallback(async () => {
    try {
      const response = await ApiService.getLibrarian(id);

      if (response.error) {
        setError(response.error);
      }

      console.log("API Response:", response);

      setUser(response.data.data);
    } catch (error: any) {
      console.error("There was a problem with the fetch operation:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Fragment>
      <Layout title="Bibliotekar">
        {error && <div>Error: {error}</div>}
        {loading && <div>Loading...</div>}
        <div className="wrapper" style={{padding: '20px'}}>
          <Row>
            <Col span={3}>
            Korisničko ime:
            </Col>
            <Col span={12}>
            {user.name }
            </Col>
          </Row>

          <Row>
            <Col span={3}>
            Email:
            </Col>
            <Col span={12}>
            {user.email }
            </Col>
          </Row>
        </div>
      </Layout>
    </Fragment>
  );
};

export default BibliotekarDetails;
