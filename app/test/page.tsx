"use client";

import axios from "axios";
import Table from "../components/Tables";
import { useEffect, useState } from "react";
import TestModal from "../components/modals/TestModal";

interface Test {
  _id: string;
  name: string;
}

const Page = () => {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTests = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/p");
      setTests(response.data.data || response.data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTests();
  }, []);

  const columns = [
    { header: "Name", accessor: "name", className: "min-w-[180px]" },
    {
      header: "Action",
      accessor: "action",
      className: "hidden md:table-cell min-w-[180px]",
    },
  ];

  const renderRow = (test: Test) => (
    <tr key={test._id} className="hover:bg-gray-50">
      <td className="px-4 py-3">{test.name}</td>
      <td className="px-4 py-3 hidden md:table-cell text-gray-600">
        <div className="flex items-center gap-2">
          <TestModal type="view" id={test._id} />
          <TestModal
            type="update"
            id={test._id}
            data={{ name: test.name }}
            onSuccess={fetchTests}
          />
          <TestModal
            type="delete"
            id={test._id}
            onSuccess={fetchTests}
          />
        </div>
      </td>
    </tr>
  );

  return (
    <div className="p-20">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Tests</h1>
        <TestModal type="create" onSuccess={fetchTests} />
      </div>

      <div className="overflow-x-auto">
        <Table columns={columns} data={tests} renderRow={renderRow} />
      </div>
    </div>
  );
};

export default Page;
