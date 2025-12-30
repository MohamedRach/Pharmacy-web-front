import { useState } from "react";
import { createPharmacy } from "../services/PharmacyService";

export default function CreatePharmacyForm({ token, onSuccess, onCancel }) {
  const [form, setForm] = useState({
    name: "",
    city: "",
    address: "",
    phone: "",
    open24h: false,
    duty: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createPharmacy(form, token);
      alert("Pharmacy created successfully");
      onSuccess();
    } catch (error) {
      alert(error.message || "Failed to create pharmacy");
    }
  };

  return (
    <form className="create-pharmacy-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input name="name" value={form.name} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>City</label>
        <input name="city" value={form.city} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Address</label>
        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Phone</label>
        <input name="phone" value={form.phone} onChange={handleChange} />
      </div>

      <label className="checkbox">
        <input
          type="checkbox"
          name="open24h"
          checked={form.open24h}
          onChange={handleChange}
        />
        Open 24h
      </label>

      <label className="checkbox">
        <input
          type="checkbox"
          name="duty"
          checked={form.duty}
          onChange={handleChange}
        />
        On duty
      </label>

      <div className="modal-actions">
        <button type="submit">Create</button>
        <button type="button" onClick={onCancel} className="secondary">
          Cancel
        </button>
      </div>
    </form>
  );
}