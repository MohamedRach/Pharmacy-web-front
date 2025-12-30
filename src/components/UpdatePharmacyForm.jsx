import { useState, useEffect } from "react";
import { updatePharmacy } from "../services/PharmacyService";

export default function UpdatePharmacyForm({
  pharmacy,
  onSuccess,
  onCancel,
}) {
  const [form, setForm] = useState({
    name: "",
    city: "",
    address: "",
    phone: "",
    open24h: false,
    duty: false,
  });

  useEffect(() => {
    if (pharmacy) {
      setForm({
        name: pharmacy.name,
        city: pharmacy.city,
        address: pharmacy.address,
        phone: pharmacy.phone,
        open24h: pharmacy.open24h,
        duty: pharmacy.duty,
      });
    }
  }, [pharmacy]);

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
      await updatePharmacy(pharmacy.id, form, localStorage.getItem('token'));
      alert("Pharmacy updated successfully");
      onSuccess();
    } catch (error) {
      alert(error.message || "Failed to update pharmacy");
    }
  };

  return (
    <form className="update-pharmacy-form" onSubmit={handleSubmit}>
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
        <button type="submit">Update</button>
        <button type="button" className="secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
