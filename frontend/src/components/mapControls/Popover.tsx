import React, { useContext, useRef, useState } from 'react';
import {
  IonCard,
  IonFab,
  IonFabButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonPopover,
  IonButton,
  IonToggle,
  IonRange,
} from '@ionic/react';
import { settingsOutline } from 'ionicons/icons';
import { MapContext } from '../../provider/MapProvider';
import { ContextType } from '../../provider/type';


const Popover: React.FC = () => {

  const [showPopover, setShowPopover] = useState<{ open: boolean, event: Event | undefined }>({
    open: false,
    event: undefined,
  });
  const { heatmapVisible, markerVisible, locationVisible, radius, blur, toggleLocation, toggleMarker, toggleHeatmap, setBlur, setRadius } = useContext(MapContext) as ContextType;

  return (
    <>
      <IonPopover
        isOpen={showPopover.open}
        event={showPopover.event}
        onDidDismiss={() => {
          setShowPopover({ open: false, event: undefined });
        }}
      >
        <IonItem>
          <IonLabel>heatmap</IonLabel>
          <IonToggle checked={heatmapVisible} value="heatmap" onIonChange={toggleHeatmap} />
        </IonItem>
        <IonItem>
          <IonLabel>marker</IonLabel>
          <IonToggle checked={markerVisible} value="marker" onIonChange={toggleMarker} />
        </IonItem>
        <IonItem>
          <IonLabel>position</IonLabel>
          <IonToggle checked={locationVisible} value="position" onIonChange={toggleLocation} />
        </IonItem>
        <IonItem>
          <IonLabel>
            Radius
          </IonLabel>
          <IonRange min={1} max={50} step={1} value={radius} onIonChange={(e) => { setRadius(e.detail.value as number) }} />
        </IonItem>
        <IonItem>
          <IonLabel>
            Blur
          </IonLabel>
          <IonRange min={1} max={50} step={1} value={blur} onIonChange={(e) => { setBlur(e.detail.value as number) }} />
        </IonItem>
      </IonPopover>
      <IonFab vertical="top" horizontal="end" slot="fixed">
        <IonButton onClick={(e) => setShowPopover({ open: true, event: e.nativeEvent })}>
          <IonIcon icon={settingsOutline} />
        </IonButton>
      </IonFab>
    </>
  );
};



export default Popover;