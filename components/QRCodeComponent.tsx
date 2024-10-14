// components/QRCodeComponent.tsx

'use client';

import { FC } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

interface QRCodeComponentProps {
  value: string;
}

const QRCodeComponent: FC<QRCodeComponentProps> = ({ value }) => {
  return <QRCodeCanvas value={value} size={128} />;
};

export default QRCodeComponent;
