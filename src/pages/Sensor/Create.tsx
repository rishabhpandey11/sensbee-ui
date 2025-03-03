import React, { useState } from "react";
import axios from "axios";

interface SensorColumn {
  name: string;
  val_type: string;
  val_unit: string;
}

interface SensorPermission {
  operations: Array<"INFO" | "READ" | "WRITE">;
  role_name: string;
}

interface SensorData {
  columns: SensorColumn[];
  description: string;
  name: string;
  permissions: SensorPermission[];
  position: number[];
  storage: {
    params: Record<string, any>;
    variant: string;
  };
}

const Create: React.FC = () => {
  const [sensor, setSensor] = useState<SensorData>({
    name: "",
    description: "",
    columns: [],
    permissions: [],
    position: [0, 0], // Default position
    storage: { params: {}, variant: "" },
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSensor((prev) => ({ ...prev, [name]: value }));
  };

  const addColumn = () => {
    setSensor((prev) => ({
      ...prev,
      columns: [...prev.columns, { name: "", val_type: "", val_unit: "" }],
    }));
  };

  const updateColumn = (index: number, key: keyof SensorColumn, value: string) => {
    const updatedColumns = sensor.columns.map((col, i) =>
      i === index ? { ...col, [key]: value } : col
    );
    setSensor((prev) => ({ ...prev, columns: updatedColumns }));
  };

  const addPermission = () => {
    setSensor((prev) => ({
      ...prev,
      permissions: [...prev.permissions, { role_name: "", operations: [] }],
    }));
  };

  const updatePermission = (index: number, key: keyof SensorPermission, value: string | string[]) => {
    const updatedPermissions = sensor.permissions.map((perm, i) =>
      i === index ? { ...perm, [key]: value } : perm
    );
    setSensor((prev) => ({ ...prev, permissions: updatedPermissions }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("http://localhost:8080/api/sensors/create", sensor, {
        headers: { "Content-Type": "application/json" },
      });

      setMessage("Sensor created successfully!");
      setSensor({
        name: "",
        description: "",
        columns: [],
        permissions: [],
        position: [0, 0],
        storage: { params: {}, variant: "" },
      });
    } catch (error) {
      setMessage("Error creating sensor. Please try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Add New Sensor</h2>
      {message && <p className="mb-4 text-center text-red-500">{message}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Sensor Name"
          value={sensor.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={sensor.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <h3 className="font-semibold">Columns</h3>
        {sensor.columns.map((col, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              placeholder="Name"
              value={col.name}
              onChange={(e) => updateColumn(index, "name", e.target.value)}
              className="p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Value Type"
              value={col.val_type}
              onChange={(e) => updateColumn(index, "val_type", e.target.value)}
              className="p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Value Unit"
              value={col.val_unit}
              onChange={(e) => updateColumn(index, "val_unit", e.target.value)}
              className="p-2 border rounded"
              required
            />
          </div>
        ))}
        <button type="button" onClick={addColumn} className="px-4 py-2 bg-blue-500 text-white rounded">
          Add Column
        </button>

        <h3 className="font-semibold">Permissions</h3>
        {sensor.permissions.map((perm, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              placeholder="Role Name"
              value={perm.role_name}
              onChange={(e) => updatePermission(index, "role_name", e.target.value)}
              className="p-2 border rounded"
              required
            />
            <select
              multiple
              value={perm.operations}
              onChange={(e) =>
                updatePermission(
                  index,
                  "operations",
                  Array.from(e.target.selectedOptions, (opt) => opt.value)
                )
              }
              className="p-2 border rounded"
            >
              <option value="INFO">INFO</option>
              <option value="READ">READ</option>
              <option value="WRITE">WRITE</option>
            </select>
          </div>
        ))}
        <button type="button" onClick={addPermission} className="px-4 py-2 bg-green-500 text-white rounded">
          Add Permission
        </button>

        <h3 className="font-semibold">Storage</h3>
        <input
          type="text"
          name="variant"
          placeholder="Storage Variant"
          value={sensor.storage.variant}
          onChange={(e) =>
            setSensor((prev) => ({ ...prev, storage: { ...prev.storage, variant: e.target.value } }))
          }
          className="w-full p-2 border rounded"
          required
        />

        <button
          type="submit"
          className={`w-full py-2 text-white font-bold rounded ${loading ? "bg-gray-400" : "bg-blue-600"}`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Create;
