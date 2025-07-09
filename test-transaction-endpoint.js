// Script untuk test endpoint transaction
const axios = require('axios');

const API_BASE = 'http://localhost:5000/api/v1';

async function testTransactionEndpoint() {
  try {
    // Test 1: Cek koneksi backend
    console.log('1. Testing backend connection...');
    try {
      const healthCheck = await axios.get(`${API_BASE}/health`);
      console.log('✅ Backend connected:', healthCheck.data);
    } catch (error) {
      console.log('❌ Backend not connected:', error.message);
      return;
    }

    // Test 2: Cek list transaksi (perlu token)
    console.log('\n2. Testing transaction list...');
    const token = localStorage.getItem('token') || 'your-token-here';
    
    try {
      const transactionList = await axios.get(`${API_BASE}/transaction/list`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('✅ Transaction list retrieved:', transactionList.data.length, 'transactions');
      
      // Cari transaksi dengan ID 21
      const transaction21 = transactionList.data.find(t => t.id === 21);
      if (transaction21) {
        console.log('✅ Transaction 21 found:', transaction21);
      } else {
        console.log('❌ Transaction 21 not found');
      }
    } catch (error) {
      console.log('❌ Failed to get transaction list:', error.response?.data || error.message);
    }

    // Test 3: Test update status
    console.log('\n3. Testing status update...');
    const testStatuses = ['pending', 'paid', 'failed'];
    
    for (const status of testStatuses) {
      try {
        console.log(`Testing status: ${status}`);
        const updateResponse = await axios.patch(
          `${API_BASE}/transaction/21/status`,
          { status },
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        console.log(`✅ Status ${status} updated successfully:`, updateResponse.data);
      } catch (error) {
        console.log(`❌ Failed to update status ${status}:`, error.response?.data || error.message);
      }
    }

  } catch (error) {
    console.error('Test failed:', error);
  }
}

// Untuk menjalankan di browser console
if (typeof window !== 'undefined') {
  window.testTransactionEndpoint = testTransactionEndpoint;
  console.log('Test function available: testTransactionEndpoint()');
}

// Untuk menjalankan di Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { testTransactionEndpoint };
} 