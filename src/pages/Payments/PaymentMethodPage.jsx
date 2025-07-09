import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import paymentService from "../../services/paymentService";

const PaymentMethodPage = () => {
  const { state } = useLocation();
  const [bukti, setBukti] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = (e) => {
    setBukti(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bukti) return alert("Pilih file bukti pembayaran!");
  
    setUploading(true);
    paymentService.uploadBukti({
      amount: state.amount,
      transaction_id: state.transaction_id,
      bukti: bukti
    })
      .then(() => alert("Bukti pembayaran berhasil diupload!"))
      .catch((err) => {
        alert("Gagal upload bukti pembayaran");
        console.log(err?.response?.data || err.message);
      })
      .finally(() => setUploading(false));
  };

  return (
    <div>
      <h2>Pembayaran</h2>
      <p>Transfer ke rekening: <b>1234567890 (Bank ABC)</b></p>
      <p>Total: <b>Rp{Number(state.amount).toLocaleString("id-ID")}</b></p>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleUpload} />
        <button type="submit" disabled={uploading}>
          {uploading ? "Mengupload..." : "Upload Bukti Pembayaran"}
        </button>
      </form>
    </div>
  );
};

export default PaymentMethodPage; 