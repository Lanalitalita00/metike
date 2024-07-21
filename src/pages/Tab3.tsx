import React, { useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonFab, IonFabButton, IonIcon, IonLoading, IonToast
} from '@ionic/react';
import { cameraOutline } from 'ionicons/icons';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

const Scanner: React.FC = () => {
  const [scanning, setScanning] = useState(false);
  const [showToast, setShowToast] = useState<{ show: boolean, message: string }>({ show: false, message: '' });

  const startScan = async () => {
    try {
      setScanning(true);

      const status = await BarcodeScanner.checkPermission({ force: true });
      if (!status.granted) {
        setShowToast({ show: true, message: 'Camera permission denied' });
        setScanning(false);
        return;
      }

      const result = await BarcodeScanner.startScan();

      setScanning(false);

      if (result.hasContent) {
        setShowToast({ show: true, message: `Scanned content: ${result.content}` });
      } else {
        setShowToast({ show: true, message: 'No content found' });
      }

    } catch (error) {
      console.error(error);
      setScanning(false);
      setShowToast({ show: true, message: 'Failed to scan' });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Scan QR/Barcode</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={startScan} disabled={scanning}>
            <IonIcon icon={cameraOutline} />
          </IonFabButton>
        </IonFab>
        <IonLoading
          isOpen={scanning}
          message={'Scanning...'}
        />
        <IonToast
          isOpen={showToast.show}
          message={showToast.message}
          duration={2000}
          onDidDismiss={() => setShowToast({ show: false, message: '' })}
        />
      </IonContent>
    </IonPage>
  );
};

export default Scanner;
