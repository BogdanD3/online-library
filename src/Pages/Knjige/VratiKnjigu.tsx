import { Form, message, Button, Select, Input, Card } from "antd";
import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router";
import ApiService from "../../Shared/api";
import Layout from "../../Components/Layout/Layout";

interface Book {
  title: string;
  pDate: string;
  samples: number;
  bSamples: number;
  rSamples: number;
  fSamples: number;
}

interface Student {
  id: number;
  name: string;
  surname: string;
}

const VratiKnjigu: React.FC = () => {
  const [book, setBook] = useState<Book | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [storing, setStoring] = useState<boolean>(false);

  const { id } = useParams<{ id: string }>();

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [studentResponse, bookResponse] = await Promise.all([
        ApiService.getStudents(),
        ApiService.getBook(id),
      ]);

      if (studentResponse.error) {
        throw new Error(studentResponse.error);
      }

      if (bookResponse.error) {
        throw new Error(bookResponse.error);
      }

      setStudents(studentResponse.data.data);
      setBook(bookResponse.data.data);
    } catch (error: any) {
      console.error("Error fetching data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const onFinish = async (values: any) => {
    try {
      setStoring(true);
      console.log(values);

      const payload = {
        student_id: values.ucenikId,
        datumIzdavanja: values.reservationDate,
        datumVracanja: values.returnDate,
      };

      const response = await ApiService.IzdajKnjigu(id, payload);

      if (response.error) {
        throw new Error(response.error);
      }

      message.success(response.data.data.message);
    } catch (error: any) {
      console.error("Error during form submission:", error);
      setError(error.message);
    } finally {
      setStoring(false);
    }
  };

  const onFinishFailed = () => {
    message.error("Molimo provjerite formu za greške.");
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Layout title={book?.title || "Izdaj Knjigu"}>
      <div
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {error && <div>Error: {error}</div>}
        {loading && <div>Loading...</div>}
        {book && (
          <div style={{ maxWidth: "600px", width: "100%" }}>
            <Card title="Količine" style={{ marginBottom: "20px" }}>
              <p>Na raspolaganju: {book.samples - book.bSamples} primjeraka</p>
              <p>Rezervisano: {book.rSamples} primjeraka</p>
              <p>Izdato: {book.bSamples} primjeraka</p>
              <p>U prekoracenju: {book.fSamples} primjeraka</p>
              <p>Ukupna kolicina: {book.samples} primjeraka</p>
            </Card>
            <Form
              name="borrowBook"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Učenik"
                name="ucenikId"
                rules={[
                  { required: true, message: "Molimo odaberite učenika!" },
                ]}
              >
                <Select placeholder="Odaberite učenika">
                  {students.map((student) => (
                    <Select.Option key={student.id} value={student.id}>
                      {student.name} {student.surname}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Datum rezervacije"
                name="reservationDate"
                rules={[
                  {
                    required: true,
                    message: "Molimo unesite datum rezervacije!",
                  },
                ]}
              >
                <Input type="date" />
              </Form.Item>

              <Form.Item
                label="Datum vraćanja"
                name="returnDate"
                rules={[
                  { required: true, message: "Molimo unesite datum vraćanja!" },
                ]}
              >
                <Input type="date" />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" loading={storing}>
                  Izdaj Knjigu
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default VratiKnjigu;
