# Debug Transaction Status Update

## Masalah
Error 500 (Internal Server Error) saat mengupdate status transaksi:
```
PATCH http://localhost:5000/api/v1/transaction/21/status 500 (INTERNAL SERVER ERROR)
```

## Solusi yang Telah Diterapkan

### ✅ Frontend Improvements:
1. **Error Handling yang Lebih Baik**: Menambahkan try-catch dan logging detail
2. **Validasi Status**: Memastikan hanya status yang diizinkan yang dikirim (`pending`, `paid`, `failed`)
3. **Token Validation**: Memastikan token ada sebelum request
4. **Backend Connection Check**: Menambahkan pengecekan koneksi backend
5. **Konsistensi Data**: Menyesuaikan struktur data dengan backend

### ✅ Backend Integration:
1. **Endpoint Mapping**: 
   - `GET /transaction/list` - Daftar transaksi (admin)
   - `GET /transaction/my` - Transaksi user
   - `GET /transaction/{id}` - Detail transaksi
   - `PATCH /transaction/{id}/status` - Update status
   - `POST /transaction/upload-bukti` - Upload bukti transfer

2. **Status Values** (sesuai backend):
   - `pending` - Status pending
   - `paid` - Status lunas
   - `failed` - Status gagal

3. **Data Structure** (sesuai backend):
   ```json
   {
     "id": 21,
     "email": "user@example.com",
     "total": 50000,
     "account_desc": "Deskripsi akun",
     "bukti_pembayaran": "path/to/file.jpg",
     "status": "pending",
     "created_at": "2024-01-01T00:00:00Z"
   }
   ```

### ✅ Komponen yang Diperbaiki:
1. **TransactionListPage.jsx** - Daftar transaksi admin
2. **TransactionDetailPage.jsx** - Detail transaksi
3. **MyTransactionsPage.jsx** - Transaksi user (baru)
4. **transactionService.js** - Service layer

## Testing

### 1. Cek Backend Server
```bash
# Pastikan backend berjalan di port 5000
curl http://localhost:5000/api/v1/health
```

### 2. Test dengan Browser Console
```javascript
// Buka browser developer tools (F12) dan jalankan:
const token = localStorage.getItem('token');
console.log('Token:', token);

// Test koneksi backend
fetch('http://localhost:5000/api/v1/health')
  .then(res => res.json())
  .then(data => console.log('Backend OK:', data))
  .catch(err => console.error('Backend Error:', err));

// Test update status
fetch('http://localhost:5000/api/v1/transaction/21/status', {
  method: 'PATCH',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ status: 'paid' })
})
.then(res => res.json())
.then(data => console.log('Update OK:', data))
.catch(err => console.error('Update Error:', err));
```

## Kemungkinan Penyebab Error 500:

1. **Database Error**: 
   - Transaksi ID 21 tidak ada
   - Constraint violation
   - Database connection error

2. **Backend Code Error**:
   - Exception di fungsi `update_transaction_status`
   - Error saat update table `payments`
   - Role validation error

3. **Data Validation Error**:
   - Status value tidak valid
   - Transaction ID bukan integer

## Debugging Steps:

### 1. Periksa Log Backend
```bash
# Cari log error di backend
tail -f backend/logs/app.log
```

### 2. Periksa Database
```sql
-- Cek apakah transaksi 21 ada
SELECT * FROM transactions WHERE id = 21;

-- Cek payment terkait
SELECT * FROM payments WHERE transaction_id = 21;

-- Cek struktur table
DESCRIBE payments;
```

### 3. Test Endpoint Manual
```bash
# Test dengan curl
curl -X PATCH http://localhost:5000/api/v1/transaction/21/status \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"status": "paid"}'
```

## Next Steps:

1. ✅ Periksa log backend server
2. ✅ Periksa database untuk transaksi ID 21
3. ✅ Test endpoint dengan Postman/curl
4. ✅ Periksa backend validation logic
5. ✅ Pastikan user memiliki role admin

## File yang Diperbarui:

- `src/services/transactionService.js` - Service layer
- `src/pages/Transactions/TransactionListPage.jsx` - Admin list
- `src/pages/Transactions/TransactionDetailPage.jsx` - Detail view
- `src/pages/Transactions/MyTransactionsPage.jsx` - User transactions (baru)
- `DEBUG_TRANSACTION.md` - Dokumentasi ini 