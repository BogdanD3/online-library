import React, { useState, useEffect, useCallback, Fragment } from "react";
import { useParams } from "react-router";
import ApiService from "../../Shared/api";
import { FormProps, message } from "antd";
import Layout from "../../Components/Layout/Layout";
import { Button, Form, Input } from "antd";

type FieldType = {
  id: number;
  title: string;
  authors: { id: number; name: string; surname: string }[];
  categories: { id: number; name: string }[];
  samples: number;
  bSamples: number;
  rSamples: number;
  fSamples: number;
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  message.error("Provjeri formu");
};

interface Book {
  id: number;
  title: string;
  authors: { id: number; name: string; surname: string }[];
  categories: { id: number; name: string }[];
  samples: number;
  bSamples: number;
  rSamples: number;
  fSamples: number;
}

const KnjigaEdit: React.FC = () => {
  const [user, setUser] = useState<Book>();
  const [userLoaded, setUserLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [storing, setStoring] = useState<boolean>(false);

  const { id } = useParams();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    var idAsNumber = parseInt(id as string);
    storeUserData(idAsNumber, values);
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await ApiService.getBook(id);

      if (response.error) {
        setError(response.error);
      }

      console.log("API Response:", response);

      setUser(response.data.data);
      setUserLoaded(true);
    } catch (error: any) {
      console.error("There was a problem with the fetch operation:", error);
      setError(error.message);
    }
  }, []);

  const storeUserData = useCallback(async (id: number, bookData: Book) => {
    try {
      setStoring(true);
      const response = await ApiService.updateLibrarian(id, bookData);

      if (response.error) {
        setError(response.error);
      }

      console.log("API Response:", response);

      message.success(response.data.message);

      setUser(response.data.data);
    } catch (error: any) {
      console.error("There was a problem with the fetch operation:", error);
      setError(error.message);
    } finally {
      setStoring(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Fragment>
      <Layout title="Knjiga">
        {error && <div>Error: {error}</div>}
        {!userLoaded && <div>Loading user...</div>}
        <div className="wrapper" style={{ padding: "20px" }}>
          {userLoaded && (
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={{ ...user }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item<FieldType>
                label="Title"
                name="title"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType>
                label="Authors"
                name="authors"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType>
                label="Samples"
                name="samples"
                rules={[
                  { required: true, message: "Please input your surname!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType>
                label="Categories"
                name="categories"
                rules={[{ required: true, message: "Please input your jmbg!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item<FieldType>
                label="Categories"
                name="rSamples"
                rules={[{ required: true, message: "Please input your jmbg!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item<FieldType>
                label="Categories"
                name="fSamples"
                rules={[{ required: true, message: "Please input your jmbg!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" loading={storing}>
                  Sačuvaj izmjene
                </Button>
              </Form.Item>
            </Form>
          )}
        </div>
      </Layout>
    </Fragment>
  );
};

export default KnjigaEdit;
