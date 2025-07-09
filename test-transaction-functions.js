// Test file untuk memverifikasi fungsi update dan delete transaksi
// Jalankan di browser console setelah login sebagai admin

console.log('🧪 Testing Transaction Functions...');

// Test 1: Cek token
const token = localStorage.getItem('token');
console.log('Token exists:', !!token);
if (token) {
  console.log('Token preview:', token.substring(0, 20) + '...');
}

// Test 2: Cek koneksi backend
async function testBackendConnection() {
  try {
    const response = await fetch('http://localhost:5000/api/v1/health');
    const data = await response.json();
    console.log('✅ Backend connected:', data);
    return true;
  } catch (error) {
    console.log('❌ Backend not connected:', error.message);
    return false;
  }
}

// Test 3: Cek list transaksi
async function testTransactionList() {
  try {
    const response = await fetch('http://localhost:5000/api/v1/transaction/list', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('✅ Transaction list retrieved:', data.length, 'transactions');
    
    // Cari transaksi untuk test
    if (data.length > 0) {
      const testTransaction = data[0];
      console.log('📋 Test transaction found:', testTransaction);
      return testTransaction.id;
    } else {
      console.log('⚠️ No transactions found for testing');
      return null;
    }
  } catch (error) {
    console.log('❌ Failed to get transaction list:', error.message);
    return null;
  }
}

// Test 4: Test update status
async function testUpdateStatus(transactionId) {
  if (!transactionId) {
    console.log('⚠️ No transaction ID for testing update');
    return;
  }
  
  const testStatuses = ['pending', 'paid', 'failed'];
  
  for (const status of testStatuses) {
    try {
      console.log(`🔄 Testing status update to: ${status}`);
      
      const response = await fetch(`http://localhost:5000/api/v1/transaction/${transactionId}/status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`HTTP ${response.status}: ${errorData.error || response.statusText}`);
      }
      
      const data = await response.json();
      console.log(`✅ Status updated to ${status}:`, data);
      
      // Tunggu sebentar sebelum test berikutnya
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.log(`❌ Failed to update status to ${status}:`, error.message);
    }
  }
}

// Test 5: Test delete transaction (optional - hati-hati!)
async function testDeleteTransaction(transactionId) {
  if (!transactionId) {
    console.log('⚠️ No transaction ID for testing delete');
    return;
  }
  
  // Konfirmasi sebelum delete
  const shouldDelete = confirm(`Yakin ingin menghapus transaksi ${transactionId}? Ini hanya untuk testing!`);
  if (!shouldDelete) {
    console.log('❌ Delete test cancelled by user');
    return;
  }
  
  try {
    console.log(`🗑️ Testing delete transaction: ${transactionId}`);
    
    const response = await fetch(`http://localhost:5000/api/v1/transaction/${transactionId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`HTTP ${response.status}: ${errorData.error || response.statusText}`);
    }
    
    const data = await response.json();
    console.log(`✅ Transaction deleted:`, data);
    
  } catch (error) {
    console.log(`❌ Failed to delete transaction:`, error.message);
  }
}

// Jalankan semua test
async function runAllTests() {
  console.log('\n🚀 Starting transaction function tests...\n');
  
  // Test 1: Backend connection
  const backendOk = await testBackendConnection();
  if (!backendOk) {
    console.log('❌ Backend not available, stopping tests');
    return;
  }
  
  // Test 2: Get transaction list
  const transactionId = await testTransactionList();
  
  // Test 3: Update status
  await testUpdateStatus(transactionId);
  
  // Test 4: Delete transaction (optional)
  // await testDeleteTransaction(transactionId);
  
  console.log('\n✅ All tests completed!');
}

// Export fungsi untuk digunakan di console
window.testTransactionFunctions = {
  testBackendConnection,
  testTransactionList,
  testUpdateStatus,
  testDeleteTransaction,
  runAllTests
};

console.log('📝 Test functions available. Run: window.testTransactionFunctions.runAllTests()'); 