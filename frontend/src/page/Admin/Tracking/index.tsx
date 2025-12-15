import { useState } from "react";
import Page from "../../../components/layout/Page";
import Button from "../../../components/ui/Button";
import TrackingForm from "./TrackingForm";

const Tracking = () => {
  const [open, setOpen] = useState(false);
  return (
    <Page
      header={
        <>
          <div>
            <h1 className="text-xl font-semibold">Tableau de bord</h1>
            <p className="text-sm text-slate-500">
              Base UI pour créer vos pages TruckFlow.
            </p>
          </div>
          <Button onClick={() => setOpen(true)}>Ajouter point</Button>
        </>
      }
    >
      <h1>Bienvenue sur le tableau de bord</h1>
      <TrackingForm open={open} onClose={() => setOpen(false)} />
    </Page>
  );
};

export default Tracking;
