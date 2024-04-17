import { useState, useEffect } from 'react';
import axios from 'axios';

const ReportPage = () => {
  const [totalDonations, setTotalDonations] = useState(0);
  const [numDonors, setNumDonors] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const report = await axios.get('https://donate-backend-l3fb.onrender.com/api/report');
        console.log(report.data);
        setTotalDonations(report.data.total_donations);
        setNumDonors(report.data.total_donors);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Donation Report</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Total Donations</h2>
          <p className="text-2xl font-bold text-blue-500">${totalDonations}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Number of Donors</h2>
          <p className="text-2xl font-bold text-green-500">{numDonors}</p>
        </div>
      </div>
      <div className="mt-8 flex flex-col items-center">
        <p className="text-lg">Thank you for your generous contributions! Your donations are making a difference in the community.</p>
      </div>
    </div>
  );
};

export default ReportPage;
