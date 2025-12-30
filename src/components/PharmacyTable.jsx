import { useState } from "react";
import UpdatePharmacyForm from "./UpdatePharmacyForm";
import { deletePharmacy } from "../services/PharmacyService";

export default function PharmacyTable({ items, fetchPharmacies }) {
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedPharmacy, setSelectedPharmacy] = useState(null);

    const onDelete = async (id)=> {
      try {
        await deletePharmacy(id, localStorage.getItem('token'));
        alert("Pharmacy deleted successfully");
        fetchPharmacies()
      } catch (error) {
        alert(error.message || "Failed to delete pharmacy")
      }
    }
  return (
    <div className="pharmacy-table-wrapper">
      <table className="pharmacy-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>City</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Open 24h</th>
            <th>On Duty</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan="7" className="empty">No data available</td>
            </tr>
          ) : (
            items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.city}</td>
                <td>{item.address}</td>
                <td>{item.phone}</td>
                <td>{item.open24h ? "Yes" : "No"}</td>
                <td>{item.duty ? "Yes" : "No"}</td>
                <td className="actions">
                 <button
                    className="update-btn"
                    onClick={() => {
                        setSelectedPharmacy(item);
                        setShowUpdateModal(true);
                    }}
                    >
                    Update
                </button>
                  <button
                    className="btn delete"
                    onClick={() => onDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {showUpdateModal && selectedPharmacy && (
        <div className="modal-backdrop">
            <div className="modal">
            <h2>Update Pharmacy</h2>
            <UpdatePharmacyForm
                pharmacy={selectedPharmacy}
                onSuccess={() => {
                setShowUpdateModal(false);
                setSelectedPharmacy(null);
                fetchPharmacies();
                }}
                onCancel={() => {
                setShowUpdateModal(false);
                setSelectedPharmacy(null);
                }}
            />
            </div>
        </div>
    )}
    </div>
  );
}