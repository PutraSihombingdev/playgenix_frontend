# Debug Database Status Column Issue

## 🚨 Masalah
Error: `Database error: 1265 (01000): Data truncated for column 'status' at row 1`

## 🔍 Analisis Masalah

### Kemungkinan Penyebab:

1. **ENUM Constraint**: Kolom `status` mungkin bertipe `ENUM` dengan nilai yang berbeda
2. **VARCHAR Length**: Kolom `status` mungkin `VARCHAR(n)` dengan panjang terbatas
3. **Case Sensitivity**: Database mungkin case-sensitive
4. **Whitespace**: Ada whitespace yang tidak diinginkan

## 🛠️ Solusi

### 1. Cek Struktur Database

```sql
-- Cek struktur tabel payments
DESCRIBE payments;

-- Cek struktur tabel transactions  
DESCRIBE transactions;

-- Cek constraint ENUM jika ada
SHOW CREATE TABLE payments;
SHOW CREATE TABLE transactions;
```

### 2. Cek Nilai Status yang Diizinkan

```sql
-- Cek nilai unik di kolom status
SELECT DISTINCT status FROM payments;
SELECT DISTINCT status FROM transactions;

-- Cek panjang maksimum nilai status
SELECT status, LENGTH(status) as length FROM payments ORDER BY length DESC LIMIT 5;
```

### 3. Perbaiki Database Schema

#### Jika menggunakan ENUM:
```sql
-- Ubah ENUM untuk mendukung nilai yang diinginkan
ALTER TABLE payments MODIFY COLUMN status ENUM('pending', 'paid', 'failed') NOT NULL DEFAULT 'pending';

-- Atau ubah ke VARCHAR
ALTER TABLE payments MODIFY COLUMN status VARCHAR(20) NOT NULL DEFAULT 'pending';
```

#### Jika menggunakan VARCHAR:
```sql
-- Pastikan panjang cukup
ALTER TABLE payments MODIFY COLUMN status VARCHAR(20) NOT NULL DEFAULT 'pending';
```

### 4. Update Data Existing

```sql
-- Update data yang tidak valid
UPDATE payments SET status = 'pending' WHERE status NOT IN ('pending', 'paid', 'failed');
UPDATE transactions SET status = 'pending' WHERE status NOT IN ('pending', 'paid', 'failed');

-- Atau hapus data yang bermasalah
DELETE FROM payments WHERE status NOT IN ('pending', 'paid', 'failed');
```

## 🔧 Frontend Fixes

### 1. Validasi Status di Frontend

```javascript
// Di transactionService.js
const allowedStatuses = ['pending', 'paid', 'failed'];

// Validasi sebelum kirim
if (!allowedStatuses.includes(status)) {
  throw new Error(`Status tidak valid: ${status}`);
}
```

### 2. Mapping Status

```javascript
// Mapping untuk memastikan format konsisten
const statusMapping = {
  'pending': 'pending',
  'paid': 'paid',
  'failed': 'failed'
};
```

### 3. Error Handling

```javascript
// Handle database errors
if (error.response?.status === 500) {
  const errorData = error.response.data;
  if (errorData?.error?.includes('Data truncated')) {
    throw new Error('Status tidak valid untuk database');
  }
}
```

## 🧪 Testing

### 1. Test Database Schema

```sql
-- Test insert dengan nilai yang valid
INSERT INTO payments (transaction_id, status, amount) VALUES (1, 'pending', 10000);
INSERT INTO payments (transaction_id, status, amount) VALUES (2, 'paid', 20000);
INSERT INTO payments (transaction_id, status, amount) VALUES (3, 'failed', 30000);

-- Test update
UPDATE payments SET status = 'paid' WHERE id = 1;
```

### 2. Test Frontend

```javascript
// Test di browser console
const testStatuses = ['pending', 'paid', 'failed'];

testStatuses.forEach(async (status) => {
  try {
    const response = await fetch('/api/v1/transaction/1/status', {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status })
    });
    
    if (response.ok) {
      console.log(`✅ Status ${status} berhasil`);
    } else {
      console.log(`❌ Status ${status} gagal:`, await response.text());
    }
  } catch (error) {
    console.log(`❌ Error ${status}:`, error.message);
  }
});
```

## 📋 Checklist

- [ ] Cek struktur database dengan `DESCRIBE`
- [ ] Cek constraint ENUM dengan `SHOW CREATE TABLE`
- [ ] Cek nilai existing di kolom status
- [ ] Perbaiki schema database jika perlu
- [ ] Update data yang tidak valid
- [ ] Test insert/update manual
- [ ] Test dari frontend
- [ ] Verifikasi error handling

## 🚀 Quick Fix

Jika ingin cepat, coba:

1. **Cek database schema:**
   ```sql
   DESCRIBE payments;
   ```

2. **Jika ENUM, ubah ke VARCHAR:**
   ```sql
   ALTER TABLE payments MODIFY COLUMN status VARCHAR(20) NOT NULL DEFAULT 'pending';
   ```

3. **Test update:**
   ```sql
   UPDATE payments SET status = 'paid' WHERE id = 1;
   ```

4. **Restart backend dan test dari frontend**

## 📞 Support

Jika masih bermasalah:
1. Share output `DESCRIBE payments;`
2. Share output `SHOW CREATE TABLE payments;`
3. Share log error lengkap dari backend
4. Cek apakah ada trigger atau constraint lain 