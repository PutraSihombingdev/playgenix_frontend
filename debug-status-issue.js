// Script untuk debugging masalah status database
// Jalankan di browser console setelah login sebagai admin

console.log('🔍 Debugging Status Database Issue...');

// Fungsi untuk test status update dengan logging detail
async function debugStatusUpdate(transactionId, status) {
  const token = localStorage.getItem('token');
  
  console.log(`\n🔄 Testing status update:`);
  console.log(`- Transaction ID: ${transactionId}`);
  console.log(`- Status: "${status}"`);
  console.log(`- Status length: ${status.length}`);
  console.log(`- Status bytes: ${new TextEncoder().encode(status).length}`);
  
  try {
    const response = await fetch(`http://localhost:5000/api/v1/transaction/${transactionId}/status`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status })
    });
    
    console.log(`- Response status: ${response.status}`);
    console.log(`- Response ok: ${response.ok}`);
    
    const responseText = await response.text();
    console.log(`- Response body: ${responseText}`);
    
    if (response.ok) {
      console.log(`✅ Status "${status}" berhasil diupdate`);
      return true;
    } else {
      console.log(`❌ Status "${status}" gagal: ${responseText}`);
      return false;
    }
    
  } catch (error) {
    console.log(`❌ Error saat update status "${status}":`, error.message);
    return false;
  }
}

// Fungsi untuk test semua status yang mungkin
async function testAllStatuses(transactionId) {
  console.log(`\n🧪 Testing all possible statuses for transaction ${transactionId}...`);
  
  const testStatuses = [
    'pending',
    'paid', 
    'failed',
    'PENDING',
    'PAID',
    'FAILED',
    'Pending',
    'Paid',
    'Failed'
  ];
  
  const results = {};
  
  for (const status of testStatuses) {
    const success = await debugStatusUpdate(transactionId, status);
    results[status] = success;
    
    // Tunggu sebentar antara test
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('\n📊 Test Results:');
  Object.entries(results).forEach(([status, success]) => {
    console.log(`${success ? '✅' : '❌'} "${status}": ${success ? 'SUCCESS' : 'FAILED'}`);
  });
  
  return results;
}

// Fungsi untuk cek struktur data yang dikirim
function analyzeStatusData(status) {
  console.log(`\n🔍 Analyzing status data: "${status}"`);
  console.log(`- Type: ${typeof status}`);
  console.log(`- Length: ${status.length}`);
  console.log(`- Char codes: ${Array.from(status).map(c => c.charCodeAt(0))}`);
  console.log(`- Bytes: ${new TextEncoder().encode(status)}`);
  console.log(`- JSON: ${JSON.stringify(status)}`);
  console.log(`- Trimmed: "${status.trim()}"`);
  console.log(`- Lowercase: "${status.toLowerCase()}"`);
  console.log(`- Uppercase: "${status.toUpperCase()}"`);
}

// Fungsi untuk test dengan data yang berbeda
async function testDifferentDataFormats(transactionId) {
  console.log(`\n🧪 Testing different data formats...`);
  
  const testCases = [
    { status: 'pending', description: 'Normal lowercase' },
    { status: 'PENDING', description: 'Uppercase' },
    { status: ' pending ', description: 'With whitespace' },
    { status: 'pending\n', description: 'With newline' },
    { status: 'pending\t', description: 'With tab' },
    { status: 'pending\r', description: 'With carriage return' },
    { status: 'pending\u0000', description: 'With null byte' },
    { status: 'pending\u00A0', description: 'With non-breaking space' }
  ];
  
  for (const testCase of testCases) {
    console.log(`\n📝 Testing: ${testCase.description}`);
    analyzeStatusData(testCase.status);
    await debugStatusUpdate(transactionId, testCase.status);
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

// Fungsi untuk cek transaksi yang ada
async function checkExistingTransactions() {
  console.log('\n📋 Checking existing transactions...');
  
  const token = localStorage.getItem('token');
  
  try {
    const response = await fetch('http://localhost:5000/api/v1/transaction/list', {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    if (response.ok) {
      const transactions = await response.json();
      console.log(`Found ${transactions.length} transactions`);
      
      if (transactions.length > 0) {
        const firstTransaction = transactions[0];
        console.log('First transaction:', firstTransaction);
        console.log('Status:', firstTransaction.status);
        console.log('Status type:', typeof firstTransaction.status);
        
        return firstTransaction.id;
      }
    }
  } catch (error) {
    console.log('Error fetching transactions:', error.message);
  }
  
  return null;
}

// Fungsi utama untuk debugging
async function runDebug() {
  console.log('🚀 Starting status database debug...\n');
  
  // Cek transaksi yang ada
  const transactionId = await checkExistingTransactions();
  
  if (!transactionId) {
    console.log('❌ No transactions found for testing');
    return;
  }
  
  console.log(`\n🎯 Using transaction ID: ${transactionId}`);
  
  // Test dengan format data yang berbeda
  await testDifferentDataFormats(transactionId);
  
  // Test semua status yang mungkin
  await testAllStatuses(transactionId);
  
  console.log('\n✅ Debug completed!');
  console.log('\n💡 Tips:');
  console.log('- Cek output di atas untuk melihat status mana yang berhasil/gagal');
  console.log('- Jika semua gagal, kemungkinan ada masalah di database schema');
  console.log('- Jika beberapa berhasil, ada masalah dengan format data');
  console.log('- Cek file database-debug-guide.md untuk solusi lebih lanjut');
}

// Export fungsi untuk digunakan di console
window.debugStatusIssue = {
  debugStatusUpdate,
  testAllStatuses,
  analyzeStatusData,
  testDifferentDataFormats,
  checkExistingTransactions,
  runDebug
};

console.log('📝 Debug functions available. Run: window.debugStatusIssue.runDebug()'); 