# Panduan Penggunaan Fungsi Update Status dan Delete Transaksi

## 🎯 Overview
Aplikasi PlayGenix Frontend sekarang memiliki fungsi lengkap untuk mengelola transaksi, termasuk:
- ✅ Update status transaksi (pending → paid → failed)
- ✅ Hapus transaksi
- ✅ Role-based access control (admin vs user)
- ✅ Error handling yang komprehensif
- ✅ UI feedback yang responsif

## 🔧 Fungsi yang Tersedia

### 1. Update Status Transaksi
**Endpoint:** `PATCH /transaction/{id}/status`
**Role:** Admin only
**Status yang diizinkan:** `pending`, `paid`, `failed`

### 2. Delete Transaksi
**Endpoint:** `DELETE /transaction/{id}`
**Role:** Admin only

## 🚀 Cara Penggunaan

### Untuk Admin:

1. **Login sebagai admin**
2. **Akses halaman Transaksi** (menu "Transaksi")
3. **Pilih transaksi** dari daftar di sebelah kiri
4. **Update Status:**
   - Pilih status baru dari dropdown
   - Status akan otomatis terupdate
   - Loading indicator akan muncul selama proses
5. **Delete Transaksi:**
   - Klik tombol "🗑️ Hapus Transaksi"
   - Konfirmasi penghapusan
   - Transaksi akan dihapus dari daftar

### Untuk User:

1. **Login sebagai user biasa**
2. **Akses halaman Transaksi** (menu "Transaksi")
3. **Lihat transaksi sendiri** (tidak bisa update/delete)
4. **Upload bukti transfer** jika status masih pending

## 🔍 Debugging dan Testing

### Test Manual di Browser Console:

```javascript
// Load test functions
fetch('/test-transaction-functions.js')
  .then(res => res.text())
  .then(code => eval(code));

// Jalankan semua test
window.testTransactionFunctions.runAllTests();

// Atau test individual
window.testTransactionFunctions.testBackendConnection();
window.testTransactionFunctions.testTransactionList();
```

### Cek Log di Console:

1. **Buka Developer Tools** (F12)
2. **Pilih tab Console**
3. **Lakukan aksi update/delete**
4. **Perhatikan log detail** yang muncul

## ⚠️ Error Handling

### Error 500 (Internal Server Error):
- **Penyebab:** Backend server error
- **Solusi:** Periksa log backend, pastikan database berjalan

### Error 403 (Forbidden):
- **Penyebab:** User tidak memiliki role admin
- **Solusi:** Login dengan akun admin

### Error 404 (Not Found):
- **Penyebab:** Transaksi tidak ditemukan
- **Solusi:** Refresh halaman, cek ID transaksi

### Error 401 (Unauthorized):
- **Penyebab:** Token tidak valid
- **Solusi:** Login ulang

## 🛠️ Troubleshooting

### Masalah Umum:

1. **Status tidak berubah:**
   - Cek console untuk error
   - Pastikan backend berjalan
   - Periksa role user

2. **Transaksi tidak terhapus:**
   - Cek konfirmasi dialog
   - Periksa error di console
   - Pastikan transaksi ada di database

3. **Loading tidak berhenti:**
   - Refresh halaman
   - Cek koneksi internet
   - Restart aplikasi

### Debugging Steps:

1. **Cek Backend:**
   ```bash
   curl http://localhost:5000/api/v1/health
   ```

2. **Cek Token:**
   ```javascript
   console.log('Token:', localStorage.getItem('token'));
   ```

3. **Test Endpoint Manual:**
   ```bash
   curl -X PATCH http://localhost:5000/api/v1/transaction/1/status \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"status": "paid"}'
   ```

## 📁 File yang Terlibat

### Frontend Files:
- `src/services/transactionService.js` - Service layer
- `src/pages/Transactions/TransactionAdminPage.jsx` - Halaman admin
- `src/pages/Transactions/TransactionUserPage.jsx` - Halaman user
- `src/pages/Transactions/TransactionPage.jsx` - Wrapper component

### Test Files:
- `test-transaction-functions.js` - Test functions
- `TRANSACTION_GUIDE.md` - Dokumentasi ini

## 🔄 Update Log

### v1.0.0 (Current):
- ✅ Implementasi update status transaksi
- ✅ Implementasi delete transaksi
- ✅ Role-based access control
- ✅ Error handling komprehensif
- ✅ UI feedback responsif
- ✅ Loading states
- ✅ Test functions

### Planned Features:
- 🔄 Bulk operations (update multiple transactions)
- 🔄 Transaction history/logs
- 🔄 Export transactions to CSV
- 🔄 Advanced filtering and search

## 📞 Support

Jika mengalami masalah:
1. Cek console browser untuk error
2. Periksa log backend
3. Test dengan file `test-transaction-functions.js`
4. Pastikan semua dependencies terinstall
5. Restart aplikasi jika diperlukan 