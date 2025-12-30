import { useEffect, useState } from "react";
import PharmacyTable from "../components/PharmacyTable";
import { getPharmacies } from "../services/PharmacyService";
import { useNavigate } from "react-router-dom";
import CreatePharmacyForm from "../components/CreatePharmacyForm";

export default function PharmacyPage() {
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate()
  const [filters, setFilters] = useState({
    city: "",
    open24h: undefined,
    duty: undefined,
  });

  const [showCreateModal, setShowCreateModal] = useState(false);
  const token = localStorage.getItem("token");


  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const fetchPharmacies = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getPharmacies(
        {
          city: filters.city || undefined,
          open24h: filters.open24h || undefined,
          duty: filters.duty || undefined,
        },
        token
      );
      setPharmacies(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
        navigate('/login')
    }
    fetchPharmacies();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
   
  };


  return (
    <div className="pharmacy-page">
         <div className="pharmacy-page-header">
        <h1>Pharmacies</h1>

        <button className="signout-btn" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
        <button className="add-pharmacy-btn" onClick={() => setShowCreateModal(true)}>+ Add Pharmacy</button>
        {showCreateModal && (
            <div className="modal-backdrop">
                <div className="modal">
                <h2>Create Pharmacy</h2>
                <CreatePharmacyForm
                    token={token}
                    onSuccess={() => {
                    setShowCreateModal(false);
                    fetchPharmacies();
                    }}
                    onCancel={() => setShowCreateModal(false)}
                />
                </div>
            </div>
        )}
      <div className="filters">
        <input
          type="text"
          name="city"
          placeholder="Filter by city"
          value={filters.city}
          onChange={handleFilterChange}
        />

        <label className="checkbox">
          <input
            type="checkbox"
            name="open24h"
            checked={filters.open24h}
            onChange={handleFilterChange}
          />
          Open 24h
        </label>

        <label className="checkbox">
          <input
            type="checkbox"
            name="duty"
            checked={filters.duty}
            onChange={handleFilterChange}
          />
          On duty
        </label>

        <button onClick={fetchPharmacies}>Apply filters</button>
      </div>

      {loading && <p>Loading pharmacies...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <PharmacyTable
          items={pharmacies}
          fetchPharmacies={fetchPharmacies}
        />
      )}
    </div>
  );
}
