import React from 'react';
import { Card, Button } from 'antd';

const StoreCard = ({ data }) => {
  return (
    <Card title={data.name} bordered>
      <p>Game: {data.game}</p>
      <p>Harga: Rp{data.price.toLocaleString()}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button size="small" type="primary">Detail</Button>
        <Button size="small" type="default">Edit</Button>
        <Button size="small" type="danger">Hapus</Button>
      </div>
    </Card>
  );
};

export default StoreCard;
